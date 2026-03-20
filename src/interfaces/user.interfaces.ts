export enum OtpStatus {
  GENERATED = 'GENERATED',
  EXPIRED = 'EXPIRED',
  VERIFIED = 'VERIFIED',
}

export enum AuthType {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum LifeStage {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  INTERNSHIP = 'INTERNSHIP',
  CONTRACT = 'CONTRACT',
}

export enum CtcFrequency {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export enum EducationLevel {
  TENTH = 'TENTH',
  TWELVETH = 'TWELVETH',
  DIPLOMA = 'DIPLOMA',
  BACHELORS = 'BACHELORS',
  MASTERS = 'MASTERS',
  DOCTORATE = 'DOCTORATE',
  OTHER = 'OTHER',
}

export enum LangProficiency {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERT = 'EXPERT',
}

export enum WorkType {
  REMOTE = 'REMOTE',
  ON_SITE = 'ON_SITE',
  HYBRID = 'HYBRID',
}

export enum JobCategory {
  CURATED = 'CURATED',
  FREELANCE = 'FREELANCE',
}

export enum JobApplicationStatus {
  APPLIED = 'APPLIED',
  SHORTLISTED = 'SHORTLISTED',
  REJECTED = 'REJECTED',
  SAVED = 'SAVED',
}

export enum InterviewMode {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum InterviewStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export interface IUserTokenInfo {
  id: string;
  ip: string;
  userAgent: string;
  iat: number;
  exp: number;
  role: string;
}

export enum SearchType {
  PEOPLE = 'PEOPLE',
  JOBS = 'JOBS',
  POSTS = 'POSTS',
  ARTICLES = 'ARTICLES',
}

export enum ConnectionStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BLOCK = 'BLOCK',
}

export enum NotificationCategory {
  COMMENTS = 'COMMENTS',
  CHANNEL = 'CHANNEL',
  EVENT = 'EVENT',
  CONTENT = 'CONTENT',
}

export enum NotificationIcon {
  COMMENT = 'COMMENT',
  BELL = 'BELL',
  BOOK = 'BOOK',
  VIDEO = 'VIDEO',
  CALENDAR = 'CALENDAR',
}
