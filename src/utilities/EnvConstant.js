const WBD_EOI_ENV_CONSTANTS = {
    QA_MULE_DOMAIN: "https://qa.us1.api.pacificlife.net/wbd/eoi/v1", //NEW QA ENV VALUE
    UAT_MULE_DOMAIN: "https://uat.us1.api.pacificlife.net/wbd/eoi/v1", //NEW UAT ENV VALUE
    DEV_MULE_DOMAIN: "https://dev.us1.api.pacificlife.net/wbd/eoi/v1"
};


export const UME_Branch = ["PLGroupBen", "Lab_Rule_Import", "DI_Updates_PLGroupBen"]

export const Test_Files = ["Disability/MUW_Logic_Disability.csv", "Disability/Disability_Question_Logic.csv",


]

export const Life = {
    Basic_info_question: ["SOURCE", "PRODUCT", "COVERAGE_BASIS", "BASIC_BENEFIT_LIFE", "BASIC_ELECT_BENEFIT_LIFE", "VOL_BENEFIT_LIFE", "VOL_ELECT_BENEFIT_LIFE", "GENDER", "BIRTHDATE", "POLICY_SITUS"],
    Other_question: ["CITIZENSHIP", "HEIGHT_FEET", "HEIGHT_INCHES", "WEIGHT_MALE", "WEIGHT_FEMALE",
        "WEIGHT_OTHER", "TOBACCO", "LAST_5_DRIVING", "LAST_10_DRIVING", "LAST_5_TREATMENT", "LAST_2_PROCEDURE",
        "LAST_10_DRUG_USE", "LAST_10_ALCOHOL", "LAST_10_HIV", "LAST_10_HIV_FL", "LAST_10_HEART", "LAST_10_CANCER",
        "LAST_10_ENDO", "LAST_10_GITRACT", "LAST_10_GENITO_MALE", "LAST_10_GENITO_FEMALE", "LAST_10_GENITO_OTHER", "LAST_10_RESPIRATORY", "LAST_10_CNS", "LAST_10_MENTAL_HEALTH", "LAST_10_IMMUNE"],
    decision_buckets: [
        {
            bucket: "DECISION_LIFE",
            evaluate: {
                _max: "DECISION_LIFE",
                //Build: "DL_BUILD",
                Non_Medical_Limits: "DL_Non_Medical_Limits_COL",
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
                // Eating_Disorders: "LAST_10_MENTAL_HEALTH_Eating_Disorders",

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
                // _sum: "UW_VOLUME_LIFE",
                _max: "UW_VOLUME_LIFE",
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

    ]
}

export const Disability = {
    Basic_info_question: ["SOURCE", "PRODUCT", "COVERAGE_BASIS_DIB", "STD_BENEFIT_DIB", "STD_ELECT_BENEFIT_DIB", "LTD_BENEFIT_DIB", "LTD_ELECT_BENEFIT_DIB", "GENDER", "BIRTHDATE", "POLICY_SITUS"],
    Other_question: ["CITIZENSHIP", "HEIGHT_FEET", "HEIGHT_INCHES", "WEIGHT_MALE", "WEIGHT_FEMALE",
        "WEIGHT_OTHER", "TOBACCO", "LAST_5_DRIVING", "LAST_10_DRIVING", "LAST_5_TREATMENT", "LAST_2_PROCEDURE",
        "LAST_10_DRUG_USE", "LAST_10_ALCOHOL", "LAST_10_HIV", "LAST_10_HIV_FL", "LAST_10_HEART", "LAST_10_CANCER",
        "LAST_10_ENDO", "LAST_10_GITRACT", "LAST_10_GENITO_MALE", "LAST_10_GENITO_FEMALE", "LAST_10_GENITO_OTHER", "LAST_10_RESPIRATORY", "LAST_10_CNS", "LAST_10_MENTAL_HEALTH", "LAST_10_IMMUNE", "LAST_5_DIS_INS_BEN", "LAST_5_DIS_PAIN_GI_ENT",
        "LAST_5_DIS_DRIVE", "LAST_5_DIS_MUSCULO", "LAST_5_DIS_WORK", "DIS_PREGNANCY_APP"
    ],

    decision_buckets: [
        {
            bucket: "DECISION_DISABILITY",
            evaluate: {
                _max: "DECISION_DISABILITY",
                //Build: "DL_BUILD",
                //Non_Medical_Limits: "DL_Non_Medical_Limits_COL",

                DIS_Pregnancy: "DIS_Pregnancy_ALL",

                //LAST_5/10_Driving
                MVR_Check: "LAST_5_DRIVING/LAST_10_DRIVING/MVR_Check",

                //LAST_5_DIS_DRIVING
                Last5_DIS_Driving: "Last5_Dis_Driving",

                //LAST_5_Treatment
                Last5_Treatment: "Last5_Treatment",

                //LAST_2_Procedure
                Last2_Procedure: "Last2_Procedure",

                //Last_5_DIS_Musculo
                Last5_DIS_Musculo: "LAST_5_DIS_MUSCULO_ALL",

                //Last_10_Drug
                Sedative_Abuse: "LAST_10_DRUG_USE_ALL",
                Amphetamine_Abuse: "LAST_10_DRUG_USE_ALL",
                Opiate_Abuse: "LAST_10_DRUG_USE_ALL",
                Cocaine_Abuse: "LAST_10_DRUG_USE_ALL",
                Hallucinogen_Abuse: "LAST_10_DRUG_USE_ALL",
                Drug_Abuse: "LAST_10_DRUG_USE_ALL",


                //Last_10_Alchol
                Alcohol_Abuse: "LAST_10_ALCOHOL_ALL",
                Drug_Abuse: "LAST_10_ALCOHOL_ALL",

                //Last_10_HID/LAST_10_HIV_FL
                AIDS: "LAST_10_HIV_AIDS",


                //LAST_10_HEART
                Cardiomyopathy: "LAST_10_HEART_ALL",
                Chest_Pain: "LAST_10_HEART_ALL",
                Heart_Failure: "LAST_10_HEART_ALL",
                Heart_Attack: "LAST_10_HEART_ALL",
                Angina: "LAST_10_HEART_ALL",
                Heart_Murmur: "LAST_10_HEART_ALL",
                Heart_Valve_Disorder: "LAST_10_HEART_ALL",
                Arrhythmia: "LAST_10_HEART_ALL",
                Stroke: "LAST_10_HEART_ALL",
                Hypertension: "LAST_10_HEART_ALL",

                //LAST_10_cancer
                Nodule: "LAST_10_CANCER_ALL",
                Skin_Cancer: "LAST_10_CANCER_ALL",
                Melanoma: "LAST_10_CANCER_ALL",
                Hodgkins_Disease: "LAST_10_CANCER_ALL",
                Leukemia: "LAST_10_CANCER_Leukemia",
                Cancer_NOS: "LAST_10_CANCER_ALL",

                //Last_10_ENDO
                Diabetes: "LAST_10_ENDO_ALL",
                Impaired_Glucose: "LAST_10_ENDO_ALL",
                Blood_Disorder: "LAST_10_ENDO_ALL",
                Pituitary_Gland_Disease: "LAST_10_ENDO_ALL",
                Adrenal_Gland_Disorder: "LAST_10_ENDO_ALL",

                // Last10_GITract
                Hepatitis: "LAST_10_GITRACT_ALL",
                Cirrhosis_Of_The_Liver: "LAST_10_GITRACT_ALL",
                Crohns_Disease: "LAST_10_GITRACT_ALL",
                Ulcerative_Colitis: "LAST_10_GITRACT_ALL",
                Last10_GITract: "LAST_10_GITRACT_ALL",
                Refer_All: "LAST_10_GITRACT_ALL",



                //Last_10_Genito
                Last10_Genito: "LAST_10_GENITO_MALE_FEMALE_ALL",


                //LAST_10_RESPIRATORY
                Chronic_Obstructive_Pulmonary_Disease: "LAST_10_RESPIRATORY_ALL",
                Emphysema: "LAST_10_RESPIRATORY_ALL",
                Sleep_Apnoea: "LAST_10_RESPIRATORY_ALL",
                Last10_Resp: "LAST_10_RESPIRATORY_ALL",

                //"LAST_10_CNS
                Refer_All: "LAST_10_CNS_All",
                Epilepsy: "LAST_10_CNS_All",
                Amnesia: "LAST_10_CNS_All",
                Sclerosis: "LAST_10_CNS_All",
                Dystrophy: "LAST_10_CNS_All",
                Paralysis: "LAST_10_CNS_All",
                Parkinsons_Disease: "LAST_10_CNS_All",
                Tremor: "LAST_10_CNS_All",
                Muscular_Dystrophy: "LAST_10_CNS_All",
                Multiple_Sclerosis: "LAST_10_CNS_All",


                //"LAST_10_MENTAL_HEALTH
                Last10_MentalHealth: "LAST_10_MENTAL_HEALTH_ALL",
                Mental_Illness_Severe: "LAST_10_MENTAL_HEALTH_ALL",
                Eating_Disorders: "LAST_10_MENTAL_HEALTH_ALL",
                Mental_Illness_Moderate: "LAST_10_MENTAL_HEALTH_ALL",

                //LAST_10_IMMUNE
                Last10_Immune: "LAST_10_IMMUNE_ALL",
                Lupus_Erythematosus: "LAST_10_IMMUNE_ALL",


                Last5_DIS_ENTPainGI: "LAST_5_DIS_PAIN_GI_ENT_ALL",
                Last5_DIS_InsBen: "LAST_5_DIS_INS_BEN_ALL",
                Last5_DIS_Work: "LAST_5_DIS_WORK_ALL"

            },
        },
        {
            bucket: "EVIDENCE_DISABILITY",
            evaluate: {
                _max: "EVIDENCE_DISABILITY",

            }
        },

        {
            bucket: "UW_MONTHLY_BENEFIT_DIB",
            evaluate: {
                _max: "UW_MONTHLY_BENEFIT_DIB",

            }
        },

        // {
        //   bucket: "BMI",
        //   evaluate: {
        //     _max: "BMI"
        //   }
        // }

    ]
}



export const getFields = (type) => {

    const fieldMap =
    {
        Life: Life,
        Disability: Disability
    }

    return fieldMap[type] || null

}


export default WBD_EOI_ENV_CONSTANTS;