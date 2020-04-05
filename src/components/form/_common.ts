import { colors } from '@utils/colors';
import { css } from 'styled-components';

export const selectInputStyles = css`
  padding: 8px 6px;
  outline: 0;
  background: #fafafa;
  border: 1px solid #dfe1e6;
  border-radius: 3px;
  width: 100%;
  height: 42px;
  font-size: 16px;
  transition: all 150ms;

  &:focus {
    border-color: #fafafa;
    box-shadow: 0 0 0 3px ${colors.green100};
  }
`;
