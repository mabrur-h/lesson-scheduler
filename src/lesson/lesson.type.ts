import {Field, ID, ObjectType} from "@nestjs/graphql";

// rename of the type
@ObjectType('Lesson')
export class LessonType {
    @Field(type => ID)
    id: string

    @Field()
    name: string

    @Field()
    startDate: string

    @Field()
    endDate: string
}