import { Course, Mom as MomDto } from "../API";
import { CourseFull } from "./CourseType";
import { CustomSession } from "./SessionType";

export type RootStackParamList = {
  MomsOverview: undefined;
  MomDetails: { mom: MomDto };
  MomAdd: undefined;
  CourseOverview: undefined;
  CourseAdd: { moms: MomDto[] };
  CourseDetails: { course: CourseFull; moms: MomDto[] };
  Calendar: undefined;
  SessionDetails: { session: CustomSession; courses: CourseFull[] };
  SessionAdd: { courses: CourseFull[]; date: string };
};
