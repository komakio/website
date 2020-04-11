import React, { FC, useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { useForm } from 'react-hook-form';

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
import { Input } from '@components/form/input';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { RichText as RichTextPrismic } from 'prismic-reactjs';
import { ProfilesApi, ProfileRequestCreation } from '@api/profile';

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
  latitude: number;
  longitude: number;
};

const PhoneContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const Flex = styled.div`
  flex: 1;
`;
const RequestContainer = styled.div`
  padding: 40px 0;
`;

interface RequestHelpProps {
  email: string;
  explanations: string;
  firstname: string;
  gdpr: string;
  lastname: string;
  location: string;
  phone: string;
  privacy: string;
  submit: string;
  terms: string;
  termsPrivacyTitle: string;
  title: string;
  countryChoose: string;
  loading: string;
  noResults: string;
  success: string;
  error: string;
}
export const RequestHelp: FC<RequestHelpProps> = ({
  email,
  explanations,
  firstname,
  gdpr,
  lastname,
  location,
  phone,
  privacy,
  submit,
  terms,
  termsPrivacyTitle,
  title,
  countryChoose,
  loading: loadingLabel,
  noResults,
  success: successLabel,
  error: errorLabel,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    triggerValidation,
    formState,
  } = useForm<FormData>({
    defaultValues: {
      gdpr: false,
      terms: false,
      privacy: false,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onSubmit = handleSubmit(async data => {
    setLoading(true);
    try {
      const sentData: ProfileRequestCreation = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: {
          location: {
            type: 'Point',
            coordinates: [
              parseFloat(data.longitude as any),
              parseFloat(data.latitude as any),
            ],
          },
          raw: data.location,
        },
        phone: { number: data.phone, dialCode: data.dialCode },
      };
      await ProfilesApi.createRequest(sentData);
      setLoading(false);
      setSuccess(true);
    } catch (e) {
      setLoading(false);
      setError(true);
      throw e;
    }
  });

  return (
    <RequestContainer>
      <Recaptcha action="needer_profile_creation" />
      <form onSubmit={onSubmit} noValidate={true}>
        <Container>
          <Row>
            {success && (
              <Col col={12} md={6}>
                <h4>{successLabel}</h4>
              </Col>
            )}
            {error && (
              <Col col={12} md={6}>
                <h4>{errorLabel}</h4>
              </Col>
            )}
            {!success && !error && (
              <Col col={12} md={6}>
                <h3>{title}</h3>
                <Row>
                  <Col col={6} xs={12}>
                    <FormElement label={firstname} error={errors.firstName}>
                      <Input
                        name="firstName"
                        register={register({ required: true })}
                      />
                    </FormElement>
                  </Col>

                  <Col col={6} xs={12}>
                    <FormElement label={lastname} error={errors.lastName}>
                      <Input
                        name="lastName"
                        register={register({ required: true })}
                      />
                    </FormElement>
                  </Col>
                  <Col col={6} xs={12}>
                    <FormElement
                      label={location}
                      error={
                        errors.location || errors.latitude || errors.longitude
                      }
                    >
                      <AutoComplete
                        onChooseLocation={props => {
                          console.log(props);
                          setValue('longitude', props.longitude);
                          setValue('latitude', props.latitude);
                          setValue('location', props.label);
                          if (formState.isSubmitted) {
                            triggerValidation();
                          }
                        }}
                        loadingLabel={loadingLabel}
                        noResultsLabel={noResults}
                        name="location"
                        register={register({ required: true })}
                      />
                    </FormElement>
                    <input
                      type="hidden"
                      name="latitude"
                      ref={register({
                        required: true,
                      })}
                    />
                    <input
                      type="hidden"
                      name="longitude"
                      ref={register({
                        required: true,
                      })}
                    />
                  </Col>
                  <Col col={6} xs={12}>
                    <FormElement label={email} error={errors.email}>
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
                  label={phone}
                  error={errors.phone || errors.dialCode}
                >
                  <PhoneContainer>
                    <Flex style={{ marginRight: 3 }}>
                      <Select
                        name="dialCode"
                        register={register({ required: true })}
                        error={errors.dialCode}
                      >
                        <Option value="">{countryChoose}</Option>
                        {COUNTRIES.map(c => (
                          <Option value={c.dialCode} key={c.code}>
                            {c.name} ({c.dialCode})
                          </Option>
                        ))}
                      </Select>
                    </Flex>
                    <Flex>
                      <Input
                        name="phone"
                        error={errors.phone}
                        register={register({ required: true })}
                      />
                    </Flex>
                  </PhoneContainer>
                </FormElement>
                <FormElement
                  label={termsPrivacyTitle}
                  error={errors.terms || errors.gdpr || errors.privacy}
                >
                  <Checkbox
                    name="terms"
                    control={control}
                    isRequired={true}
                    label={RichTextPrismic.render(terms)}
                    error={errors.terms}
                  />
                  <Checkbox
                    name="privacy"
                    control={control}
                    isRequired={true}
                    label={RichTextPrismic.render(privacy)}
                    error={errors.privacy}
                  />
                  <Checkbox
                    name="gdpr"
                    control={control}
                    isRequired={true}
                    label={gdpr}
                    error={errors.gdpr}
                  />
                </FormElement>

                <div style={{ margin: '40px 0', textAlign: 'center' }}>
                  {!loading && <Button type="submit">{submit}</Button>}
                </div>
              </Col>
            )}
            <Col col={12} md={6}>
              {RichTextPrismic.render(explanations)}
            </Col>
          </Row>
        </Container>
      </form>
    </RequestContainer>
  );
};
