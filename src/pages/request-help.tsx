import React from 'react';
import { Link } from 'gatsby';
import { useForm } from 'react-hook-form';

import {Layout} from '../components/layout/layout';
import {Image} from '../components/image';
import {SEO} from '../components/seo';
import { Input } from '../components/form/input';
import { FormElement } from '@components/form/form-element';
import { FormUtils } from '@utils/form';

const IndexPage = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Layout>
      <SEO title="Request help" />

      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <FormElement label="Email" error={errors.email} validateErrorType="email">
            <Input name="email" type="email" register={register({required: true, validate: FormUtils.emailValidate})} />
        </FormElement>
        <FormElement label="First name" error={errors.firstName}>
            <Input name="firstName" register={register({required: true})} />
        </FormElement>
        <FormElement label="Last name" error={errors.lastName}>
            <Input name="lastName" register={register({required: true})} />
        </FormElement>
        <FormElement label="Location" error={errors.location}>
            <Input name="location" register={register({required: true})} />
        </FormElement>
        <FormElement label="Phone" error={errors.phone}>
            <Input name="phone" register={register({required: true})} />
        </FormElement>
        <FormElement label="CAPTCHA" error={errors.captcha}>
            <Input name="captcha" register={register({required: true})} />
        </FormElement>
        <FormElement label="Terms" error={errors.captcha}>
            <Input name="captcha" register={register({required: true})} />
        </FormElement>
        <FormElement label="Policy" error={errors.captcha}>
            <Input name="captcha" register={register({required: true})} />
        </FormElement>
        <FormElement label="Email GDPR" error={errors.captcha}>
            <Input name="captcha" register={register({required: true})} />
        </FormElement>

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </Layout>
  );
};

export default IndexPage;
