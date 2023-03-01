//This interface will work as a typechecker for the tasks
export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus; 
}


//Enum feature is used when we have to choose limited states.
export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}