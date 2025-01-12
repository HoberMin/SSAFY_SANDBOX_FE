import { authCookieHandler } from './authCookieHandler';
import { authHandler } from './authHandler';
import { authHeaderHandler } from './authHeaderHandler';
import { emailHandler } from './emailHandler';
import { FCMHandler } from './fcmHandler';
import { pagingHandler } from './pagingHandler';
import { todoHandler } from './todoHandler';

export const handlers = [
  ...FCMHandler,
  ...todoHandler,
  ...emailHandler,
  ...authHandler,
  ...authCookieHandler,
  ...authHeaderHandler,
  ...pagingHandler,
];
