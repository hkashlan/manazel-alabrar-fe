import { isDevMode } from '@angular/core';

export interface Environment {
  auth: {
    google: string;
  };
  production: boolean;
}

const devEnvironment: Environment = {
  auth: {
    google: 'http://localhost:1337/api/connect/google',
  },
  production: false,
};

const prodEnvironment: Environment = {
  auth: {
    google: 'https://lms-be.manazel-alabrar.com/api/connect/google',
  },
  production: true,
};

export const environment: Environment = isDevMode() ? devEnvironment : prodEnvironment;
