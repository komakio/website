import { colors } from '@utils/colors';
import { css } from 'styled-components';

export const selectInputStyles = css`
  padding: 8px 6px;
  outline: 0;
  background: #fafafa;
  border: 1px solid #dfe1e6;
  border-radius: 3px;
  min-width: 200px;
  height: 32px;

  &:focus {
    border-color: ${colors.blue200};
  }
`;
