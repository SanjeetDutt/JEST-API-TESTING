import { Api, STATUS } from "./Api.js"
import _Config from "./_Config.js"
import { UMe } from "./data/UMe.js"

const umeBranchQuery = ["branch=" + _Config.umeBranch, "tag=" + _Config.umeTag]
const umeCommonQuery = ["collation=BREADTH_FIRST_ORDER", "embed=true"]

export default class UMeApi extends Api {

  constructor(csvRow) {
    super()
    this.UMe = new UMe(csvRow, csvRow[_Config.ResultColumnName])
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

  seekValidationError(reporting, response) {
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

    reporting.addReport("error", error.length > 0 ? error : "FOUND 0 ERROR 🎉")
    return error.length > 0
  }

  async postEnquiry(reporting) {
    const enquiryId = this.UMe.enquiryId
    const url = super.buildURL([_Config.muleSoftHostAddress, _Config.umeProxy, "enquiry", enquiryId], umeCommonQuery)
    const headers = super.buildJsonHeader()
    const answers = this.UMe.getEnquiryAnswer()
    const body = {
      answers: {
        ...answers
      },
      locale: _Config.umeLocale,
      username: _Config.umeUsername,
      debug: true
    }
    reporting.addRequest(body)

    try {
      const r = await super.post({ url, headers, body })
      reporting.addResponse(r)
      const error = this.seekValidationError(reporting, r)
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

    reporting.addRequest({})
    try {
      const r = await super.post({ url, headers })
      reporting.addResponse(r)
      const error = this.seekValidationError(reporting, r)
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
      const buckets = r.snapshots[0].enquiry.buckets
      reporting.addReport("Bucket", this.parseBucketToReport(buckets))

      if (this.UMe.isExpectedResults(buckets))
        return STATUS.OK

      return STATUS.ERROR
    } catch (e) {
      console.error("ENCOUNTER AN ERROR WHILE GETTING ENQUIRY HISTORY", e);
      return STATUS.ERROR
    }

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