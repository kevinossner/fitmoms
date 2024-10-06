import { Mom } from "../API";

export type Course = {
  id?: string;
  name: string;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CourseFull = Course & { registratedMoms: Mom[] };
