const env = process.env.NODE_ENV || "development"

const config = env === "development" ? 
               require("./environments/development") :
               require("./environments/production")

module.exports = config
