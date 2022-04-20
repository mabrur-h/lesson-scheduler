import {Field, InputType} from "@nestjs/graphql";
import {IsString, MinLength} from "class-validator";

@InputType()
export class CreateStudentInput {
    @MinLength(2)
    @IsString()
    @Field()
    firstName: string

    @MinLength(2)
    @IsString()
    @Field()
    lastName: string
}