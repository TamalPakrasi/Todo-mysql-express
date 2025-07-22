import { CustomError } from "../utils/errors/customError.error.js";

const error = (err, req, res, next) => {
  const isCustom = err instanceof CustomError;

  const sts = isCustom ? err.statusCode : 500;

  const message = err.message.length > 0 ? err.message : "Something went wrong";

  console.log({
    status: sts,
    message,
  });

  res.status(sts).json({ success: false, status: sts, message });
};

export default error;
