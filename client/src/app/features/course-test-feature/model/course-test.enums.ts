export enum CourseTestStateEnum {
  APPROVED = 'APPROVED',  // date will be showed for students
  WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL',    // teacher must approve
  DECLINED = 'DECLINED',  // teacher declined
  IN_PROGRESS = 'IN_PROGRESS' // marker is creating
}
