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

    this.name = data[_Config.nameField]
    _Config.startEnquiryFields.forEach(e => data[e] && (this.startEnquiryAnswer[e] = data[e]))
    _Config.commonEnquiryFields.forEach(e => data[e] && (this.enquiryAnswer[e] = data[e]))

    this.expectedResult = {}

    _Config.decisionColumns.forEach(key => {
      if (data[key] && data[key].length > 0) {
        this.expectedResult[key] = data[key][0]
      }

    })
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

  isExpectedResults(buckets) {

    let result = true;

    Object.keys(this.expectedResult).forEach(key => {
      if (result) {
        const bucket = buckets.find(e => e.name === key)

        if (!bucket) {
          console.error("Bucket not found with name : " + key + "😞");
          return
        }

        const bucketValue = bucket.max.value

        if (bucketValue !== this.expectedResult[key]) {
          result = false
          console.error("Bucket check failed for " + key + ". Found " + bucketValue + " and expected " + this.expectedResult[key] + "😿 💔");
        } else {
          const bold = "font-weight: bold";
          const normal = "font-weight: normal";
          console.log("Testing success for %c" + key + "%c 🎉", bold, normal);
        }

      }
    })

    return result
  }
}