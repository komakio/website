import React, { memo, FC, useMemo } from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';
import { colors } from '@utils/colors';

interface FormElementProps {
  label?: string;
  error?: FieldError;
  validateErrorType?: string;
}

const FormElementComponent = styled.div`
  margin-bottom: 20px;

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

    const changedChildren = useMemo(() => {
      return React.Children.map(children, (child: any, index) => {
        if (!child) {
          return null;
        }
        return React.cloneElement(child, { error, ...child.props });
      });
    }, [children, error]);

    return (
      <FormElementComponent>
        {label && (
          <label>
            {label} {errorType && <span className="error">*</span>}
          </label>
        )}
        {changedChildren}
      </FormElementComponent>
    );
  }
);
