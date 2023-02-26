export const translationKeys = {
  course: "course",
  quizzes: "quizzes",
  questions: "questions",
  check_exam: "check_exam",
  lesson: "lesson",
  lesson_finished: "lesson_finished",
  lesson_present: "lesson_present",
  lesson_mark: "lesson_mark",
  yes: "yes",
  no: "no",
  homepage: {
    exams: "homepage.exams",
    courses: "homepage.courses",
    exam: "homepage.exam",
  },
  quizzesPage: { from_to: "quizzesPage.from_to" },
};
export interface HomepageExamTransParams {
  name: string;
  from: string;
  to: string;
}
export interface QuizzesPageFromToTransParams {
  from: string;
  to: string;
}
