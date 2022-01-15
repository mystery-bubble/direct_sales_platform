const winston = require("winston")

const env = require("..")

const levels = {
  error: 0,
  warning: 1,
  info: 2,
  http: 3,
  debug: 4
}

const level = () => {
  let env = process.env.NODE_ENV || 'development'
  let isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warning'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'gray',
  http: 'green',
  debug: 'cyan'
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    info => `${ info.timestamp } ${ info.level }: ${ info.message }`,
  ),
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: './logs/error.log',
    level: 'error'
  }),
  new winston.transports.File({ filename: './logs/all.log' }),
]

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

module.exports = Logger