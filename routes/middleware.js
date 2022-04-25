var jwt = require('jsonwebtoken');

function verifyAccessToken(req, res, next) {
  const token = req.headers['token'];
  console.log('verifier Access token', token);
  try {
    const user = jwt.verify(token, 'secret');
    next();
  } catch (e) {
    console.log('erreur token', e);
    res.status(500).send('token invalid');
    return;
  }
}

module.exports = { verifyAccessToken };
