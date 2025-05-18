import { validateBody } from "./validateBody.js";
import { validateQuery } from "./validateQuery.js";
import { validateParam } from "./validateParam.js";
import { ApiResponse } from "../apiResponse.js";

function validateRequest(schema) {
  return function (req, res, next) {
    console.log("original req.body: ", req.body);
    // console.log("req params: ", req.params);
    // console.log("req query: ", req.query);

    const errors = [];

    if (Object.keys(schema.body).length !== 0) {
      const bodyErrors = validateBody(req.body, schema.body);
      errors.push(bodyErrors);
    }

    if (Object.keys(schema.query).length !== 0) {
      // const { queryErrors, reqSchema } = validateQuery(req.query, schema.query);
      // req.modifiedQuery = reqSchema;
      // errors.push(queryErrors);
    }

    if (Object.keys(schema.param).length !== 0) {
      const paramErrors = validateParam(req.params, schema.param);
      errors.push(paramErrors);
    }

    console.log("back req.query: ", req.body);

    if (errors.length > 0) {
      return res.send(new ApiResponse(errors, 400));
    }

    // if no error next middleware will be called
    next();
  };
}

export { validateRequest };
