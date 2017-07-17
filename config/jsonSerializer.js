module.exports = {
  test: val => val && typeof val === 'object',
  print: val => JSON.stringify(val, null, 2),
};
