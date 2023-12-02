import { isDevMode } from '@angular/core';

export interface Environment {
  auth: {
    google: string;
    facebook: string;
  };
  production: boolean;
}

const devEnvironment: Environment = {
  auth: {
    google: 'http://localhost:1337/api/connect/google',
    facebook: 'http://localhost:1337/api/connect/facebook',
  },
  production: false,
};

const prodEnvironment: Environment = {
  auth: {
    google: 'https://lms-be.manazel-alabrar.com/api/connect/google',
    facebook: 'https://lms-be.manazel-alabrar.com/api/connect/facebook',
  },
  production: true,
};

export const environment: Environment = isDevMode() ? devEnvironment : prodEnvironment;
