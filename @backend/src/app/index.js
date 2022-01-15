const versionTag = {
  v1: "/api/v1"
}

const productRouter = require("./product/router")
const transactionRouter = require("./transaction/router")
const customerRouter = require("./customer/router")
const employeeRouter = require("./employee/router")
const imageRouter = require("./image/router")

module.exports = app => {
  app.use(`${ versionTag.v1 }/product`, productRouter )
  app.use(`${ versionTag.v1 }/transaction`, transactionRouter )
  app.use(`${ versionTag.v1 }/customer`, customerRouter )
  app.use(`${ versionTag.v1 }/employee`, employeeRouter )
  app.use(`${ versionTag.v1 }/image`, imageRouter )
};