import { Module } from '@nestjs/common';
import { WelcomeModule } from './welcome/welcome.module'
import { TaskModule } from './task/task.module'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as path from "path"
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    WelcomeModule,
    TaskModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'secret',
      database: 'example',
      entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
      context: ({ req }) => ({ req }),
      debug: true,
    }),
  ],
})
export class AppModule {}
