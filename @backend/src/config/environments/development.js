module.exports = {
  env: "development",
  host: "localhost",
  port: 1234,
  mongoUrl: "mongodb://localhost:27017/",
  logLevel: "debug",
  secret: "ultimateSecretZone",
  corsSettings: {
    origin: ['http://localhost:8080']
  }
}