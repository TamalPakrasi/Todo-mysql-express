import { CustomError } from "./customError.error.js";

class DataNotFound extends CustomError {
  constructor(message = "No todo is found") {
    super(message, 404);
  }
}

const dataNotFound = (message) => new DataNotFound(message);

export default dataNotFound;
