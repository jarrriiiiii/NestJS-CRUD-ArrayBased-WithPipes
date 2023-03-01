import { Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Param, Patch, Put } from '@nestjs/common/decorators';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipeline';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {
  //To inject the services, in the controller, we need to make a constructor
  //In the parameter, set the object name 'tasksService' and it's type 'TasksService' which is a real file name.
  //Access Modifier should be Private
  constructor(private tasksService: TasksService) {}

  @Get() //Parameter level pipe below in the querry
  getTasks(@Query(ValidationPipe) filterDto : GetTasksFilterDto): Task[] { //Attached Interface 'Tasks' here as well, because it should return according to our interface type checker
  //Querry() means that we will ask user to enter it in its link, and those data will be entered in the variables 'status' and 'search'

      //if user enters the Querry then 'getTaskWithFilter' will be called.
      //else the method 'getAllTask' will be called.
      //For this condition we are using the following piece of code
      if (Object.keys(filterDto).length) {
        return this.tasksService.getTasksWithfilters(filterDto);
      }
      else {
        return this.tasksService.getAllTasks();
        }
}

  @Get('/:id')
  getTaskById(@Param('id') id : string): Task { // Interface is also attached here as 'Task'
    return this.tasksService.getTaskByid(id);
  }


  @Post()
  @UsePipes(ValidationPipe) //Applying the handler-level pipe to prevent the blank entry. Code is implementated in the DTO file
  createTask(
    //With DTO Applied
    @Body() createTaskDto: CreateTaskDto): Task { // Interface is also attached here as 'Task'
    return this.tasksService.createTask(createTaskDto);
  }


  @Delete('/:id')
  deleteTask(@Param('id') id : string): void { //Using Void as a return type because we arent returning anything
    this.tasksService.deleteTask(id)
  }

  @Put('/deleteall')
  deleteAll() {
    console.log("ok")
    this.tasksService.deleteAll();
  }


  @Patch('/:id/status')
  updateTaskStatus(
  @Param('id') id:string,
  @Body('status', TaskStatusValidationPipe) status : TaskStatus) //Applied the parameter-level pipe here to make sure that no invalid status is added. Coding is done in 'task-status-validation' file.
  {

  // [FEATURE 3]
  // To restrict the user to input only the available 'Task Status' when the changing the TASK STATUS and prevent user if user enter some other values execept for the available value in the array
  // -Make a custom pipe to only allow the valid 'Task Status' from the user.
  // -Pipe will be imlemented in the controller file. Beside the parameter. Such as '@Body('status') status : TaskStatus)'.
  // -Coding of the custom pipe will be done separately in a task-status-validation.pipeline.ts file.

  return this.tasksService.updateTaskStatus(id, status)
  }
}


