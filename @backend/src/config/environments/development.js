module.exports = {
  env: "development",
  host: "localhost",
  port: 1234,
  mongoUrl: "mongodb://localhost:27017/",
  logLevel: "debug",
  secret: "ultimateSecretZone",
  zoho_auth: {
    user: "service@xihetang.com.tw",
    password: "Z=d$cDEVTYPS4.Em"
  },
  corsSettings: {
    origin: ['http://localhost:8080', "http://localhost:80"]
  }
}