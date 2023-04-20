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
  path: {
    register: "path.register",
    register_confirm: "path.register_confirm",
    no_path_open: "path.no_path_open",
  },
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
