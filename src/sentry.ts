import * as Sentry from '@sentry/browser';
import { Environment } from './environment';

if (typeof window !== 'undefined' && !Environment.isDev) {
  Sentry.init({
    dsn: 'https://3062fa4c8f8145eab5a7ce3f904c5906@sentry.anchor.io/18',
    environment: Environment.env,
  });
}
