export default {
  jwt: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlBqTXllTWd3QzBmZ0xGS2lxQXF2UCJ9.eyJlaXNfcm9sZXMiOlsiZW9pLXJvbGUiXSwiZHNzX2FnZW50X2lkIjoiZGVlNiIsImRzc19hZ2VuY3lfaWQiOiJjaWE2IiwiYXBwX25hbWUiOiJ3YmQtc3BhLWVpcy1icm9rZXItcG9ydGFsIiwiaXNzIjoiaHR0cHM6Ly93YmQtc2FuZGJveC1wYWNpZmljbGlmZS51cy5hdXRoMC5jb20vIiwic3ViIjoiZW1haWx8NjRkYTIxMGU2NDZhYzQ5Mjg2MDc0MDU1IiwiYXVkIjoidXJuOndiZC1lb2ktZXhwZXJpZW5jZS1hcGkiLCJpYXQiOjE2OTM5ODU3OTgsImV4cCI6MTY5NDA3MjE5OCwiYXpwIjoidGtuSkptTWd5WWRUSjRxT28zSnU4SXZrd0lCQmNkQnAiLCJzY29wZSI6ImVvaXMiLCJwZXJtaXNzaW9ucyI6WyJlb2lzIl19.fW-o3BBQKK1vT8KuG6FXr_Uq49jDl2_riLUThybdnU9kzOO2Z17sRFd1-LCKRw4LPnTKAHPY8ymohR8H5g-oNXuyshXU468G_frhUfAeA-a4xmtZ0H256Q4wEi1ccjg6fkOuUrAN3H0UsN1SsKQLHCJcUQMbAZ3pZ43IF7Nu7qM2fasjYN57KqiM4Vc7FrtEvX8U-QFnyB1d-f8ZqW-WXoYxf92X1M092qOtGdYIb1U-W6yZNwj7Pv9GIaG_-7OXfroW9XZ-VyHUo_IkqdvumDmj4oIaGQPKMdpPJAb7GZtRjD07T-P4neM2aOodoZQ0KaK56beYfvGCu7BEsUMUHQ",
  muleSoftHostAddress: "https://dev.us1.api.pacificlife.net/wbd/eoi/v1",
  //https://uat.us1.api.pacificlife.net/wbd/eoi/v1
 // https://qa.us1.api.pacificlife.com/wbd/eoi/v1/ume/enquiry
 //https://dev.us1.api.pacificlife.net/wbd/eoi/v1
 // Test comment 
  umeProxy: "ume/v4",
  umeBranch: "PLGroupBen",
  umeTag: "EOI_v18_GenderOther",
  umeLocale: "EN_US",
  umeUsername: "TESTING",

  UMeTestCaseFile: "./assets/Other_question_VL_logic.csv",
  //BMI_VL_Female.csv,
  //Other_question_VL_logic.csv,
  nameField: "NAME",
  startEnquiryFields: ["SOURCE", "PRODUCT","COVERAGE_BASIS", "BASIC_BENEFIT_LIFE","BASIC_ELECT_BENEFIT_LIFE","VOL_BENEFIT_LIFE","VOL_ELECT_BENEFIT_LIFE", "GENDER", "BIRTHDATE", "POLICY_SITUS"],
  commonEnquiryFields: ["CITIZENSHIP", "HEIGHT_FEET", "HEIGHT_INCHES", "WEIGHT_MALE","WEIGHT_FEMALE", 
  "WEIGHT_OTHER", "TOBACCO", "LAST_5_DRIVING", "LAST_10_DRIVING", "LAST_5_TREATMENT", "LAST_2_PROCEDURE", 
  "LAST_10_DRUG_USE", "LAST_10_ALCOHOL", "LAST_10_HIV", "LAST_10_HIV_FL", "LAST_10_HEART", "LAST_10_CANCER", 
  "LAST_10_ENDO", "LAST_10_GITRACT", "LAST_10_GENITO_MALE", "LAST_10_GENITO_FEMALE", "LAST_10_GENITO_OTHER" ,"LAST_10_RESPIRATORY", "LAST_10_CNS", "LAST_10_MENTAL_HEALTH", "LAST_10_IMMUNE"],
  decisionColumns: [
    {
      bucket: "DECISION_LIFE",
      evaluate: {
        _max: "DECISION_LIFE",
        Build:"DL_BUILD",
        Non_Medical_Limits: "DL_Non_Medical_Limits_COL",
        MVR_Check:"LAST_5_DRIVING/LAST_10_DRIVING/MVR_Check",	
        Last5_Treatment:"Last5_Treatment" , 
        Last2_Procedure:"Last2_Procedure"	, 
        Alcohol_Abuse:"LAST_10_ALCOHOL_Alcohol_Abuse" ,	
        Drug_Abuse:"LAST_10_ALCOHOL_Drug_Abuse" ,	
        AIDS:"LAST_10_HIV_AIDS" ,	
        Nodule:"LAST_10_CANCER_Nodule",	
        Skin_Cancer:"LAST_10_CANCER_Skin_Cancer"	, 
        Melanoma:"LAST_10_CANCER_Melanoma",
        Hodgkins_Disease:	"LAST_10_CANCER_Hodgkins_Disease"	,
        Leukemia:"LAST_10_CANCER_Leukemia",	
        Cancer_NOS:"LAST_10_CANCER_Cancer_Cancer_NOS"	,
        Cancer_NOS:"LAST_10_CANCER/Tumor_Cancer_NOS"	,
        Last10_Genito:"LAST_10_GENITO_MALE_Last10_Genito",
        Refer_All:	"LAST_10_CNS_Refer_All",	
        Epilepsy:"LAST_10_CNS_Epilepsy"	,
        Amnesia:"LAST_10_CNS_Amnesia",
        Sclerosis 	:"LAST_10_CNS_Multiple_Sclerosis"	,
        Dystrophy :"LAST_10_CNS_Muscular_Dystrophy"	,
        Paralysis : "LAST_10_CNS_Paralysis",
        Parkinsons_Disease :"LAST_10_CNS_Parkinsons_Disease",
        Tremor: "LAST_10_CNS_Tremor",
        Last10_Immune: "LAST_10_IMMUNE_Last10_Immune",	
        Lupus_Erythematosus :"LAST_10_IMMUNE_Lupus_Erythematosus",
        Chronic_Obstructive_Pulmonary_Disease:"LAST_10_RESPIRATORY_Chronic_Obstructive_Pulmonary_Disease",
        Emphysema:"LAST_10_RESPIRATORY_Emphysema",	
        Sleep_Apnoea:"LAST_10_RESPIRATORY_Sleep_Apnoea",
        Last10_Resp:"LAST_10_RESPIRATORY_Last10_Resp",
        Last10_MentalHealth:"LAST_10_MENTAL_HEALTH_Last10_MentalHealth",
        Mental_Illness_Severe:"LAST_10_MENTAL_HEALTH_Mental_Illness_Severe",
        Eating_Disorders:	"LAST_10_MENTAL_HEALTH_Eating_Disorders"
        //Last2_Procedure: "DL_Last2_Procedure"
      }
    },
    {
      bucket: "EVIDENCE_LIFE",
      evaluate: {
        _max: "EVIDENCE_LIFE",
       // Non_Medical_Limits: "EL_Non_Medical_Limits"
        
       // Last10_MentalHealth: "EL_Last10_MentalHealth"
      }
    },

    {
      bucket: "UW_VOLUME_LIFE",
      evaluate: {
       // _max: "UW_VOLUME_LIFE",

        _sum: "UW_VOLUME_LIFE",
       // _max: "UW_VOLUME_LIFE",
       // _min: "UW_VOLUME_LIFE",
      }
    },
    // {
    //   bucket:"EM_LIFE",
    //   evaluate: {
    //     _max: "EM_LIFE",
    //     _sum:"EM_LIFE_sum"
    //   }
    // },
    {
      bucket:"BMI",
      evaluate: {
        _max: "BMI"
      }
    }

  ],

  debug: true,
  showRequest: false,
  shoeResponse: false,

}