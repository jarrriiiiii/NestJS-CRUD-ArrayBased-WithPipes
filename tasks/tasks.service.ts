import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

import { CreateTaskDto } from './dto/create-task.dto';


@Injectable()
export class TasksService {


    //Tasks Array
    // private tasks = []  , this is array defined without having the interface attached
    //'Task Interface' is also attached.
    private tasks: Task[] = [] //make it private because any outside component does not cause any changes to this array if it injects this service

//To get all the entries saved in an array
    getAllTasks(): Task[] { // Interface is also attached here as 'Task[]'
        return this.tasks;
    }


//User can get the tasks specifically by putting the STATUS and SEARCH keyword in the query
    getTasksWithfilters(filterDto :GetTasksFilterDto) : Task[] {
        //To make this DTO accesible by the following object
        const {status, search} = filterDto;

        //First we will fetch all the items in array in local string 'tasks'
        let tasks = this.getAllTasks();

        //Implementing the condition for the STATUS
        if (status) {
         tasks = this.tasks.filter(task => task.status === status);
        }

        //Implementing the condition for the SEARCH
        if (search) {
             tasks = this.tasks.filter(task => 
             task.title.includes(search) || task.description.includes(search) //For title and description matches 
        )}

        return tasks
    }


//User can get the tasks specifically by ID
    getTaskByid(id : string) : Task { // Interface is also attached here as 'Task[]'

        const found = this.tasks.find(task => task.id ===id);


// [FEATURE]
// To throw exception/error if there is no match found for search by ID or deleting the item
// -Add a condition in the method made in the service file.
// -If not found then throw error type of condition

            //If incase, there is no match found. Error will be thrown.
            if (!found){
                throw new NotFoundException();
            }

        return found;
    }

    //Create Task function without DTO
    // createTask(title: string, description: string) : Task { //Attaching type checker interface.

    //     const task: Task = { //attached typechecker interface we made, 'Task'
    //         id: uuidv4(),
    //         title,
    //         description,
    //         status : TaskStatus.OPEN,

    //     }
    // this.tasks.push(task) //this.array.push
    // return task // it is a good practice to return
    // }

 

//Create Task function with DTO
    createTask(createTaskDto: CreateTaskDto) : Task { //Attaching type checker interface.

        //To make this DTO accesible by the following object
            const {title, description} = createTaskDto;


            const task: Task = { //attached typechecker interface we made, 'Task'
            id: uuidv4(),
            title,
            description,
            status : TaskStatus.OPEN,

             }
            this.tasks.push(task) //this.array.push
            return task // it is a good practice to return
    }

//Delete Task function by ID
deleteTask(id : string) : void { //Using Void as a return type because we arent returning anything


    // [FEATURE]
    // To throw exception/error if there is no match found for search by ID or deleting the item
    // -Add a condition in the method made in the service file.
    // -If not found then throw error type of condition


    //Getting all the list of entries as 'found'
    const found = this.getTaskByid(id) //Reusing and re-calling the function which we made above
    this.tasks = this.tasks.filter(task=> task.id !== found.id) //Filter only filters the elements for which condition is false. True elements are allowed to pass in a new array                 
}

//Delete All Task function
deleteAll() {
  
this.tasks.splice(0);
return this.tasks;
}


//Update Task Status Function
updateTaskStatus(id:string, status:TaskStatus) : Task { //Attaching type checker interface. 
const task = this.getTaskByid(id) //Reusing and re-calling the function which we made above

            //If incase, there is no match found. Error will be thrown.
                if (!task){
                throw new NotFoundException();
                }

task.status = status;
return task
}

}



