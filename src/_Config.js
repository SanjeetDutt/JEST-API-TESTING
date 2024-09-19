import { Test } from "mocha"
import WBD_EOI_ENV_CONSTANT from "./utilities/EnvConstant.js"
import { UME_Branch, Test_Files, Disability, Life, insuranceType } from "./utilities/EnvConstant.js"


export default {

  username: "0965c24574574b3cb08e00a8f9ba9d7b",
  password: "D8Fd5DE6569a4866a3B031d6691192b4",

  muleSoftHostAddress: `${WBD_EOI_ENV_CONSTANT.DEV_MULE_DOMAIN}`,
  umeProxy: "ume/v4",
  umeBranch: UME_Branch[2],
  umeTag: "",
  umeLocale: "EN_US",
  umeUsername: "TESTING",

  UMeTestCaseFile: "./assets/Disability/MUW_Logic Disability.csv", // `./assets/${Test_Files[3]}`,



  nameField: "NAME",
  startEnquiryFields: Disability.Basic_info_question,
  commonEnquiryFields: Disability.Other_question,
  decisionColumns: [
    {
      bucket: "DECISION_DISABILITY",
      evaluate: {
        _max: "DECISION_DISABILITY",
        //Build: "DL_BUILD",
        //Non_Medical_Limits: "DL_Non_Medical_Limits_COL",
        // MVR_Check: "LAST_5_DRIVING/LAST_10_DRIVING/MVR_Check",
        // Last5_Treatment: "Last5_Treatment",
        // Last2_Procedure: "Last2_Procedure",
        // Alcohol_Abuse: "LAST_10_ALCOHOL_Alcohol_Abuse",
        // Drug_Abuse: "LAST_10_ALCOHOL_Drug_Abuse",
        // AIDS: "LAST_10_HIV_AIDS",
        // Nodule: "LAST_10_CANCER_Nodule",
        // Skin_Cancer: "LAST_10_CANCER_Skin_Cancer",
        // Melanoma: "LAST_10_CANCER_Melanoma",
        // Hodgkins_Disease: "LAST_10_CANCER_Hodgkins_Disease",
        // Leukemia: "LAST_10_CANCER_Leukemia",
        // Cancer_NOS: "LAST_10_CANCER_Cancer_Cancer_NOS",
        // Cancer_NOS: "LAST_10_CANCER/Tumor_Cancer_NOS",
        // Last10_Genito: "LAST_10_GENITO_MALE_Last10_Genito",
        // Refer_All: "LAST_10_CNS_Refer_All",
        // Epilepsy: "LAST_10_CNS_Epilepsy",
        // Amnesia: "LAST_10_CNS_Amnesia",
        // Sclerosis: "LAST_10_CNS_Multiple_Sclerosis",
        // Dystrophy: "LAST_10_CNS_Muscular_Dystrophy",
        // Paralysis: "LAST_10_CNS_Paralysis",
        // Parkinsons_Disease: "LAST_10_CNS_Parkinsons_Disease",
        // Tremor: "LAST_10_CNS_Tremor",
        // Last10_Immune: "LAST_10_IMMUNE_Last10_Immune",
        // Lupus_Erythematosus: "LAST_10_IMMUNE_Lupus_Erythematosus",
        // Chronic_Obstructive_Pulmonary_Disease: "LAST_10_RESPIRATORY_Chronic_Obstructive_Pulmonary_Disease",
        // Emphysema: "LAST_10_RESPIRATORY_Emphysema",
        // Sleep_Apnoea: "LAST_10_RESPIRATORY_Sleep_Apnoea",
        // Last10_Resp: "LAST_10_RESPIRATORY_Last10_Resp",
        // Last10_MentalHealth: "LAST_10_MENTAL_HEALTH_Last10_MentalHealth",
        // Mental_Illness_Severe: "LAST_10_MENTAL_HEALTH_Mental_Illness_Severe",
        // Eating_Disorders: "LAST_10_MENTAL_HEALTH_Eating_Disorders"
        //Last2_Procedure: "DL_Last2_Procedure"
      }
    },
    {
      bucket: "EVIDENCE_DISABILITY",
      evaluate: {
        _max: "EVIDENCE_DISABILITY",
        // Non_Medical_Limits: "EL_Non_Medical_Limits"

        // Last10_MentalHealth: "EL_Last10_MentalHealth"
      }
    },

    {
      bucket: "UW_MONTHLY_BENEFIT_DIB",
      evaluate: {
        _max: "UW_MONTHLY_BENEFIT_DIB",
        // _sum: "UW_VOLUME_LIFE",
        // _max: "UW_VOLUME_LIFE",
        // _min: "UW_VOLUME_LIFE",
      }
    },
    // {
    //   bucket: "EM_LIFE",
    //   evaluate: {
    //     _max: "EM_LIFE",
    //     _sum: "EM_LIFE_sum"
    //   }
    // },
    // {
    //   bucket: "BMI",
    //   evaluate: {
    //     _max: "BMI"
    //   }
    // }

  ],

  debug: true,
  showRequest: true,
  shoeResponse: true,

}