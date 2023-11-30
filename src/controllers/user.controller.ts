import { NextFunction, Request, Response } from 'express'
import UserService from '../services/user.service'
import CustomError from '../helpers/customError'
import { Task } from '../interfaces/task'
import {validateTaskCreation, validateTaskUpdate} from '../validations/task.validators'

export const createTask = async (req: Request, res: Response) => {
    try{
        const {error} = validateTaskCreation(req.body)

        if(error){
            return res.status(400).json({message: error.details[0].message})
        }

        const result: Task | Error = await UserService.createTask(req.body, req.userUid)
        
        if (result instanceof CustomError){
            return res.status(result.code).json({message: result.message})
        }
        else{
            return res.status(201).json({message: 'Task Created', task: result})
        }
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

export const getTasks = async (req: Request, res: Response) => {
    try{
        const result: Task[] | Error = await UserService.getAllTask(req.userId)
        
        if (result instanceof CustomError){
            return res.status(result.code).json({message: result.message})
        }
        else{
            return res.status(200).json({message: "Tasks", tasks: result})
        }
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

export const getTask = async (req: Request, res: Response) => {
    try{  
        const result: Task | Error = await UserService.getTask(req.params.id, req.userId)
        
        if (result instanceof CustomError){
            return res.status(result.code).json({message: result.message})
        }
        else{
            console.log('Take Off')
            console.log(result)
            return res.status(200).json({message: "Task", task: result})
            }
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try{
        const {error} = validateTaskUpdate(req.body)

        if(error){
            return res.status(400).json({message: error.details[0].message})
        }

        const result: Task | Error = await UserService.updateTask(req.body, req.userId)
        
        if (result instanceof CustomError){
            return res.status(result.code).json({message: result.message})
        }
        else{
            return res.status(200).json({message: result})
        }

    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try{
        const result: Task | Error = await UserService.deleteTask(req.body.taskId, req.userId)
        
        if (result instanceof CustomError){
            return res.status(result.code).json({message: result.message})
        }
        else{
            return res.status(200).json({message: "Task Deleted", task: result})
        }
    }
    catch(error){
        return res.status(500).json({message: error.message})       
    }
}