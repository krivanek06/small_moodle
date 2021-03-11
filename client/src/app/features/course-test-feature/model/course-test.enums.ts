export enum CourseTestStateEnum {
  APPROVED = 'Approved',  // date will be showed for students
  WAITING_FOR_APPROVAL = 'Waiting for approval',    // teacher must approve
  DECLINED = 'Declined',  // teacher declined
  IN_PROGRESS = 'In progress' // marker is creating
}

export enum CourseTestResultStateEnum {
  TESTING = 'TESTING',      // student is testing
  GRADED = 'GRADED',        // marker added points
  SUBMITTED = 'SUBMITTED'   // student submitted test and waiting for points
}
