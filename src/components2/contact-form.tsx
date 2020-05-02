import React, { memo, FC, useState } from 'react';
import { Container } from 'styled-bootstrap-grid';
import { useForm } from 'react-hook-form';
import { Recaptcha } from '@components/recaptcha';
import { Input } from '@components/form/input';
import { FormElement } from '@components/form/form-element';
import { FormUtils } from '@utils/form';
import { Button } from '@components/button';
import SbEditable from 'storyblok-react';
import { StoryblokComponent } from '@models/storyblok-component';
import { Environment } from '../environment';
import Axios from 'axios';
import { AccessToken } from '@api/access-token';

interface ContactFormProps {
  hasBody: boolean;
  emailLabel: string;
  messageLabel: string;
  nameLabel: string;
  reason: string;
  submitLabel: string;
  successLabel: string;
  failedLabel: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: StoryblokComponent<ContactFormProps> = memo(
  ({ blok }) => {
    const {
      emailLabel,
      hasBody,
      messageLabel,
      nameLabel,
      reason,
      submitLabel,
      failedLabel,
      successLabel,
    } = blok;
    const { register, handleSubmit, errors } = useForm<FormData>({});
    const [loading, setLoading] = useState<boolean>();
    const [success, setSuccess] = useState<boolean>();
    const [error, setError] = useState<boolean>();

    const onSubmit = handleSubmit(async data => {
      setLoading(true);
      setSuccess(false);
      setError(false);

      try {
        await Axios.post(
          `${Environment.backendUrl}/v1/public/ask`,
          {
            email: data.email,
            name: data.name,
            content: `${reason}\n\n${data.message}`,
          },
          {
            headers: {
              Authorization: `Bearer ${AccessToken.get()}`,
            },
          }
        );
        setSuccess(true);
      } catch (e) {
        console.log(e);
        setLoading(true);
        setError(true);
      }
    });

    if (success) {
      return (
        <Container>
          <h3>{successLabel}</h3>
        </Container>
      );
    }
    if (error) {
      return (
        <Container>
          <h3>{failedLabel}</h3>
        </Container>
      );
    }

    return (
      <SbEditable content={blok}>
        <Recaptcha action="contact_form" />
        <form onSubmit={onSubmit} noValidate={true}>
          <FormElement label={nameLabel} error={errors.name}>
            <Input name="name" register={register({ required: true })} />
          </FormElement>
          <FormElement label={emailLabel} error={errors.email}>
            <Input
              name="email"
              register={register({
                required: true,
                validate: FormUtils.emailValidate,
              })}
            />
          </FormElement>

          {hasBody && (
            <FormElement label={messageLabel} error={errors.message}>
              <Input
                name="message"
                textarea
                register={register({
                  required: true,
                })}
              />
            </FormElement>
          )}
          {!loading && <Button type="submit">{submitLabel}</Button>}
        </form>
      </SbEditable>
    );
  }
);
