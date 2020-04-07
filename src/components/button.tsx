import styled from 'styled-components';
import { colors } from '@utils/colors';
import React, { memo, FC } from 'react';
import { navigate } from 'gatsby';

export const StyledButton = styled.button`
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: ${colors.green200};
  border-radius: 5px;
  color: #ffffff;
  line-height: 1;
  cursor: pointer;
  text-align: center;
  transition: all 250ms;
  outline: 0;
  font-size: 1.2rem;

  &:active,
  &:focus {
    box-shadow: 0 0 0 3px ${colors.green200};
  }

  &:hover {
    background: ${colors.green100};
  }
`;

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: string;
}

export const Button: FC<ButtonProps> = memo(
  ({ children, href, onClick, type }) => {
    if (href) {
      return (
        <StyledButton
          href={href}
          onClick={event => {
            if (event.ctrlKey || event.metaKey) {
              return;
            }
            event.preventDefault();
            navigate(href);
          }}
          as="a"
        >
          {children}
        </StyledButton>
      );
    }

    return (
      <StyledButton type={type} onClick={onClick}>
        {children}
      </StyledButton>
    );
  }
);

Button.defaultProps = {
  type: 'button',
};
