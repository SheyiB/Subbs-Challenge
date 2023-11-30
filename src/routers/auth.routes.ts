import * as express from 'express'

import {login, signup } from '../controllers/auth.controller'

export const authRouter = express.Router()

authRouter.post('/login', login)
authRouter.post('/signup', signup)
