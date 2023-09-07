import _Config from "../_Config.js"

export class Report {

  constructor(context, instance, title = "REPORT") {
    this.context = context
    this.response = []
    this.request = []
    this.report = []
    this.instance = instance
    this.title = title
  }

  addRequest(request) {
    this.request.push(request)
  }

  addResponse(response) {
    this.response.push(response)
  }

  addReport(name, value) {
    this.report[name] = value
  }

  publishReport() {

    const report = { ...this.report }

    if (_Config.showRequest) {
      report["request"] = this.request
    }

    if (_Config.shoeResponse) {
      report["response"] = this.response
    }

    this.context(this.instance, {
      title: this.title,
      value: report
    })
  }
}