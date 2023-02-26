import { Quiz } from '../models/student';

export function canTakeQuiz(quiz: Quiz): boolean {
  const date = new Date();
  return quiz.dateFrom < date && quiz.dateTo > date;
}
