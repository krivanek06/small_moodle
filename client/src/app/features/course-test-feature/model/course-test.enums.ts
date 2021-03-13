export enum CourseTestStateEnum {
  APPROVED = 'Approved',  // date will be showed for students
  WAITING_FOR_APPROVAL = 'Waiting for approval',    // teacher must approve
  IN_PROGRESS = 'In progress' // marker is creating
}

export enum CourseTestFormStateEnum {
  CREATE = 'CREATE',      // marker is creating new test
  VALIDATE = 'VALIDATE',  // marker is validating student's answers
  TAKE = 'TAKE',          // student is taking the test
  GRADED = 'GRADED',        // marker added points
  PREVIEW = 'PREVIEW'     // marker + teacher - shows only questions & points, no edit available
}
