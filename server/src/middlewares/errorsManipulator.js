import BaseError from "../errors/BaseError.js";

const errorsManipulator = (err, req, res, next) => {
  if (err instanceof BaseError) {
    err.sendAnswer(res)
  } else {
    new BaseError().sendAnswer(res)
  }
}

export default errorsManipulator;