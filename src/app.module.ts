import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql'
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import {LessonModule} from './lesson/lesson.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Lesson} from './lesson/lesson.entity'
import {StudentModule} from './student/student.module';
import {Student} from "./student/student.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: 'mongodb://localhost/school',
            synchronize: true,
            useUnifiedTopology: true,
            entities: [
                Lesson,
                Student
            ] // database entities
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            // configure graph to use apollo server
            driver: ApolloDriver,
            // path where your automatically generated schema will be created
            autoSchemaFile: true
        }),
        LessonModule,
        StudentModule
    ],
})
export class AppModule {
}

// resolver will handle incoming request and then return the response. The same action with controller (REST).