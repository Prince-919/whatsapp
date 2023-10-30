import createHttpError from "http-errors";
import JWT from "jsonwebtoken";

function authMiddleware(req, res, next) {
  if (!req.headers["authorization"])
    return next(createHttpError.Unauthorized());
  const bearerToken = req.headers["authorization"];
  const token = bearerToken.split(" ")[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      return next(createHttpError.Unauthorized());
    }
    req.user = payload;
    next();
  });
}

export default authMiddleware;
