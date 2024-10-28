import { Course } from "./CourseType";
import { Course as CourseDto } from "../API";

export type NewMom = {
  firstName: string;
  lastName: string;
  openBills: boolean;
  notes: string;
  registratedCourses: CourseDto[];
  attendanceCount: number;
};

export type Mom = NewMom & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
