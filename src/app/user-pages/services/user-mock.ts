import { Course, Student } from '../models/student';

const tomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  return tomorrow;
};

export const student: Student = {
  name: 'Razan',
  lastname: 'Zabadneh',
  image: '',
  faculties: [
    {
      id: 1,
      name: 'Quran',
      description: 'Learn Quran',
      progress: 50,
      courses: [
        {
          id: 1,
          name: 'level 1',
          description: 'Level 1 description',
          from: new Date(),
          to: new Date(),
          progress: 70,
          lessons: [
            {
              lessonId: 1,
              description: 'lesson one',
              present: true,
              mark: 40,
              date: new Date(),
              questions: [
                {
                  text: 'question 1',
                  answers: [
                    {
                      text: 'answer 1',
                      correct: true,
                    },
                    {
                      text: 'answer 2',
                      correct: false,
                    },
                  ],
                },
                {
                  text: 'question 2',
                  answers: [
                    {
                      text: 'answer 2',
                      correct: true,
                    },
                    {
                      text: 'answer 2',
                      correct: false,
                    },
                  ],
                },
              ],
            },
            {
              lessonId: 2,
              description: 'lesson 2',
              present: false,
              mark: 40,
              date: tomorrowDate(),
              questions: [
                {
                  text: 'question 2',
                  answers: [
                    {
                      text: 'answer 2',
                      correct: true,
                    },
                    {
                      text: 'answer 2',
                      correct: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'level 2',
          description: 'Level 2 description',
          from: new Date(),
          to: new Date(),
          progress: 70,
          lessons: [],
        },
      ],
    },
  ],
};

export const courses: Course[] = [
  {
    id: 1,
    name: 'level 1',
    description: 'Level 1 description',
    from: new Date(),
    to: new Date(),
    progress: 70,
    lessons: [
      {
        lessonId: 1,
        description: 'lesson one',
        present: true,
        mark: 40,
        date: new Date(),
        questions: [
          {
            text: 'question 1',
            answers: [
              {
                text: 'answer 1',
                correct: true,
              },
              {
                text: 'answer 2',
                correct: false,
              },
            ],
          },
          {
            text: 'question 2',
            answers: [
              {
                text: 'answer 2',
                correct: true,
              },
              {
                text: 'answer 2',
                correct: false,
              },
            ],
          },
        ],
      },
      {
        lessonId: 2,
        description: 'lesson 2',
        present: false,
        mark: 40,
        date: tomorrowDate(),
        questions: [
          {
            text: 'question 2',
            answers: [
              {
                text: 'answer 2',
                correct: true,
              },
              {
                text: 'answer 2',
                correct: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'level 2',
    description: 'Level 2 description',
    from: new Date(),
    to: new Date(),
    progress: 70,
    lessons: [],
  },
];
