import sum from "../src/sum.js"
import assert from "assert"

describe("Test", () => {
  it("basic testing", () => {
    assert.equal(sum(1, 1), 2, "Sum of 1,1 is 2")
  })

  it("another testing", () => {
    assert.notEqual(sum(1, 1), 3, "Sum of 1,1 is not 3")
  })
})