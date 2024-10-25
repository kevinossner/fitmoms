/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getMom = /* GraphQL */ `query GetMom($id: ID!) {
  getMom(id: $id) {
    id
    firstName
    lastName
    openBills
    notes
    courses {
      nextToken
      __typename
    }
    attendances {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetMomQueryVariables, APITypes.GetMomQuery>;
export const listMoms =
  /* GraphQL */ `query ListMoms($filter: ModelMomFilterInput, $limit: Int, $nextToken: String) {
  listMoms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      firstName
      lastName
      openBills
      notes
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListMomsQueryVariables, APITypes.ListMomsQuery>;
export const getCourse = /* GraphQL */ `query GetCourse($id: ID!) {
  getCourse(id: $id) {
    id
    name
    icon
    moms {
      nextToken
      __typename
    }
    sessions {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetCourseQueryVariables, APITypes.GetCourseQuery>;
export const listCourses = /* GraphQL */ `query ListCourses(
  $filter: ModelCourseFilterInput
  $limit: Int
  $nextToken: String
) {
  listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      icon
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCoursesQueryVariables,
  APITypes.ListCoursesQuery
>;
export const getSession = /* GraphQL */ `query GetSession($id: ID!) {
  getSession(id: $id) {
    id
    dateTime
    courseID
    course {
      id
      name
      icon
      createdAt
      updatedAt
      __typename
    }
    attendances {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSessionQueryVariables,
  APITypes.GetSessionQuery
>;
export const listSessions = /* GraphQL */ `query ListSessions(
  $filter: ModelSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      dateTime
      courseID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSessionsQueryVariables,
  APITypes.ListSessionsQuery
>;
export const getAttendance = /* GraphQL */ `query GetAttendance($id: ID!) {
  getAttendance(id: $id) {
    id
    momID
    sessionID
    mom {
      id
      firstName
      lastName
      openBills
      notes
      createdAt
      updatedAt
      __typename
    }
    session {
      id
      dateTime
      courseID
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAttendanceQueryVariables,
  APITypes.GetAttendanceQuery
>;
export const listAttendances = /* GraphQL */ `query ListAttendances(
  $filter: ModelAttendanceFilterInput
  $limit: Int
  $nextToken: String
) {
  listAttendances(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      momID
      sessionID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAttendancesQueryVariables,
  APITypes.ListAttendancesQuery
>;
export const getRegistration = /* GraphQL */ `query GetRegistration($id: ID!) {
  getRegistration(id: $id) {
    id
    momId
    courseId
    mom {
      id
      firstName
      lastName
      openBills
      notes
      createdAt
      updatedAt
      __typename
    }
    course {
      id
      name
      icon
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRegistrationQueryVariables,
  APITypes.GetRegistrationQuery
>;
export const listRegistrations = /* GraphQL */ `query ListRegistrations(
  $filter: ModelRegistrationFilterInput
  $limit: Int
  $nextToken: String
) {
  listRegistrations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      momId
      courseId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRegistrationsQueryVariables,
  APITypes.ListRegistrationsQuery
>;
export const sessionsByCourseIDAndDateTime =
  /* GraphQL */ `query SessionsByCourseIDAndDateTime(
  $courseID: ID!
  $dateTime: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  sessionsByCourseIDAndDateTime(
    courseID: $courseID
    dateTime: $dateTime
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      dateTime
      courseID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.SessionsByCourseIDAndDateTimeQueryVariables,
    APITypes.SessionsByCourseIDAndDateTimeQuery
  >;
export const attendancesByMomIDAndSessionID =
  /* GraphQL */ `query AttendancesByMomIDAndSessionID(
  $momID: ID!
  $sessionID: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelAttendanceFilterInput
  $limit: Int
  $nextToken: String
) {
  attendancesByMomIDAndSessionID(
    momID: $momID
    sessionID: $sessionID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      momID
      sessionID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.AttendancesByMomIDAndSessionIDQueryVariables,
    APITypes.AttendancesByMomIDAndSessionIDQuery
  >;
export const attendancesBySessionIDAndMomID =
  /* GraphQL */ `query AttendancesBySessionIDAndMomID(
  $sessionID: ID!
  $momID: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelAttendanceFilterInput
  $limit: Int
  $nextToken: String
) {
  attendancesBySessionIDAndMomID(
    sessionID: $sessionID
    momID: $momID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      momID
      sessionID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.AttendancesBySessionIDAndMomIDQueryVariables,
    APITypes.AttendancesBySessionIDAndMomIDQuery
  >;
export const registrationsByMomId = /* GraphQL */ `query RegistrationsByMomId(
  $momId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelRegistrationFilterInput
  $limit: Int
  $nextToken: String
) {
  registrationsByMomId(
    momId: $momId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      momId
      courseId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.RegistrationsByMomIdQueryVariables,
  APITypes.RegistrationsByMomIdQuery
>;
export const registrationsByCourseId =
  /* GraphQL */ `query RegistrationsByCourseId(
  $courseId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelRegistrationFilterInput
  $limit: Int
  $nextToken: String
) {
  registrationsByCourseId(
    courseId: $courseId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      momId
      courseId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.RegistrationsByCourseIdQueryVariables,
    APITypes.RegistrationsByCourseIdQuery
  >;

export const listMomsWithRelations = /* GraphQL */ `
  query ListMomsWithRelations(
    $filter: ModelMomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMoms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        openBills
        notes
        createdAt
        updatedAt
        # Access courses through the Registration model
        courses {
          items {
            id # This is the Registration ID
            course {
              id
              name
              icon
              createdAt
              updatedAt
              __typename
            }
            __typename
          }
          nextToken
          __typename
        }
        attendances {
          items {
            id
            momID
            sessionID
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;
