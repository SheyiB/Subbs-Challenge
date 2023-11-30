import {AppDataSource} from "../data-source"
import { Repository } from "typeorm"
import {User} from "../entity/User"

import CustomError from "../helpers/customError"
import { Login, Signup } from "../interfaces/user"

class AuthService {

    private userRepository: Repository<User> = AppDataSource.getRepository(User)
    
    async signup(body: Signup): Promise<User | Error>{
        try{
          const {email, lastname, firstname, password} = body
          
          let user = await this.userRepository.findOne({
              where: {email}
            })
          
          if(user){
            return new CustomError('User already exists', 409)            
          }  
          
          user = Object.assign(new User(), {
            email,
            lastname,
            firstname,
            password,
            
          })

          user = await this.userRepository.save(user)

          return user
        }

        catch(error){
            return error
        }
    }

    async login(body: Login): Promise<string | Error>  {
    try{
        const {email, password} = body 
        const user = await this.userRepository.findOne({
          where: {email}
        })

        if(!user){
          throw new CustomError('User not found', 404)
        }

        const passwordMatch = await user.checkPassword(password)
        if(!passwordMatch){
          throw new CustomError('Invalid Credentials', 401)
        }

        const token = await user.generateJWT()
        return token
    }
    catch(error){
        return error
    }
    
  }
}

export default new AuthService()