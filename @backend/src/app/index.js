const versionTag = {
  v1: "/api/v1"
}

const productRouter = require("./product/router")

module.exports = app => {
  app.use(`${ versionTag.v1 }/product`, productRouter )
};