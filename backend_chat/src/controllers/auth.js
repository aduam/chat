const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../modules/user');
const { generateJWT } = require('../helpers/jwt');

const salt = bcrypt.genSaltSync(10);

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'No se pudo crear el usuario',
      });
    }

    const hash = bcrypt.hashSync(password, salt);
    const user = await User.create({ name, email, password: hash });
    await user.save();

    let token;

    try {
      token = await generateJWT(user.id);
    } catch (e) {
      console.error(e);
      res.status(500).json({
        ok: false,
        msg: 'Hubo un error al iniciar sesión',
      });
    }

    res.json({
      ok: true,
      user,
      token,
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador.',
    })
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let token;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(500).json({
      ok: false,
      msg: 'Credenciales incorrectas!',
    });
  }

  const matchPassword = bcrypt.compareSync(password, user.password);

  if (!matchPassword) {
    res.status(500).json({
      ok: false,
      msg: 'Credenciales incorrectas!',
    });
  }

  try {
    token = await generateJWT(user.id);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      msg: 'Hubo un error al iniciar sesión',
    });
  }

  res.json({
    ok: true,
    msg: 'login',
    body: {
      user,
      token,
    },
  });
};

const refreshToken = async (req, res) => {
  const { uid } = req;
  let token;

  try {
    token = await generateJWT(uid);
    const user = await User.findOne({ _id: uid });

    res.json({
      ok: true,
      token,
      user,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      msg: 'Hubo un error al generar el token>',
    });
  }
};

module.exports = {
  createUser,
  login,
  refreshToken,
};