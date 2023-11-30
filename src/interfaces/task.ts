export interface Task {
    id: number;
    taskId: string;
    title: string;
    description: string;
    doneTime: Date;
    notificationTime: Date;
    isCompleted: boolean;
    userId: string;
  }
  
export interface CreateTask {
    title: string;
    description: string;
    userId: string;
  }
  
export interface UpdateTask {
    title?: string;
    description?: string;
    isCompleted?: boolean;
    doneTime?: Date;
    taskId: string;
  }
  