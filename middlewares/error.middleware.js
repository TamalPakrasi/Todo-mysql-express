import { CustomError } from "../utils/errors/customError.error.js";

const error = (err, req, res, next) => {
  const isCustom = err instanceof CustomError;

  const sts = isCustom ? err.statusCode : 500;

  const message = isCustom ? err.message : "Something went wrong";

  console.log(message, sts);

  res.status(sts).json({ status: sts, message });
};

export default error;
