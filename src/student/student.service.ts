import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Student} from "./student.entity";
import {Repository} from "typeorm";
import {CreateStudentInput} from "./create-student.input";
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) {}

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
        const { firstName, lastName } = createStudentInput;

        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        })

        return this.studentRepository.save(student)
    }

    async getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOne({
            where: {
                id
            }
        })
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        // return this.studentRepository.find({
        //     where: {
        //         id: {
        //             $in: studentIds
        //         }
        //     }
        // });

        // I know this method isn't good for the performance, but the method in the above didn't work :(
        let students = [];
        for (let i = 0; i < studentIds.length; i++) {
            students.push(this.studentRepository.findOne({
                where: {
                    id: studentIds[i]
                }
            }))
        }
        return students;
    }
}
