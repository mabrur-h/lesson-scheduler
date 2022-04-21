import {Resolver, Query, Mutation, Args, ResolveField, Parent} from "@nestjs/graphql";
import {LessonType} from "./lesson.type";
import {LessonService} from "./lesson.service";
import {CreateLessonInput} from "./lesson.input";
import {AssignStudentToLessonInput} from "./assign-student-to-lesson.input";
import {Lesson} from "./lesson.entity";
import {StudentService} from "../student/student.service";

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ) {}
    // generates a GraphQL schema query type name based on the method name
    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string
    ) {
        return this.lessonService.getLessonById(id)
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput,
    ) {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentToLessonInput
    ) {
        const { lessonId, studentIds } = assignStudentsToLessonInput;
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students);
    }
}
