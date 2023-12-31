export default {
  jwt: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlBqTXllTWd3QzBmZ0xGS2lxQXF2UCJ9.eyJlaXNfcm9sZXMiOlsiZW9pLXJvbGUiXSwiZHNzX2FnZW50X2lkIjoiZGVlNiIsImRzc19hZ2VuY3lfaWQiOiJjaWE2IiwiYXBwX25hbWUiOiJ3YmQtc3BhLWVpcy1icm9rZXItcG9ydGFsIiwiaXNzIjoiaHR0cHM6Ly93YmQtc2FuZGJveC1wYWNpZmljbGlmZS51cy5hdXRoMC5jb20vIiwic3ViIjoiZW1haWx8NjRkYTIxMGU2NDZhYzQ5Mjg2MDc0MDU1IiwiYXVkIjoidXJuOndiZC1lb2ktZXhwZXJpZW5jZS1hcGkiLCJpYXQiOjE2OTM5ODU3OTgsImV4cCI6MTY5NDA3MjE5OCwiYXpwIjoidGtuSkptTWd5WWRUSjRxT28zSnU4SXZrd0lCQmNkQnAiLCJzY29wZSI6ImVvaXMiLCJwZXJtaXNzaW9ucyI6WyJlb2lzIl19.fW-o3BBQKK1vT8KuG6FXr_Uq49jDl2_riLUThybdnU9kzOO2Z17sRFd1-LCKRw4LPnTKAHPY8ymohR8H5g-oNXuyshXU468G_frhUfAeA-a4xmtZ0H256Q4wEi1ccjg6fkOuUrAN3H0UsN1SsKQLHCJcUQMbAZ3pZ43IF7Nu7qM2fasjYN57KqiM4Vc7FrtEvX8U-QFnyB1d-f8ZqW-WXoYxf92X1M092qOtGdYIb1U-W6yZNwj7Pv9GIaG_-7OXfroW9XZ-VyHUo_IkqdvumDmj4oIaGQPKMdpPJAb7GZtRjD07T-P4neM2aOodoZQ0KaK56beYfvGCu7BEsUMUHQ",
  muleSoftHostAddress: "https://dev.us1.api.pacificlife.com/wbd/eoi/v1",
  umeProxy: "ume/v4",
  umeBranch: "PLGroupBen",
  umeTag: "EOI_v14",
  umeLocale: "EN_US",
  umeUsername: "TESTING",

  UMeTestCaseFile: "./assets/TestCases1.csv",
  nameField: "NAME",
  enquiryId:"123",
  startEnquiryFields: ["SOURCE", "PRODUCT", "BenefitAmount", "ElectedBenefitAmount", "GENDER", "BIRTHDATE", "POLICY_SITUS"],
  commonEnquiryFields: ["CITIZENSHIP", "HEIGHT_FEET", "HEIGHT_INCHES", "WEIGHT_MALE","WEIGHT_FEMALE", "TOBACCO", "LAST_5_DRIVING", "LAST_10_DRIVING", "LAST_5_TREATMENT", "LAST_2_PROCEDURE", "LAST_10_DRUG_USE", "LAST_10_ALCOHOL", "LAST_10_HIV", "LAST_10_HIV_FL", "LAST_10_HEART", "LAST_10_CANCER", "LAST_10_ENDO", "LAST_10_GITRACT", "LAST_10_GENITO_MALE", "LAST_10_GENITO_FEMALE" ,"LAST_10_RESPIRATORY", "LAST_10_CNS", "LAST_10_MENTAL_HEALTH", "LAST_10_IMMUNE"],
  decisionColumns: [
    {
      bucket: "DECISION_LIFE",
      evaluate: {
        _result: "DECISION_LIFE",
        Non_Medical_Limits: "DL_Non_Medical_Limits_COL",
      //  "Test" : "Test_col"
        
        //Last2_Procedure: "DL_Last2_Procedure"
      }
    },
    {
      bucket: "EVIDENCE_LIFE",
      evaluate: {
        _result: "EVIDENCE_LIFE",
       // Non_Medical_Limits: "EL_Non_Medical_Limits"
        
       // Last10_MentalHealth: "EL_Last10_MentalHealth"
      }
    },

    {
      bucket: "UW_VOLUME_LIFE",
      evaluate: {
        _result: "UW_VOLUME_LIFE"
      }
    }
  ],

  debug: true,
  showRequest: false,
  shoeResponse: false,

}