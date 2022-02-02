const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    const SECRET = process.env.SECRET || 'secret';
    const options = { expiresIn: '24h' };

    jwt.sign(
      payload,
      SECRET,
      options,
      (error, token) => {
        if (error) {
          console.log(error);
          reject('No se pudo generar el error')
        }
        resolve(token);
      }
    );

  })
};

const verifyToken = (token) => {
  try {
    const { uid } = jwt.verify(token, process.env.SECRET);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = {
  generateJWT,
  verifyToken,
};
