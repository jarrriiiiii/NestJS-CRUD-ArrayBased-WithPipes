import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

