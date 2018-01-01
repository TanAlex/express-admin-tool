var locals = {};

locals.dblocals= {
  password: 'Password1!',
}

locals.dbSessionOptions = {
  password: locals.dblocals.password,
};

locals.redisOptions = {
  password = ''
}

module.exports = locals