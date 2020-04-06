import React, { FC, useEffect, memo } from 'react';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';
import Axios from 'axios';
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
      verifyCallback={async recaptchaToken => {
        console.log(recaptchaToken);
        const { data } = await Axios.post(
          `${Environment.backendUrl}/v1/users/captcha`,
          {
            captcha: recaptchaToken,
          }
        );
        console.log(data);
      }}
    />
  );
});
