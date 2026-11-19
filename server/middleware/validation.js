const Joi = require('joi');

// التحقق من بيانات تسجيل مستخدم جديد
const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    location: Joi.string().allow('', null),
    description: Joi.string().allow('', null),
    occupation: Joi.string().allow('', null)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// التحقق من بيانات تسجيل الدخول
const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// التحقق من بيانات إضافة تعليق
const validateComment = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    comment: Joi.string().min(1).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateComment
};
