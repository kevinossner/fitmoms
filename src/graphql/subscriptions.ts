/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateMom = /* GraphQL */ `subscription OnCreateMom($filter: ModelSubscriptionMomFilterInput) {
  onCreateMom(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMomSubscriptionVariables,
  APITypes.OnCreateMomSubscription
>;
export const onUpdateMom = /* GraphQL */ `subscription OnUpdateMom($filter: ModelSubscriptionMomFilterInput) {
  onUpdateMom(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMomSubscriptionVariables,
  APITypes.OnUpdateMomSubscription
>;
export const onDeleteMom = /* GraphQL */ `subscription OnDeleteMom($filter: ModelSubscriptionMomFilterInput) {
  onDeleteMom(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMomSubscriptionVariables,
  APITypes.OnDeleteMomSubscription
>;
export const onCreateCourse = /* GraphQL */ `subscription OnCreateCourse($filter: ModelSubscriptionCourseFilterInput) {
  onCreateCourse(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCourseSubscriptionVariables,
  APITypes.OnCreateCourseSubscription
>;
export const onUpdateCourse = /* GraphQL */ `subscription OnUpdateCourse($filter: ModelSubscriptionCourseFilterInput) {
  onUpdateCourse(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCourseSubscriptionVariables,
  APITypes.OnUpdateCourseSubscription
>;
export const onDeleteCourse = /* GraphQL */ `subscription OnDeleteCourse($filter: ModelSubscriptionCourseFilterInput) {
  onDeleteCourse(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCourseSubscriptionVariables,
  APITypes.OnDeleteCourseSubscription
>;
export const onCreateSession = /* GraphQL */ `subscription OnCreateSession($filter: ModelSubscriptionSessionFilterInput) {
  onCreateSession(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSessionSubscriptionVariables,
  APITypes.OnCreateSessionSubscription
>;
export const onUpdateSession = /* GraphQL */ `subscription OnUpdateSession($filter: ModelSubscriptionSessionFilterInput) {
  onUpdateSession(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSessionSubscriptionVariables,
  APITypes.OnUpdateSessionSubscription
>;
export const onDeleteSession = /* GraphQL */ `subscription OnDeleteSession($filter: ModelSubscriptionSessionFilterInput) {
  onDeleteSession(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSessionSubscriptionVariables,
  APITypes.OnDeleteSessionSubscription
>;
export const onCreateAttendance = /* GraphQL */ `subscription OnCreateAttendance(
  $filter: ModelSubscriptionAttendanceFilterInput
) {
  onCreateAttendance(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAttendanceSubscriptionVariables,
  APITypes.OnCreateAttendanceSubscription
>;
export const onUpdateAttendance = /* GraphQL */ `subscription OnUpdateAttendance(
  $filter: ModelSubscriptionAttendanceFilterInput
) {
  onUpdateAttendance(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAttendanceSubscriptionVariables,
  APITypes.OnUpdateAttendanceSubscription
>;
export const onDeleteAttendance = /* GraphQL */ `subscription OnDeleteAttendance(
  $filter: ModelSubscriptionAttendanceFilterInput
) {
  onDeleteAttendance(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAttendanceSubscriptionVariables,
  APITypes.OnDeleteAttendanceSubscription
>;
export const onCreateRegistration = /* GraphQL */ `subscription OnCreateRegistration(
  $filter: ModelSubscriptionRegistrationFilterInput
) {
  onCreateRegistration(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRegistrationSubscriptionVariables,
  APITypes.OnCreateRegistrationSubscription
>;
export const onUpdateRegistration = /* GraphQL */ `subscription OnUpdateRegistration(
  $filter: ModelSubscriptionRegistrationFilterInput
) {
  onUpdateRegistration(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRegistrationSubscriptionVariables,
  APITypes.OnUpdateRegistrationSubscription
>;
export const onDeleteRegistration = /* GraphQL */ `subscription OnDeleteRegistration(
  $filter: ModelSubscriptionRegistrationFilterInput
) {
  onDeleteRegistration(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRegistrationSubscriptionVariables,
  APITypes.OnDeleteRegistrationSubscription
>;
