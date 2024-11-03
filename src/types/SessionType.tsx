import { Course } from "./CourseType";
import { Session } from "../API";

export type CustomSession = Session & { courseInfo: Course };
