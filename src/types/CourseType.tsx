import { Mom, Mom as MomDto } from "../API";

export type NewCourse = {
  name: string;
  registratedMoms: MomDto[];
};

export type Course = {
  id?: string;
  name: string;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CourseFull = Course & { registratedMoms: Mom[] };
