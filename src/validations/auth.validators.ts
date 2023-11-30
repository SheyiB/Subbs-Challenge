import * as Joi from 'joi';

import { Login, Signup } from '../interfaces/user';

export const validateSignup = (user: Signup) => {
  const signupSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().required(),
  });

  return signupSchema.validate(user);
};

export const validateLogin = (user: Login) => {
  const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return loginSchema.validate(user);
};