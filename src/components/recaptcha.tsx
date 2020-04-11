import React, { FC, useEffect, memo } from 'react';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';
import Axios from 'axios';
import { Environment } from '../environment';
import { AccessToken } from '@api/access-token';
import { createGlobalStyle } from 'styled-components';

export const GlobalStylesWithRecaptcha = createGlobalStyle`
    .grecaptcha-badge { visibility: visible; }
`;

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
    <>
      <GlobalStylesWithRecaptcha />
      <ReCaptcha
        sitekey={Environment.recaptchaKey}
        action={action}
        verifyCallback={async recaptchaToken => {
          const { data } = await Axios.post(
            `${Environment.backendUrl}/v1/users/captcha`,
            {
              captcha: recaptchaToken,
            }
          );
          AccessToken.set(data.accessToken.token);
        }}
      />
    </>
  );
});
