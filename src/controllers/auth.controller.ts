import { NextFunction, Request, Response } from 'express'
import AuthService from '../services/auth.service' 
import CustomError from '../helpers/customError'
import { User } from '../interfaces/user'
import {validateSignup, validateLogin} from '../validations/auth.validators'

export const signup = async (req: Request, res: Response): Promise<void> => {
    try{
        const {error} = validateSignup(req.body)

        if(error){
           return res.status(400).json({message: error.details[0].message})
        }

        const result = await AuthService.signup(req.body)
        
        if (result instanceof CustomError){

            return res.status(result.code).json({message: result.message})
        }
        else{
            return res.status(201).json({message: "SignUp Successful", user: result})
        }
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try{
        const {error} = validateLogin(req.body)

        if(error){
            return res.status(400).json({message: error.details[0].message})
        }

        const result: string | Error = await AuthService.login(req.body)

        if (result instanceof CustomError){
            return res.status(result.code).json({message: result.message})
        }
        else{    
            return res.status(200).json({message: "Login Successful", token: result})
        }
        
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

