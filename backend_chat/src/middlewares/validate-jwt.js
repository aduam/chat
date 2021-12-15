const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  try {
    const token = req.header('x-token');

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: 'No hay token en la petición.'
      });
    }

    const SECRET = process.env.SECRET || 'secret';
    const { uid } = jwt.verify(token, SECRET);
    req.uid = uid;
    next();
  } catch (e) {
    res.status(401).json({
      ok: false,
      msg: 'Token no es válido.'
    });
  }
};

module.exports = {
  validateJWT,
}