export interface Answer {
  text: string;
  correct: boolean;
}

export interface Question {
  text: string;
  answers: Answer[];
}

export interface Lesson {
  lessonId: number;
  description: string;
  present: boolean;
  date: Date;
  mark: number;
  questions: Question[];
}

export interface Course {
  id: number;
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