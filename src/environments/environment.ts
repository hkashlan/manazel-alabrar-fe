import { isDevMode } from '@angular/core';

export interface Environment {
  loginPrefix: string;
  production: boolean;
}

const devEnvironment: Environment = {
  loginPrefix: 'http://localhost:1337',
  production: false,
};

const prodEnvironment: Environment = {
  loginPrefix: 'https://lms-be.manazel-alabrar.com',
  production: true,
};

export const environment: Environment = isDevMode() ? devEnvironment : prodEnvironment;
