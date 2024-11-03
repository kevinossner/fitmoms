import { Course as CourseDto, Mom as MomDto } from "../API";
import { Course } from "./CourseType";
import { CustomSession } from "./SessionType";

export type RootStackParamList = {
  MomsOverview: undefined;
  MomDetails: { mom: MomDto };
  MomAdd: undefined;
  MomEdit: { mom: MomDto };
  CourseOverview: undefined;
  CourseAdd: undefined;
  CourseEdit: { course: CourseDto };
  CourseDetails: { course: CourseDto };
  Calendar: undefined;
  SessionDetails: { session: CustomSession; courses: Course[] };
  SessionAdd: { courses: Course[]; date: string };
};
