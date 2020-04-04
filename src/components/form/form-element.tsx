import React, { memo, FC } from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';
import { colors } from '@utils/colors';

interface FormElementProps {
  label: string;
  error?: FieldError;
  validateErrorType?: string;
}

const FormElementComponent = styled.div`
  padding: 10px 30px;

  label {
    display: block;
    margin-bottom: 10px;
  }

  .error {
    color: ${colors.red200};
    text-transform: capitalize;
    font-size: 14px;
  }
`;

export const FormElement: FC<FormElementProps> = memo(
  ({ label, error, children, validateErrorType }) => {
    const errorType =
      (error?.type === 'validate' && validateErrorType) || error?.type;

    return (
      <FormElementComponent>
        <label>
          {label} {errorType && <span className="error">{errorType}</span>}
        </label>
        {children}
      </FormElementComponent>
    );
  }
);
