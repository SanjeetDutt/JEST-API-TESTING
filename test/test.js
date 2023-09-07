import assert from "assert"
import { getFilePath, parseCsvToObject, readCsv } from "../src/Utility.js"
import _Config from "../src/_Config.js"
import UMeApi from "../src/UMeApi.js"
import { STATUS } from "../src/Api.js"
import addContext from "mochawesome/addContext.js"
import { Report } from "../src/data/Request.js"

const readUmeTestCases = async () => {
  const fileLocation = getFilePath(_Config.UMeTestCaseFile)
  const data = await readCsv(fileLocation)
  return parseCsvToObject(data, (val) => {

    if (typeof val !== typeof "abc")
      return [val]

    let newVal = val

    if (val.startsWith('"'))
      newVal = val.substring(1, val.length - 1)

    return newVal.split(",").map(e => e.trim())

  })
}

const cases = await readUmeTestCases();

describe("Loading Under-wite-Me Test data", async () => {

  it("Read test cases", async () => {
    assert.notEqual(cases.length, 0, "Should have some test cases to test")
  });

})

cases.forEach((test, i) => {
  const umeApi = new UMeApi(test)
  const testNumber = i + 1;
  const testName = test[_Config.nameField][0]

  describe(`Test No. ${testNumber}: ${testName}`, async () => {

    if (_Config.debug) {
      it("STARTING NEW ENQUIRY", async function () {
        const reporting = new Report(addContext, this)
        const response = await umeApi.startEnquiry(reporting)
        reporting.publishReport()
        assert.equal(response, STATUS.OK)
      })

      it("POSTING ENQUIRY DATA", async function () {
        const reporting = new Report(addContext, this)
        const response = await umeApi.postEnquiry(reporting)
        reporting.publishReport()
        assert.equal(response, STATUS.OK)
      })

      it("CLOSING ENQUIRY", async function () {
        const reporting = new Report(addContext, this)
        const response = await umeApi.closeEnquiry(reporting)
        reporting.publishReport()
        assert.equal(response, STATUS.OK)
      })

      it("EVALUATING ENQUIRY RESULT", async function () {
        const reporting = new Report(addContext, this)
        const response = await umeApi.enquiryResult(reporting)
        reporting.publishReport()
        assert.equal(response, STATUS.OK)
      })
    } else {
      it("TESTING TEST CASE #" + (i + 1), async function () {
        const reporting = new Report(addContext, this, "Testing Enquiry")
        const response = await umeApi.completeEnquiry(reporting)
        reporting.publishReport()
        assert.equal(response, STATUS.OK)

      })
    }

  })
})