import { STATUS } from "../Api.js"

export class EnquiryResult {

  constructor({ bucketName, sourceName, value, expectation }) {
    this.bucketName = bucketName
    this.sourceName = sourceName
    this.value = value
    this.expectation = expectation
  }

  evaluate(reporting = null) {
    if (this.value===null) return STATUS.OK
    // reporting && reporting.addReport(`${this.bucketName}->${this.sourceName}`, `FOUND:${this.value} EXPECTING:${this.expectation}`)
    return this.value === this.expectation ? STATUS.OK : STATUS.ERROR

  }

  generateMessageText() {

    const highlight = (text) => `[${text}]`
    if (this.value===null)
      return `✅ Skipping Test for ${highlight(this.bucketName)} looking for ${highlight(this.sourceName)} ` 

    if (this.evaluate() === STATUS.OK)
      return `✅ Test pass for bucket ${highlight(this.bucketName)}, looking for ${highlight(this.sourceName)} with value ${highlight(this.expectation)}`

    if (this.sourceName === "_result")
      return `❌ Test failed for bucket ${highlight(this.bucketName)}, looking for ${highlight(this.expectation)} but found ${highlight(this.value)}`

    return `❌ Test failed for bucket ${highlight(this.bucketName)}, looking for ${highlight(this.sourceName)} with value ${highlight(this.expectation)} but found ${highlight(this.value)}`


  }
}