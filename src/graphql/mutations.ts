/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createMom = /* GraphQL */ `mutation CreateMom(
  $input: CreateMomInput!
  $condition: ModelMomConditionInput
) {
  createMom(input: $input, condition: $condition) {
    id
    firstName
    lastName
    openBills
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
` as GeneratedMutation<
  APITypes.CreateMomMutationVariables,
  APITypes.CreateMomMutation
>;
export const updateMom = /* GraphQL */ `mutation UpdateMom(
  $input: UpdateMomInput!
  $condition: ModelMomConditionInput
) {
  updateMom(input: $input, condition: $condition) {
    id
    firstName
    lastName
    openBills
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
` as GeneratedMutation<
  APITypes.UpdateMomMutationVariables,
  APITypes.UpdateMomMutation
>;
export const deleteMom = /* GraphQL */ `mutation DeleteMom(
  $input: DeleteMomInput!
  $condition: ModelMomConditionInput
) {
  deleteMom(input: $input, condition: $condition) {
    id
    firstName
    lastName
    openBills
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
` as GeneratedMutation<
  APITypes.DeleteMomMutationVariables,
  APITypes.DeleteMomMutation
>;
export const createCourse = /* GraphQL */ `mutation CreateCourse(
  $input: CreateCourseInput!
  $condition: ModelCourseConditionInput
) {
  createCourse(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCourseMutationVariables,
  APITypes.CreateCourseMutation
>;
export const updateCourse = /* GraphQL */ `mutation UpdateCourse(
  $input: UpdateCourseInput!
  $condition: ModelCourseConditionInput
) {
  updateCourse(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCourseMutationVariables,
  APITypes.UpdateCourseMutation
>;
export const deleteCourse = /* GraphQL */ `mutation DeleteCourse(
  $input: DeleteCourseInput!
  $condition: ModelCourseConditionInput
) {
  deleteCourse(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCourseMutationVariables,
  APITypes.DeleteCourseMutation
>;
export const createSession = /* GraphQL */ `mutation CreateSession(
  $input: CreateSessionInput!
  $condition: ModelSessionConditionInput
) {
  createSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateSessionMutationVariables,
  APITypes.CreateSessionMutation
>;
export const updateSession = /* GraphQL */ `mutation UpdateSession(
  $input: UpdateSessionInput!
  $condition: ModelSessionConditionInput
) {
  updateSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateSessionMutationVariables,
  APITypes.UpdateSessionMutation
>;
export const deleteSession = /* GraphQL */ `mutation DeleteSession(
  $input: DeleteSessionInput!
  $condition: ModelSessionConditionInput
) {
  deleteSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteSessionMutationVariables,
  APITypes.DeleteSessionMutation
>;
export const createAttendance = /* GraphQL */ `mutation CreateAttendance(
  $input: CreateAttendanceInput!
  $condition: ModelAttendanceConditionInput
) {
  createAttendance(input: $input, condition: $condition) {
    id
    momID
    sessionID
    mom {
      id
      firstName
      lastName
      openBills
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
` as GeneratedMutation<
  APITypes.CreateAttendanceMutationVariables,
  APITypes.CreateAttendanceMutation
>;
export const updateAttendance = /* GraphQL */ `mutation UpdateAttendance(
  $input: UpdateAttendanceInput!
  $condition: ModelAttendanceConditionInput
) {
  updateAttendance(input: $input, condition: $condition) {
    id
    momID
    sessionID
    mom {
      id
      firstName
      lastName
      openBills
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
` as GeneratedMutation<
  APITypes.UpdateAttendanceMutationVariables,
  APITypes.UpdateAttendanceMutation
>;
export const deleteAttendance = /* GraphQL */ `mutation DeleteAttendance(
  $input: DeleteAttendanceInput!
  $condition: ModelAttendanceConditionInput
) {
  deleteAttendance(input: $input, condition: $condition) {
    id
    momID
    sessionID
    mom {
      id
      firstName
      lastName
      openBills
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
` as GeneratedMutation<
  APITypes.DeleteAttendanceMutationVariables,
  APITypes.DeleteAttendanceMutation
>;
export const createRegistration = /* GraphQL */ `mutation CreateRegistration(
  $input: CreateRegistrationInput!
  $condition: ModelRegistrationConditionInput
) {
  createRegistration(input: $input, condition: $condition) {
    id
    momId
    courseId
    mom {
      id
      firstName
      lastName
      openBills
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
` as GeneratedMutation<
  APITypes.CreateRegistrationMutationVariables,
  APITypes.CreateRegistrationMutation
>;
export const updateRegistration = /* GraphQL */ `mutation UpdateRegistration(
  $input: UpdateRegistrationInput!
  $condition: ModelRegistrationConditionInput
) {
  updateRegistration(input: $input, condition: $condition) {
    id
    momId
    courseId
    mom {
      id
      firstName
      lastName
      openBills
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
` as GeneratedMutation<
  APITypes.UpdateRegistrationMutationVariables,
  APITypes.UpdateRegistrationMutation
>;
export const deleteRegistration = /* GraphQL */ `mutation DeleteRegistration(
  $input: DeleteRegistrationInput!
  $condition: ModelRegistrationConditionInput
) {
  deleteRegistration(input: $input, condition: $condition) {
    id
    momId
    courseId
    mom {
      id
      firstName
      lastName
      openBills
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
` as GeneratedMutation<
  APITypes.DeleteRegistrationMutationVariables,
  APITypes.DeleteRegistrationMutation
>;
