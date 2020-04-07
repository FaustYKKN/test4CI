const jwt = require('jsonwebtoken');

module.exports = function decode( token ) {
  return jwt.decode( token )
}