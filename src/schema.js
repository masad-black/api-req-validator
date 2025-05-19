const defaultOpt = {
  strict: false,
};

function createSchema(
  { body = {}, param = {}, query = {} },
  options = { ...defaultOpt }
) {
  return {
    body,
    param,
    query,
    options,
  };
}

export { createSchema };
