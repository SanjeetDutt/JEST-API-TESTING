import _Config from "../_Config.js"

export class UMe {

  /**
   * This class is to deal with the UMe by sending answer and decoding the result from response
   * @param {Enquiry Answer} param0 All the answer which needed to pass to the UME
   * @param {Result} Result Result expecting after closing the enquiry
   */
  constructor(data) {
    this.startEnquiryAnswer = {}
    this.enquiryAnswer = {}
    this.enquiryId = null

    _Config.startEnquiryFields.forEach(e => this.startEnquiryAnswer[e] = data[e])
    _Config.commonEnquiryFields.forEach(e => this.enquiryAnswer[e] = data[e])

    this.expectedResult = data[_Config.resultField][0]
    this.name = data[_Config.nameField]
  }

  getStartEnquiryAnswer() {
    return this.startEnquiryAnswer
  }

  getEnquiryAnswer() {
    return this.enquiryAnswer
  }

  setEnquiryId(enquiryId) {
    this.enquiryId = enquiryId
  }

  isExpectedResult(result) {
    return result === this.expectedResult
  }
}