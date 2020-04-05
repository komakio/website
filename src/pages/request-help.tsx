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
import { Recaptcha } from '@components/recaptcha';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import styled from 'styled-components';

type FormData = {
  firstName: string;
  lastName: string;
  location: string;
  email: string;
  dialCode: string;
  phone: string;
  gdpr: boolean;
  terms: boolean;
  privacy: boolean;
};

const GooglePrivacy = styled.div`
  font-size: 11px;
`;

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
      <Recaptcha action="needer_profile_creation" />
      <form onSubmit={onSubmit} noValidate={true}>
        <Container>
          <Row>
            <Col col={12} md={6}>
              <Row>
                <Col col={6} xs={12}>
                  <FormElement label="First name" error={errors.firstName}>
                    <Input
                      name="firstName"
                      register={register({ required: true })}
                    />
                  </FormElement>
                </Col>

                <Col col={6} xs={12}>
                  <FormElement label="Last name" error={errors.lastName}>
                    <Input
                      name="lastName"
                      register={register({ required: true })}
                    />
                  </FormElement>
                </Col>
                <Col col={6} xs={12}>
                  <FormElement label="Location" error={errors.location}>
                    <AutoComplete
                      name="location"
                      register={register({ required: true })}
                    />
                  </FormElement>
                </Col>
                <Col col={6} xs={12}>
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
                </Col>
              </Row>
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
              <FormElement
                label="Terms & Privacy"
                error={errors.terms || errors.gdpr || errors.privacy}
                validateErrorType="required"
              >
                <Checkbox
                  name="terms"
                  control={control}
                  isRequired={true}
                  label="I have read and agree with the <0>terms of service</0>"
                />
                <Checkbox
                  name="privacy"
                  control={control}
                  isRequired={true}
                  label="I understand and consent to the collection and use of my personal information, including my Health Data, as described in the <0>privacy policy</0>"
                />
                <Checkbox
                  name="gdpr"
                  control={control}
                  isRequired={true}
                  label="I agree with the processing of my email address by Komak for the purpose of establishing communication with their user volunteers"
                />
              </FormElement>

              <GooglePrivacy>
                This site is protected by reCAPTCHA and the Google{' '}
                <a href="https://policies.google.com/privacy">Privacy Policy</a>{' '}
                and
                <a href="https://policies.google.com/terms">
                  Terms of Service
                </a>{' '}
                apply.
              </GooglePrivacy>
            </Col>
            <Col col={12} md={6}>
              BLALB
            </Col>
          </Row>
        </Container>

        <input type="submit" />
      </form>
    </Layout>
  );
};

export default IndexPage;
