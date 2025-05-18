function validateQuery(reqSchema, queryScheam) {
  let queryErrors = [];

  for (let [field, rules] of Object.entries(queryScheam)) {
    // if filed exist
    if (reqSchema[field] === undefined) {
      if (rules.required) {
        queryErrors.push(`${[field]} doesn't exist, according to schema`);
        continue;
      } else continue;
    }

    //type conversion
    if (rules.convert) {
      if (rules.convert === "string")
        reqSchema[field] = String(reqSchema[field]);
      else if (rules.convert === "number")
        reqSchema[field] = Number(reqSchema[field]);
      else if (rules.convert === "boolean")
        reqSchema[field] = Boolean(reqSchema[field]);
      else if (rules.convert === "object")
        reqSchema[field] = Object(reqSchema[field]);
    }
  }

  console.log("next: req.query", reqSchema);

  return { queryErrors, reqSchema };
}
export { validateQuery };
