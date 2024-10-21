/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMomInput = {
  id?: string | null,
  firstName: string,
  lastName: string,
  openBills: boolean,
  notes?: string | null,
};

export type ModelMomConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  openBills?: ModelBooleanInput | null,
  notes?: ModelStringInput | null,
  and?: Array< ModelMomConditionInput | null > | null,
  or?: Array< ModelMomConditionInput | null > | null,
  not?: ModelMomConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Mom = {
  __typename: "Mom",
  id: string,
  firstName: string,
  lastName: string,
  openBills: boolean,
  notes?: string | null,
  courses?: ModelRegistrationConnection | null,
  attendances?: ModelAttendanceConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelRegistrationConnection = {
  __typename: "ModelRegistrationConnection",
  items:  Array<Registration | null >,
  nextToken?: string | null,
};

export type Registration = {
  __typename: "Registration",
  id: string,
  momId: string,
  courseId: string,
  mom: Mom,
  course: Course,
  createdAt: string,
  updatedAt: string,
};

export type Course = {
  __typename: "Course",
  id: string,
  name: string,
  icon?: string | null,
  moms?: ModelRegistrationConnection | null,
  sessions?: ModelSessionConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelSessionConnection = {
  __typename: "ModelSessionConnection",
  items:  Array<Session | null >,
  nextToken?: string | null,
};

export type Session = {
  __typename: "Session",
  id: string,
  dateTime: string,
  courseID: string,
  course?: Course | null,
  attendances?: ModelAttendanceConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelAttendanceConnection = {
  __typename: "ModelAttendanceConnection",
  items:  Array<Attendance | null >,
  nextToken?: string | null,
};

export type Attendance = {
  __typename: "Attendance",
  id: string,
  momID: string,
  sessionID: string,
  mom?: Mom | null,
  session?: Session | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateMomInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  openBills?: boolean | null,
  notes?: string | null,
};

export type DeleteMomInput = {
  id: string,
};

export type CreateCourseInput = {
  id?: string | null,
  name: string,
  icon?: string | null,
};

export type ModelCourseConditionInput = {
  name?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  and?: Array< ModelCourseConditionInput | null > | null,
  or?: Array< ModelCourseConditionInput | null > | null,
  not?: ModelCourseConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateCourseInput = {
  id: string,
  name?: string | null,
  icon?: string | null,
};

export type DeleteCourseInput = {
  id: string,
};

export type CreateSessionInput = {
  id?: string | null,
  dateTime: string,
  courseID: string,
};

export type ModelSessionConditionInput = {
  dateTime?: ModelStringInput | null,
  courseID?: ModelIDInput | null,
  and?: Array< ModelSessionConditionInput | null > | null,
  or?: Array< ModelSessionConditionInput | null > | null,
  not?: ModelSessionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateSessionInput = {
  id: string,
  dateTime?: string | null,
  courseID?: string | null,
};

export type DeleteSessionInput = {
  id: string,
};

export type CreateAttendanceInput = {
  id?: string | null,
  momID: string,
  sessionID: string,
};

export type ModelAttendanceConditionInput = {
  momID?: ModelIDInput | null,
  sessionID?: ModelIDInput | null,
  and?: Array< ModelAttendanceConditionInput | null > | null,
  or?: Array< ModelAttendanceConditionInput | null > | null,
  not?: ModelAttendanceConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateAttendanceInput = {
  id: string,
  momID?: string | null,
  sessionID?: string | null,
};

export type DeleteAttendanceInput = {
  id: string,
};

export type CreateRegistrationInput = {
  id?: string | null,
  momId: string,
  courseId: string,
};

export type ModelRegistrationConditionInput = {
  momId?: ModelIDInput | null,
  courseId?: ModelIDInput | null,
  and?: Array< ModelRegistrationConditionInput | null > | null,
  or?: Array< ModelRegistrationConditionInput | null > | null,
  not?: ModelRegistrationConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateRegistrationInput = {
  id: string,
  momId?: string | null,
  courseId?: string | null,
};

export type DeleteRegistrationInput = {
  id: string,
};

export type ModelMomFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  openBills?: ModelBooleanInput | null,
  notes?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMomFilterInput | null > | null,
  or?: Array< ModelMomFilterInput | null > | null,
  not?: ModelMomFilterInput | null,
};

export type ModelMomConnection = {
  __typename: "ModelMomConnection",
  items:  Array<Mom | null >,
  nextToken?: string | null,
};

export type ModelCourseFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCourseFilterInput | null > | null,
  or?: Array< ModelCourseFilterInput | null > | null,
  not?: ModelCourseFilterInput | null,
};

export type ModelCourseConnection = {
  __typename: "ModelCourseConnection",
  items:  Array<Course | null >,
  nextToken?: string | null,
};

export type ModelSessionFilterInput = {
  id?: ModelIDInput | null,
  dateTime?: ModelStringInput | null,
  courseID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSessionFilterInput | null > | null,
  or?: Array< ModelSessionFilterInput | null > | null,
  not?: ModelSessionFilterInput | null,
};

export type ModelAttendanceFilterInput = {
  id?: ModelIDInput | null,
  momID?: ModelIDInput | null,
  sessionID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAttendanceFilterInput | null > | null,
  or?: Array< ModelAttendanceFilterInput | null > | null,
  not?: ModelAttendanceFilterInput | null,
};

export type ModelRegistrationFilterInput = {
  id?: ModelIDInput | null,
  momId?: ModelIDInput | null,
  courseId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelRegistrationFilterInput | null > | null,
  or?: Array< ModelRegistrationFilterInput | null > | null,
  not?: ModelRegistrationFilterInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelSubscriptionMomFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  openBills?: ModelSubscriptionBooleanInput | null,
  notes?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMomFilterInput | null > | null,
  or?: Array< ModelSubscriptionMomFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionCourseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  icon?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCourseFilterInput | null > | null,
  or?: Array< ModelSubscriptionCourseFilterInput | null > | null,
};

export type ModelSubscriptionSessionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  dateTime?: ModelSubscriptionStringInput | null,
  courseID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSessionFilterInput | null > | null,
  or?: Array< ModelSubscriptionSessionFilterInput | null > | null,
};

export type ModelSubscriptionAttendanceFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  momID?: ModelSubscriptionIDInput | null,
  sessionID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAttendanceFilterInput | null > | null,
  or?: Array< ModelSubscriptionAttendanceFilterInput | null > | null,
};

export type ModelSubscriptionRegistrationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  momId?: ModelSubscriptionIDInput | null,
  courseId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRegistrationFilterInput | null > | null,
  or?: Array< ModelSubscriptionRegistrationFilterInput | null > | null,
};

export type CreateMomMutationVariables = {
  input: CreateMomInput,
  condition?: ModelMomConditionInput | null,
};

export type CreateMomMutation = {
  createMom?:  {
    __typename: "Mom",
    id: string,
    firstName: string,
    lastName: string,
    openBills: boolean,
    notes?: string | null,
    courses?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMomMutationVariables = {
  input: UpdateMomInput,
  condition?: ModelMomConditionInput | null,
};

export type UpdateMomMutation = {
  updateMom?:  {
    __typename: "Mom",
    id: string,
    firstName: string,
    lastName: string,
    openBills: boolean,
    notes?: string | null,
    courses?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMomMutationVariables = {
  input: DeleteMomInput,
  condition?: ModelMomConditionInput | null,
};

export type DeleteMomMutation = {
  deleteMom?:  {
    __typename: "Mom",
    id: string,
    firstName: string,
    lastName: string,
    openBills: boolean,
    notes?: string | null,
    courses?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCourseMutationVariables = {
  input: CreateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type CreateCourseMutation = {
  createCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    icon?: string | null,
    moms?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCourseMutationVariables = {
  input: UpdateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type UpdateCourseMutation = {
  updateCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    icon?: string | null,
    moms?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCourseMutationVariables = {
  input: DeleteCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type DeleteCourseMutation = {
  deleteCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    icon?: string | null,
    moms?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSessionMutationVariables = {
  input: CreateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type CreateSessionMutation = {
  createSession?:  {
    __typename: "Session",
    id: string,
    dateTime: string,
    courseID: string,
    course?:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSessionMutationVariables = {
  input: UpdateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type UpdateSessionMutation = {
  updateSession?:  {
    __typename: "Session",
    id: string,
    dateTime: string,
    courseID: string,
    course?:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSessionMutationVariables = {
  input: DeleteSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type DeleteSessionMutation = {
  deleteSession?:  {
    __typename: "Session",
    id: string,
    dateTime: string,
    courseID: string,
    course?:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAttendanceMutationVariables = {
  input: CreateAttendanceInput,
  condition?: ModelAttendanceConditionInput | null,
};

export type CreateAttendanceMutation = {
  createAttendance?:  {
    __typename: "Attendance",
    id: string,
    momID: string,
    sessionID: string,
    mom?:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    session?:  {
      __typename: "Session",
      id: string,
      dateTime: string,
      courseID: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAttendanceMutationVariables = {
  input: UpdateAttendanceInput,
  condition?: ModelAttendanceConditionInput | null,
};

export type UpdateAttendanceMutation = {
  updateAttendance?:  {
    __typename: "Attendance",
    id: string,
    momID: string,
    sessionID: string,
    mom?:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    session?:  {
      __typename: "Session",
      id: string,
      dateTime: string,
      courseID: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAttendanceMutationVariables = {
  input: DeleteAttendanceInput,
  condition?: ModelAttendanceConditionInput | null,
};

export type DeleteAttendanceMutation = {
  deleteAttendance?:  {
    __typename: "Attendance",
    id: string,
    momID: string,
    sessionID: string,
    mom?:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    session?:  {
      __typename: "Session",
      id: string,
      dateTime: string,
      courseID: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRegistrationMutationVariables = {
  input: CreateRegistrationInput,
  condition?: ModelRegistrationConditionInput | null,
};

export type CreateRegistrationMutation = {
  createRegistration?:  {
    __typename: "Registration",
    id: string,
    momId: string,
    courseId: string,
    mom:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRegistrationMutationVariables = {
  input: UpdateRegistrationInput,
  condition?: ModelRegistrationConditionInput | null,
};

export type UpdateRegistrationMutation = {
  updateRegistration?:  {
    __typename: "Registration",
    id: string,
    momId: string,
    courseId: string,
    mom:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRegistrationMutationVariables = {
  input: DeleteRegistrationInput,
  condition?: ModelRegistrationConditionInput | null,
};

export type DeleteRegistrationMutation = {
  deleteRegistration?:  {
    __typename: "Registration",
    id: string,
    momId: string,
    courseId: string,
    mom:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetMomQueryVariables = {
  id: string,
};

export type GetMomQuery = {
  getMom?:  {
    __typename: "Mom",
    id: string,
    firstName: string,
    lastName: string,
    openBills: boolean,
    notes?: string | null,
    courses?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMomsQueryVariables = {
  filter?: ModelMomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMomsQuery = {
  listMoms?:  {
    __typename: "ModelMomConnection",
    items:  Array< {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseQueryVariables = {
  id: string,
};

export type GetCourseQuery = {
  getCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    icon?: string | null,
    moms?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCoursesQueryVariables = {
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCoursesQuery = {
  listCourses?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSessionQueryVariables = {
  id: string,
};

export type GetSessionQuery = {
  getSession?:  {
    __typename: "Session",
    id: string,
    dateTime: string,
    courseID: string,
    course?:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSessionsQueryVariables = {
  filter?: ModelSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionsQuery = {
  listSessions?:  {
    __typename: "ModelSessionConnection",
    items:  Array< {
      __typename: "Session",
      id: string,
      dateTime: string,
      courseID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAttendanceQueryVariables = {
  id: string,
};

export type GetAttendanceQuery = {
  getAttendance?:  {
    __typename: "Attendance",
    id: string,
    momID: string,
    sessionID: string,
    mom?:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    session?:  {
      __typename: "Session",
      id: string,
      dateTime: string,
      courseID: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAttendancesQueryVariables = {
  filter?: ModelAttendanceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAttendancesQuery = {
  listAttendances?:  {
    __typename: "ModelAttendanceConnection",
    items:  Array< {
      __typename: "Attendance",
      id: string,
      momID: string,
      sessionID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRegistrationQueryVariables = {
  id: string,
};

export type GetRegistrationQuery = {
  getRegistration?:  {
    __typename: "Registration",
    id: string,
    momId: string,
    courseId: string,
    mom:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRegistrationsQueryVariables = {
  filter?: ModelRegistrationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRegistrationsQuery = {
  listRegistrations?:  {
    __typename: "ModelRegistrationConnection",
    items:  Array< {
      __typename: "Registration",
      id: string,
      momId: string,
      courseId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SessionsByCourseIDAndDateTimeQueryVariables = {
  courseID: string,
  dateTime?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SessionsByCourseIDAndDateTimeQuery = {
  sessionsByCourseIDAndDateTime?:  {
    __typename: "ModelSessionConnection",
    items:  Array< {
      __typename: "Session",
      id: string,
      dateTime: string,
      courseID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AttendancesByMomIDAndSessionIDQueryVariables = {
  momID: string,
  sessionID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAttendanceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AttendancesByMomIDAndSessionIDQuery = {
  attendancesByMomIDAndSessionID?:  {
    __typename: "ModelAttendanceConnection",
    items:  Array< {
      __typename: "Attendance",
      id: string,
      momID: string,
      sessionID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AttendancesBySessionIDAndMomIDQueryVariables = {
  sessionID: string,
  momID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAttendanceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AttendancesBySessionIDAndMomIDQuery = {
  attendancesBySessionIDAndMomID?:  {
    __typename: "ModelAttendanceConnection",
    items:  Array< {
      __typename: "Attendance",
      id: string,
      momID: string,
      sessionID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RegistrationsByMomIdQueryVariables = {
  momId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRegistrationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RegistrationsByMomIdQuery = {
  registrationsByMomId?:  {
    __typename: "ModelRegistrationConnection",
    items:  Array< {
      __typename: "Registration",
      id: string,
      momId: string,
      courseId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RegistrationsByCourseIdQueryVariables = {
  courseId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRegistrationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RegistrationsByCourseIdQuery = {
  registrationsByCourseId?:  {
    __typename: "ModelRegistrationConnection",
    items:  Array< {
      __typename: "Registration",
      id: string,
      momId: string,
      courseId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateMomSubscriptionVariables = {
  filter?: ModelSubscriptionMomFilterInput | null,
};

export type OnCreateMomSubscription = {
  onCreateMom?:  {
    __typename: "Mom",
    id: string,
    firstName: string,
    lastName: string,
    openBills: boolean,
    notes?: string | null,
    courses?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMomSubscriptionVariables = {
  filter?: ModelSubscriptionMomFilterInput | null,
};

export type OnUpdateMomSubscription = {
  onUpdateMom?:  {
    __typename: "Mom",
    id: string,
    firstName: string,
    lastName: string,
    openBills: boolean,
    notes?: string | null,
    courses?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMomSubscriptionVariables = {
  filter?: ModelSubscriptionMomFilterInput | null,
};

export type OnDeleteMomSubscription = {
  onDeleteMom?:  {
    __typename: "Mom",
    id: string,
    firstName: string,
    lastName: string,
    openBills: boolean,
    notes?: string | null,
    courses?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
};

export type OnCreateCourseSubscription = {
  onCreateCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    icon?: string | null,
    moms?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
};

export type OnUpdateCourseSubscription = {
  onUpdateCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    icon?: string | null,
    moms?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
};

export type OnDeleteCourseSubscription = {
  onDeleteCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    icon?: string | null,
    moms?:  {
      __typename: "ModelRegistrationConnection",
      nextToken?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSessionSubscriptionVariables = {
  filter?: ModelSubscriptionSessionFilterInput | null,
};

export type OnCreateSessionSubscription = {
  onCreateSession?:  {
    __typename: "Session",
    id: string,
    dateTime: string,
    courseID: string,
    course?:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSessionSubscriptionVariables = {
  filter?: ModelSubscriptionSessionFilterInput | null,
};

export type OnUpdateSessionSubscription = {
  onUpdateSession?:  {
    __typename: "Session",
    id: string,
    dateTime: string,
    courseID: string,
    course?:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSessionSubscriptionVariables = {
  filter?: ModelSubscriptionSessionFilterInput | null,
};

export type OnDeleteSessionSubscription = {
  onDeleteSession?:  {
    __typename: "Session",
    id: string,
    dateTime: string,
    courseID: string,
    course?:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAttendanceSubscriptionVariables = {
  filter?: ModelSubscriptionAttendanceFilterInput | null,
};

export type OnCreateAttendanceSubscription = {
  onCreateAttendance?:  {
    __typename: "Attendance",
    id: string,
    momID: string,
    sessionID: string,
    mom?:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    session?:  {
      __typename: "Session",
      id: string,
      dateTime: string,
      courseID: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAttendanceSubscriptionVariables = {
  filter?: ModelSubscriptionAttendanceFilterInput | null,
};

export type OnUpdateAttendanceSubscription = {
  onUpdateAttendance?:  {
    __typename: "Attendance",
    id: string,
    momID: string,
    sessionID: string,
    mom?:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    session?:  {
      __typename: "Session",
      id: string,
      dateTime: string,
      courseID: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAttendanceSubscriptionVariables = {
  filter?: ModelSubscriptionAttendanceFilterInput | null,
};

export type OnDeleteAttendanceSubscription = {
  onDeleteAttendance?:  {
    __typename: "Attendance",
    id: string,
    momID: string,
    sessionID: string,
    mom?:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    session?:  {
      __typename: "Session",
      id: string,
      dateTime: string,
      courseID: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRegistrationSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrationFilterInput | null,
};

export type OnCreateRegistrationSubscription = {
  onCreateRegistration?:  {
    __typename: "Registration",
    id: string,
    momId: string,
    courseId: string,
    mom:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRegistrationSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrationFilterInput | null,
};

export type OnUpdateRegistrationSubscription = {
  onUpdateRegistration?:  {
    __typename: "Registration",
    id: string,
    momId: string,
    courseId: string,
    mom:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRegistrationSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrationFilterInput | null,
};

export type OnDeleteRegistrationSubscription = {
  onDeleteRegistration?:  {
    __typename: "Registration",
    id: string,
    momId: string,
    courseId: string,
    mom:  {
      __typename: "Mom",
      id: string,
      firstName: string,
      lastName: string,
      openBills: boolean,
      notes?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
