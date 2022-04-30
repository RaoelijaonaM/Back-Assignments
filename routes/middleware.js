var jwt = require('jsonwebtoken');

function verifyAccessToken(req, res, next) {
  const tokenContent = req.headers['authorization'];
  const token = tokenContent.split(' ')[1];
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
