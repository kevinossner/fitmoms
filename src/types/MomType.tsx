import { Course } from "./CourseType";

export type NewMom = {
  firstName: string;
  lastName: string;
  openBills: boolean;
  notes: string;
  registratedCourses: Course[];
  attendanceCount: number;
};

export type Mom = NewMom & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
