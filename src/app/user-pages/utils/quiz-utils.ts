import { BFF } from '../models/student';

export function canTakeQuiz(quiz: BFF.Quiz): boolean {
  const date = new Date();
  return quiz.dateFrom < date && quiz.dateTo > date;
}
