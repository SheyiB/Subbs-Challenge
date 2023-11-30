import { AppDataSource } from "../data-source"
import { FindOperator, Repository } from "typeorm"
import { Task } from "../entity/Task"
import { User } from "../entity/User"
import CustomError from "../helpers/customError"
import { CreateTask, UpdateTask } from "../interfaces/task"

class UserService{

    private taskRepository: Repository<Task> = AppDataSource.getRepository(Task)
    private userRepository: Repository<User> = AppDataSource.getRepository(User)

    async createTask(body : CreateTask, userID: string): Promise<Task | Error> {
        try{
            const {title, description} = body

            let user = await this.userRepository.findOne({
                where: {userId: userID}
            });
            
            if (!user) {
                return new CustomError('User not found', 404);
            }

            let task = Object.assign(new Task(), {
                title,
                description,
                user,
                notificationTime: new Date()
            });


            task = await this.taskRepository.save(task)
            task.user.password = undefined


            return task

        }
        catch(error){
            return error
        }

    }

    async getAllTask(userId: string): Promise<Task[] | Error>{
        try{
            
            const tasks = await this.taskRepository.find({
                where: {userId: userId}
            })

            return tasks
        }
        catch(error){
            return new CustomError(error.message, 500)
        }

    }

    async getTask(taskId: string, userID: string): Promise<Task | Error>{
        try{
            const task = await this.taskRepository.findOne({
                where: {taskId}
            })

            if(!task){
                return new CustomError('Task not found', 404)
            }

            console.log(task.userId, userID)
            console.log(task)
            if(task.userId !== userID){
                return new CustomError('Unauthorized Request', 401)
            }
            console.log("HIoooooooooo")

            return task
        }
        catch(error){
            return new CustomError(error.message, 500)
        }
    }

    async updateTask(body: UpdateTask, userId: string): Promise<Task | Error>{
        try{
            const {title, description, isCompleted, doneTime, taskId} = body
    
            let task = await this.taskRepository.findOne({
                where: {taskId}
            })    
    
            if(!task){
                return new CustomError('Task not found', 404)
            }

            if(task.userId !== userId){
                return new CustomError('Unauthorized Request', 401)
            }    
    
            if (title !== undefined) task.title = title;
            if (description !== undefined) task.description = description;
            if (isCompleted !== undefined) task.isCompleted = isCompleted;
            if (doneTime !== undefined) task.doneTime = doneTime;

            if (isCompleted === true) {
                task.doneTime = new Date()
            }
    
            task = await this.taskRepository.save(task)
    
            return task
    
        }
        catch(error){
            return new CustomError(error.message, 500)
        }
    }
    

    async deleteTask(taskId: string, userId: string): Promise<Task | Error>{
        try{
            let task = await this.taskRepository.findOne({
                where: {taskId}
            })

            if(!task){
                return new CustomError('Task not found', 404)
            }

            if(task.userId !== userId){
                return new CustomError('Unauthorized Request', 401)
            }


            task = await this.taskRepository.remove(task)

            return task


        }
        catch(error){
            return new CustomError(error.message, 500)
        }
    }

}

export default new UserService()