import { CustomMom } from "./MomType";
import { Course, Mom } from "../API";
import { CourseFull } from "./CourseType";
import { CustomSession } from "./SessionType";

export type RootStackParamList = {
  MomsOverview: undefined;
  MomDetails: { mom: CustomMom; courses: Course[] };
  MomAdd: { courses: Course[] };
  CourseOverview: undefined;
  CourseAdd: { moms: Mom[] };
  CourseDetails: { course: CourseFull; moms: Mom[] };
  Calendar: undefined;
  SessionDetails: { session: CustomSession; courses: CourseFull[] };
  SessionAdd: { courses: CourseFull[]; date: string };
};
