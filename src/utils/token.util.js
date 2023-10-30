import JWT from "jsonwebtoken";
import logger from "../../src/config/logger.config.js";

export const sign = (payload, expiresIn, secret) => {
  return new Promise((resolve, reject) => {
    JWT.sign(
      payload,
      secret,
      {
        expiresIn: expiresIn,
      },
      (error, token) => {
        if (error) {
          logger.error(error);
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const verify = (token, secret) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, secret, (error, payload) => {
      if (error) {
        logger.error(error);
        resolve(null);
      } else {
        resolve(payload);
      }
    });
  });
};
