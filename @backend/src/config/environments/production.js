module.exports = {
  env: "production",
  port: 1234,
  mongoUrl: process.env.MONGO_URI || "mongodb://database/",
  logLevel: "debug",
  corsSettings: null
}