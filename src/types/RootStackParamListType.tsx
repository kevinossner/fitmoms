import { Course as CourseDto, Mom as MomDto } from "../API";
import { CourseFull } from "./CourseType";
import { CustomSession } from "./SessionType";

export type RootStackParamList = {
  MomsOverview: undefined;
  MomDetails: { mom: MomDto };
  MomAdd: undefined;
  MomEdit: { mom: MomDto };
  CourseOverview: undefined;
  CourseAdd: undefined;
  CourseDetails: { course: CourseDto };
  Calendar: undefined;
  SessionDetails: { session: CustomSession; courses: CourseFull[] };
  SessionAdd: { courses: CourseFull[]; date: string };
};
