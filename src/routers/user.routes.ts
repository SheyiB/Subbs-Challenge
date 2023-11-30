import * as express from 'express'


import { createTask,getTask,getTasks, updateTask, deleteTask } from '../controllers/user.controller'

import { authMiddleware } from '../middleware/auth'

export const userRouter = express.Router()

userRouter.post('/create', authMiddleware, createTask)
userRouter.get('/', authMiddleware, getTasks)
userRouter.get('/:id', authMiddleware, getTask)
userRouter.put('/update', authMiddleware, updateTask)
userRouter.delete('/delete', authMiddleware, deleteTask)




