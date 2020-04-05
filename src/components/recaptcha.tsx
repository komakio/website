import React, { FC, useEffect, memo } from 'react';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';
import { Environment } from '../environment';

export const RecaptchaInit: FC = memo(() => {
  useEffect(() => {
    loadReCaptcha(Environment.recaptchaKey);
  }, []);
  return null;
});

interface RecaptchaProps {
  action: string;
}

export const Recaptcha: FC<RecaptchaProps> = memo(({ action }) => {
  return (
    <ReCaptcha
      sitekey={Environment.recaptchaKey}
      action={action}
      verifyCallback={recaptchaToken => {
        console.log(recaptchaToken, '<= your recaptcha token');
      }}
    />
  );
});
