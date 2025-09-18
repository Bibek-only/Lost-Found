export type UserInfo = {
  id: number;
  fullName: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  profileImage: string;
  email: string;
  phoneNo: string;
  isProfileCompleted: boolean;
  userType: string;
  campusRole: string;
  userState: string;
  branch: string;
  academicYear: string;
  section: string;
  currentYear: string;
  designation: string | null;
  department: string | null;
  jobTitle: string | null;
  staffDept: string | null;
  other: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserInfoResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserInfo;
  error: null;
};
