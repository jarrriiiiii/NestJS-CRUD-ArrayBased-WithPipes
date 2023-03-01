import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports:[], //Imported and Attached the repository file
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}



// -Entity is what gets stored in a database. A repository is what interacts with a database.
// -Repository is specific to an entity. Each entity will have its own, build-in repository.
// -Example of repository is TypeORM .
// -TypeORM is a TypeScript ORM (object-relational mapper) library that makes it easy to link your TypeScript application up to a relational database database.
// -To make a repository
// -We code the repository code in the separate file as 'task.repository.ts'
// -Then we will import this file in the module which is related to the repository which is 'tasks.module.ts'
// -The file 'task.repository.ts' will be attached in the IMPORT array of the 'tasks.module.ts'.