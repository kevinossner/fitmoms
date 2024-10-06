import { Course } from "./CourseType";

export type Mom = {
  id?: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
  updatedAt?: string;
  openBills: boolean;
};

export type CustomMom = Mom & {
  registratedCourses: Course[];
  attendanceCount: number;
};
