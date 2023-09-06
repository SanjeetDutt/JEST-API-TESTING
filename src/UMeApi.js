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

  async startEnquiry() {
    const url = super.buildURL([_Config.muleSoftHostAddress, _Config.umeProxy, "startEnquiry"], umeBranchQuery)
    const headers = super.buildJsonHeader()
    const startEnquiryAnswer = this.UMe.getStartEnquiryAnswer()
    const body = {
      answers: {
        ...startEnquiryAnswer
      }, username: _Config.umeUsername
    }

    try {
      const response = await super.post({ url, headers, body })
      this.UMe.setEnquiryId(response.enquiryId)
      return STATUS.OK
    } catch (e) {
      console.error("ENCOUNTER AN ERROR WHILE STARTING AN ENQUIRY", e);
      return STATUS.ERROR
    }

  }

  async postEnquiry() {
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

    try {
      await super.post({ url, headers, body })
      return STATUS.OK
    } catch (e) {
      console.error("ENCOUNTER AN ERROR WHILE POSING AN ENQUIRY", e);
      return STATUS.ERROR
    }

  }

  async closeEnquiry() {
    const enquiryId = this.UMe.enquiryId
    const url = super.buildURL([_Config.muleSoftHostAddress, _Config.umeProxy, "closeEnquiry", enquiryId], umeCommonQuery)
    const headers = super.buildJsonHeader()

    try {
      const r = await super.post({ url, headers })
      return STATUS.OK
    } catch (e) {
      console.error("ENCOUNTER AN ERROR WHILE CLOSING AN ENQUIRY", e);
      return STATUS.ERROR
    }
  }

  async enquiryResult() {

    const enquiryId = this.UMe.enquiryId
    const url = super.buildURL([_Config.muleSoftHostAddress, _Config.umeProxy, "enquiry/history", enquiryId], umeCommonQuery)
    const headers = super.buildJsonHeader()

    try {
      const r = await super.get({ url, headers })
      const bucket = r.snapshots[0].enquiry.buckets.find(bucket => bucket.name === _Config.decisionBucketName)

      if (this.UMe.isExpectedResult(bucket.max.value))
        return STATUS.OK

      return STATUS.ERROR
    } catch (e) {
      console.error("ENCOUNTER AN ERROR WHILE GETTING ENQUIRY HISTORY", e);
      return STATUS.ERROR
    }

  }

  async completeEnquiry() {
    const startEnquiry = await this.startEnquiry()
    console.log("Start enquiry : " + startEnquiry);

    const postEnquiry = await this.postEnquiry()
    console.log("Post enquiry : " + postEnquiry);

    const closeEnquiry = await this.closeEnquiry()
    console.log("Close enquiry : " + closeEnquiry);

    const enquiryResult = await this.enquiryResult()
    console.log("Enquiry result : " + enquiryResult);

    return (
      startEnquiry === STATUS.OK &&
      postEnquiry === STATUS.OK &&
      closeEnquiry === STATUS.OK &&
      enquiryResult === STATUS.OK
    ) ? STATUS.OK : STATUS.ERROR

  }
}