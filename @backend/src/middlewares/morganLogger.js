import morgan from "morgan";

import Logger from "../lib/logger";

const stream = {
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan( "combined", { stream, skip } );

export default morganMiddleware;