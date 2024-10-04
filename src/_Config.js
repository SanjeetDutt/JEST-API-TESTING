import { Test } from "mocha"
import WBD_EOI_ENV_CONSTANT from "./utilities/EnvConstant.js"
import { UME_Branch, Test_Files, getFields } from "./utilities/EnvConstant.js"




const insuranceType = "Life_Disability"
const enquiryFields = getFields(insuranceType)
console.log(enquiryFields)


export default {

  username: "0965c24574574b3cb08e00a8f9ba9d7b",
  password: "D8Fd5DE6569a4866a3B031d6691192b4",

  muleSoftHostAddress: `${WBD_EOI_ENV_CONSTANT.DEV_MULE_DOMAIN}`,
  umeProxy: "ume/v4",
  umeBranch: UME_Branch[2],
  umeTag: "",
  umeLocale: "EN_US",
  umeUsername: "TESTING",

  UMeTestCaseFile: `./assets/${Test_Files[2]}`,



  nameField: "NAME",
  startEnquiryFields: enquiryFields.Basic_info_question,
  commonEnquiryFields: enquiryFields.Other_question,
  decisionColumns: enquiryFields.decision_buckets,

  debug: true,
  showRequest: true,
  shoeResponse: false,

}