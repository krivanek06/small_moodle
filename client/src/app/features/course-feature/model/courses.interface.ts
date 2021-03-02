import {StUserCourseMember, StUserMain} from "../../authentication-feature/models/user.interface";

export interface CoursePublic {
  Id: string;
  year: number;
  isOpen: boolean;
  category: string;
  creatorName: string;
  shortName: string;
  longName: string;
  durationFrom: string;
  durationTo: string;
  numberOfParticipants: number;
}

export interface CoursePrivate extends CoursePublic {
  upcoming_tests: any[]
  markers: StUserMain[];
  participants: StUserCourseMember[];
  gradings: CourseGrading[];
}

export interface CourseGrading {
  mark: string;
  points_min?: number;
  points_max?: number;
}
