export interface Answer {
  text: string;
  correct: boolean;
}

export enum QuestionType {
  SingleChoice = 'SingleChoice',
  MultiChoice = 'MultiChoice',
}

export interface Question {
  text: string;
  answers: Answer[];
  questionType: QuestionType;
}

export interface Lesson {
  lessonId: number;
  name: string;
  description: string;
  present: boolean;
  date: Date;
  mark: number;
  questions: Question[];
}

export interface Course {
  id: number;
  facultyId: number;
  name: string;
  description: string;
  from: Date;
  to: Date;
  lessons: Lesson[];
  progress: number;
}

export interface Faculty {
  id: number;
  name: string;
  description: string;
  courses: Course[];
  progress: number;
}

export interface Student {
  name: string;
  lastname: string;
  image: string;
  faculties: Faculty[];
}
