import styled, { css, CSSProperties } from 'styled-components';
import { colors } from '@utils/colors';
import React, { memo, FC } from 'react';
import { navigate } from 'gatsby';

export const StyledButton = styled.button<ButtonProps>`
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  border-radius: 5px;
  color: #ffffff;
  line-height: 1;
  cursor: pointer;
  text-align: center;
  transition: all 250ms;
  outline: 0;
  font-size: 1.2rem;

  ${({ size }) =>
    size === 'medium' &&
    css`
      padding: 0.7rem 1rem;
      font-size: 1.1rem;
    `}


  ${({ theme }) =>
    theme === 'primary' &&
    css`
      background: ${colors.green200};
      &:active,
      &:focus {
        box-shadow: 0 0 0 3px ${colors.green200};
      }

      &:hover {
        background: ${colors.green100};
      }
    `}

  ${({ theme }) =>
    theme === 'white' &&
    css`
      background: white;
      color: ${colors.green200} !important;

      &:active,
      &:focus {
        box-shadow: 0 0 0 3px ${colors.green100};
      }

      &:hover {
        background: ${colors.grey100};
      }
    `}
`;

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: string;
  theme?: 'primary' | 'white';
  size?: 'large' | 'medium';
  className?: string;
  style?: CSSProperties;
}

export const Button: FC<ButtonProps> = memo(
  ({ children, href, onClick, type, theme, size, className, style }) => {
    if (href) {
      return (
        <StyledButton
          className={className}
          href={href}
          theme={theme}
          size={size}
          style={style}
          onClick={event => {
            if (event.ctrlKey || event.metaKey) {
              return;
            }
            event.preventDefault();
            if (href.indexOf('http') === 0) {
              document.location.href = href;
              return;
            }
            navigate(href);
          }}
          as="a"
        >
          {children}
        </StyledButton>
      );
    }

    return (
      <StyledButton
        className={className}
        type={type}
        size={size}
        theme={theme}
        onClick={onClick}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.defaultProps = {
  type: 'button',
  theme: 'primary',
  size: 'large',
};
