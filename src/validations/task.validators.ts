import * as Joi from 'joi';
import { CreateTask, UpdateTask} from '../interfaces/task';

export const validateTaskCreation = (task: CreateTask) => {
    const taskCreationSchema = Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
    });

    return taskCreationSchema.validate(task);
}

export const validateTaskUpdate = (task: UpdateTask) => {
    const taskUpdateSchema = Joi.object().keys({
        title: Joi.string(),
        description: Joi.string(),
        isCompleted: Joi.boolean(),
        doneTime: Joi.date(),
        taskId: Joi.string().required(),
    });

    return taskUpdateSchema.validate(task);
}


