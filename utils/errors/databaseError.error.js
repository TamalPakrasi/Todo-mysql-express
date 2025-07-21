import { CustomError } from "./customError.error.js";

class DatabaseError extends CustomError {
  constructor(message = "Database could not be reached") {
    super(message, 500);
  }
}

const databaseError = (message) => new DatabaseError(message);

export default databaseError;