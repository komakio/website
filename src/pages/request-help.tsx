import React from 'react';
import { Link } from 'gatsby';
import { useForm } from 'react-hook-form';

import { Layout } from '../components/layout/layout';
import { Image } from '../components/image';
import { SEO } from '../components/seo';
import { Input } from '../components/form/input';
import { FormElement } from '@components/form/form-element';
import { FormUtils } from '@utils/form';
import { AutoComplete } from '@components/form/autocomplete';
import { Select, Option } from '@components/form/select';
import { COUNTRIES } from '@utils/countries';
import { Checkbox } from '@components/form/checkbox';

type FormData = {
  firstName: string;
  lastName: string;
  location: string;
  email: string;
  dialCode: string;
  phone: string;
  captcha: string;
  gdpr: boolean;
  terms: boolean;
  privacy: boolean;
};

const IndexPage = () => {
  const { register, handleSubmit, errors, control } = useForm<FormData>({
    // defaultValues: { gdpr: true, terms: false, privacy: false },
  });
  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  // console.log(getValues().gdpr);

  return (
    <Layout>
      <SEO title="Request help" />

      <form onSubmit={onSubmit} noValidate={true}>
        <FormElement
          label="Email"
          error={errors.email}
          validateErrorType="email"
        >
          <Input
            name="email"
            type="email"
            register={register({
              required: true,
              validate: FormUtils.emailValidate,
            })}
          />
        </FormElement>
        <FormElement label="First name" error={errors.firstName}>
          <Input name="firstName" register={register({ required: true })} />
        </FormElement>
        <FormElement label="Last name" error={errors.lastName}>
          <Input name="lastName" register={register({ required: true })} />
        </FormElement>
        <FormElement label="Location" error={errors.location}>
          <AutoComplete
            name="location"
            register={register({ required: true })}
          />
        </FormElement>
        <FormElement label="Phone" error={errors.phone}>
          <Select name="dialCode" register={register({ required: true })}>
            {COUNTRIES.map(c => (
              <Option value={c.dialCode} key={c.code}>
                {c.name} ({c.dialCode})
              </Option>
            ))}
          </Select>
          <Input name="phone" register={register({ required: true })} />
        </FormElement>
        <FormElement label="CAPTCHA" error={errors.captcha}>
          <Input name="captcha" register={register({ required: true })} />
        </FormElement>
        <FormElement
          label="Terms"
          error={errors.terms}
          validateErrorType="required"
        >
          <Checkbox
            name="terms"
            control={control}
            isRequired={true}
            label="I have read and agree with the <0>terms of service</0>"
          />
        </FormElement>
        <FormElement
          label="Privacy"
          error={errors.privacy}
          validateErrorType="required"
        >
          <Checkbox
            name="privacy"
            control={control}
            isRequired={true}
            label="I understand and consent to the collection and use of my personal information, including my Health Data, as described in the <0>privacy policy</0>"
          />
        </FormElement>

        <FormElement
          label="GDPR"
          error={errors.gdpr}
          validateErrorType="required"
        >
          <Checkbox
            name="gdpr"
            control={control}
            isRequired={true}
            label="I agree with the processing of my email address by Komak for the purpose of establishing communication with their user volunteers"
          />
        </FormElement>
        <input type="submit" />
      </form>
    </Layout>
  );
};

export default IndexPage;
