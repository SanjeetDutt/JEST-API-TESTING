import fs from "fs"
import csv from "csv-reader"
import { fileURLToPath } from "url"
import path, { dirname, resolve } from "path"
import { promises } from "dns"

export const getFilePath = (fileNameFromSrc) => {
  const __fileName = fileURLToPath(import.meta.url)
  const __dirName = dirname(__fileName)
  const __filePath = path.resolve(__dirName, fileNameFromSrc)

  return __filePath
}

const readFileAsStream = async (fileName) => fs.createReadStream(fileName, "utf-8")

export const readCsv = async (fileName) => {

  const fileStream = await readFileAsStream(fileName)

  return new Promise((resolve, reject) => {
    const result = []

    fileStream
      .pipe(new csv({ parseBooleans: true, parseNumbers: true, trim: true, }))
      .on("data", (data) => result.push(data))
      .on("end", () => resolve(result))
  })
}

export const parseCsvToObject = (csvArray = [[], []], valueOperation = null) => {

  const header = csvArray[0]; // First row as header
  const result = []
  for (let i = 1; i < csvArray.length; i++) {
    const obj = {}
    header.forEach((column, j) => {
      if (!!valueOperation) {
        obj[column] = valueOperation(csvArray[i][j])
      } else {
        obj[column] = csvArray[i][j]
      }
    })
    result.push(obj)
  }
  return result

}

