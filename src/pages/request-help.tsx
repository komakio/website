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
import { Button } from '@components/button';

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
const PhoneContainer = styled.div`
  display: flex;
  flex-direction: row;
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
              <h1>
                Fill in the questionnaire below and we’ll send your request to
                our volunteers
              </h1>
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
              <FormElement
                label="Phone"
                error={errors.phone || errors.dialCode}
              >
                <PhoneContainer>
                  <div>
                    <Select
                      name="dialCode"
                      register={register({ required: true })}
                      style={{ marginRight: 3 }}
                    >
                      <Option value="">Select your country</Option>
                      {COUNTRIES.map(c => (
                        <Option value={c.dialCode} key={c.code}>
                          {c.name} ({c.dialCode})
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <Input name="phone" register={register({ required: true })} />
                </PhoneContainer>
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
                  label={
                    <>
                      I have read and agree with the{' '}
                      <a href="/terms">terms of service</a>
                    </>
                  }
                />
                <Checkbox
                  name="privacy"
                  control={control}
                  isRequired={true}
                  label={
                    <>
                      I understand and consent to the collection and use of my
                      personal information, including my Health Data, as
                      described in the <a href="/privacy">privacy policy</a>
                    </>
                  }
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
                and{' '}
                <a href="https://policies.google.com/terms">Terms of Service</a>{' '}
                apply.
              </GooglePrivacy>

              <div style={{ margin: '40px 0', textAlign: 'center' }}>
                <Button type="submit">Send a request</Button>
              </div>
            </Col>
            <Col col={12} md={6}>
              <p>
                <strong>How this works:</strong> This form works with our app,
                Komak. Fill in the form on this page and your request will go
                out as a notification to Komak users within your area.
              </p>

              <p>
                We send all nearby volunteers a notification, and whoever
                accepts to help you first will receive your contact details. At
                the same time, you will be receiving an email with the
                volunteer’s contact details, so please make sure you have a way
                of accessing your email.
              </p>

              <p>
                Contact the volunteer to pass on your request. Please be
                considerate when it comes to weight and volume. Request a
                picture of the receipt when it comes to groceries of medical
                supplies and pay digitally if possible. Avoid direct contact
                with the volunteer.
              </p>

              <p>
                <strong>Data privacy:</strong> We will only share your contact
                information with the volunteer that accepts to help you out.
              </p>

              <p>
                <strong>Who should request help:</strong> Our platform is
                designed for people in need to maintain isolation to be helped
                to do so. Please do not abuse our system if you are healthy and
                are not in a risk group.
              </p>

              <p>
                <strong>Requesting for someone else:</strong> Please feel free
                to place a request for someone else, such as a family members
                that lives far aware, a neighbor, friend, etc. Just make sure
                the contact information is correct and that they’re aware of
                your request.
              </p>

              <p>
                <strong>Important:</strong> Your address is used to create
                coordinates for delivering the request to our volunteers, and
                your phone number is your only way for volunteers to contact
                you. Make sure both are correct.
              </p>

              <p>
                Please check out our{' '}
                <a href="https://komak.io/user-instructions/">
                  user instructions
                </a>{' '}
                to ensure everyone’s safety.
              </p>

              <p>Stay safe!</p>
            </Col>
          </Row>
        </Container>
      </form>
    </Layout>
  );
};

export default IndexPage;
