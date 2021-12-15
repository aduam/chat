const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { createUser, login, refreshToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.post('/new', [
  check('name', 'The name is required').not().isEmpty(),
  check('email', 'The email is required').isEmail(),
  check('password', 'The password is required').not().isEmpty(),
  fieldValidator,
], createUser);

router.post('/', [
  check('email', 'The email is required').isEmail(),
  check('password', 'The password is required').not().isEmpty(),
  fieldValidator,
], login);

router.get('/refresh', validateJWT, refreshToken);

module.exports = router;