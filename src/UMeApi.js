import { Api, STATUS } from "./Api.js"
import _Config from "./_Config.js"
import { UMe } from "./data/UMe.js"

const umeBranchQuery = ["branch=" + _Config.umeBranch, "tag=" + _Config.umeTag]
const umeCommonQuery = ["collation=BREADTH_FIRST_ORDER", "embed=true"]

export default class UMeApi extends Api {

    constructor(csvRow, enquiryId = null) {
        super()
        this.UMe = new UMe(csvRow, csvRow[_Config.ResultColumnName])

        if (enquiryId !== null)
            this.UMe.setEnquiryId(enquiryId)
    }

    async startEnquiry(reporting) {
        const url = super.buildURL([_Config.muleSoftHostAddress, _Config.umeProxy, "startEnquiry"], umeBranchQuery)
        const headers = super.buildJsonHeader()
        const startEnquiryAnswer = this.UMe.getStartEnquiryAnswer()

        const body = {
            answers: {
                ...startEnquiryAnswer
            }, username: _Config.umeUsername
        }

        reporting.addRequest(body)

        try {
            const response = await super.post({ url, headers, body })
            this.UMe.setEnquiryId(response.enquiryId)
            reporting.addResponse(response)
            reporting.addReport("enquiry id", response.enquiryId)
            return STATUS.OK
        } catch (e) {
            console.error("ENCOUNTER AN ERROR WHILE STARTING AN ENQUIRY", e);
            return STATUS.ERROR
        }

    }

    seekValidationError(reporting, response, successMessage) {
        const error = []
        response.sections.forEach(section => {
            section.enquiryLines.forEach(enquiryLine => {
                enquiryLine.questions.forEach(question => {
                    const errorObj = question.validationErrors
                    Object.values(errorObj).forEach(err => {
                        error.push(err)
                    })
                })
            })
        })

        if (error.length > 0) {
            reporting.addReport("error", error)
            return true
        } else {
            reporting.addReport("message", successMessage)
            return false
        }
    }

    async postEnquiry(reporting) {
        const enquiryId = this.UMe.enquiryId
        const url = super.buildURL([_Config.muleSoftHostAddress, _Config.umeProxy, "enquiry", enquiryId], umeCommonQuery)
        const headers = super.buildJsonHeader()
        const answers = this.UMe.getEnquiryAnswer()
        const startEnquiryAnswer = this.UMe.getStartEnquiryAnswer()
        const body = {
            answers: {
                ...startEnquiryAnswer,
                ...answers
            },
            locale: _Config.umeLocale,
            username: _Config.umeUsername,
            debug: true,
            "saveEnquiry": true,
            "date": "2023-09-12T13:37:27Z",
            "collationStrategy": "BREADTH_FIRST_ORDER",
            "enquiryId": this.UMe.enquiryId,
            "forceWrapUp": false,
            "embedDefinitions": false
        }
        reporting.addRequest(body)

        try {
            const r = await super.post({ url, headers, body })
            reporting.addResponse(r)
            const error = this.seekValidationError(reporting, r, "Enquiry posted successfully")
            return !!error ? STATUS.ERROR : STATUS.OK
        } catch (e) {
            console.error("ENCOUNTER AN ERROR WHILE POSING AN ENQUIRY", e);
            return STATUS.ERROR
        }

    }

    async closeEnquiry(reporting) {
        const enquiryId = this.UMe.enquiryId
        const url = super.buildURL([_Config.muleSoftHostAddress, _Config.umeProxy, "closeEnquiry", enquiryId], umeCommonQuery)
        const headers = super.buildJsonHeader()

        const body = {
            "embedDefinitions": false,
            "tryClose": false,
            "username": "email|6501c93eda1617bd4ed4d84f",
            "enquiryId": this.UMe.enquiryId,
            "debug": false,
            "collationStrategy": "BREADTH_FIRST_ORDER",
            "date": "2023-09-12T13:37:27Z"
        }

        reporting.addRequest(body)
        try {
            const r = await super.post({ url, headers, body })
            reporting.addResponse(r)
            const error = this.seekValidationError(reporting, r, "Enquiry closed successfully")
            return !!error ? STATUS.ERROR : STATUS.OK
        } catch (e) {
            console.error("ENCOUNTER AN ERROR WHILE CLOSING AN ENQUIRY", e);
            return STATUS.ERROR
        }
    }

    parseBucketToReport(buckets) {
        const result = {}

        buckets.forEach(bucket => {
            result[`${bucket.name} : ${bucket.max.value}`] = bucket.contributions.map(contribution => {
                return `${contribution.sources[0]} : ${contribution.value}`
            })

        })

        return result
    }

    async enquiryResult(reporting) {

        const enquiryId = this.UMe.enquiryId
        const url = super.buildURL([_Config.muleSoftHostAddress, _Config.umeProxy, "enquiry/history", enquiryId], umeCommonQuery)
        const headers = super.buildJsonHeader()
        reporting.addRequest({})

        try {
            const r = await super.get({ url, headers })
            reporting.addResponse(r)
            const snapshotId = r.snapshots.length - 1
            reporting.addReport("Snapshot ID " , r.snapshots.length  )
            const buckets = r.snapshots[snapshotId].enquiry.buckets
            reporting.addReport("Bucket Outcome", this.parseBucketToReport(buckets))
            const resultArray = this.UMe.generateEnquiryResultArray(buckets)
            // reporting.addReport("Evaluation Result", this.parseEvaluationResult(resultArray))
            return resultArray

        } catch (e) {
            console.error("ENCOUNTER AN ERROR WHILE GETTING ENQUIRY HISTORY", e);
            return STATUS.ERROR
        }

    }

    parseEvaluationResult(resultArray) {
        return resultArray.map(r => `${r.bucketName}->${r.sourceName}:[Expecting:${r.expectation}][GETTING:${r.value}]`)
    }

    async completeEnquiry(reporting) {

        const startEnquiry = await this.startEnquiry(reporting)
        console.log("Start enquiry : " + startEnquiry);

        const postEnquiry = await this.postEnquiry(reporting)
        console.log("Post enquiry : " + postEnquiry);

        const closeEnquiry = await this.closeEnquiry(reporting)
        console.log("Close enquiry : " + closeEnquiry);

        const enquiryResult = await this.enquiryResult(reporting)
        console.log("Enquiry result : " + enquiryResult);

        return (
            startEnquiry === STATUS.OK &&
            postEnquiry === STATUS.OK &&
            closeEnquiry === STATUS.OK &&
            enquiryResult === STATUS.OK
        ) ? STATUS.OK : STATUS.ERROR

    }
}