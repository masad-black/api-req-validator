function createSchema({ body = {}, param = {}, query = {} }) {
  return {
    body,
    param,
    query,
  };
}

export { createSchema };
