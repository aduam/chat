const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { messages: message } = require('../controllers/messages');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.get('/messages/:id', [
  check('id', 'The id is required').not().isEmpty(),
  fieldValidator,
  validateJWT,
], message);

module.exports = router;