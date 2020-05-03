import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { colors } from '@utils/colors';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Flag from 'react-world-flags';
import { Container } from 'styled-bootstrap-grid';
import { SocialIcon } from '@components/social-icon';
import { useLanguage } from '@components/page-context';
import { Environment } from '../../environment';
import { usePopper } from 'react-popper';
import { useDebounce } from 'use-debounce';
import { Language } from '@utils/language';

export const footerHeight = 70;

const StyledFooter = styled.footer`
  background: ${colors.green200};
  color: white;
  position: relative;

  .footer-top {
    height: ${footerHeight}px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .flex {
      flex: 1;
    }
  }

  .copyright {
    text-align: center;
    font-size: 10px;
    padding-bottom: 3px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .language {
    display: flex;
    flex-direction: row;
    cursor: pointer;
  }

  .language-label {
    margin-right: 10px;
    position: relative;
    top: 4px;
  }

  .language-popper {
    background: ${colors.green100};
    padding: 0 10px;
    padding-bottom: 10px;
    border-radius: 5px;
    margin-right: 10px;

    .language {
      text-align: center;
      padding: 10px 5px;
    }
  }
`;

export const Footer: FC = () => {
  const language = useLanguage();
  const envLanguage = Environment.languages.find(
    l => l.languageCode === (language === 'default' ? 'en' : language)
  );
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'left',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>();
  const [dropdownOpenDebounced] = useDebounce(isDropdownOpen, 200);

  const onChooseLanguage = (language: string) => () => {
    Language.setToLocalStorage(language);
    document.location.reload();
  };

  return (
    <StyledFooter>
      <Container>
        <div className="footer-top">
          <a
            href="https://www.facebook.com/Komak-103491531295452/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon icon="facebook" />
          </a>
          <a
            href="https://twitter.com/komak_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon icon="twitter" />
          </a>
          <a
            href="https://www.instagram.com/komak.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon icon="instagram" />
          </a>
          <div className="flex"></div>
          <div
            className="language"
            ref={setReferenceElement}
            onMouseOver={() => setIsDropdownOpen(true)}
            onMouseOut={() => setIsDropdownOpen(false)}
          >
            <div className="language-label">{envLanguage?.label}</div>
            {envLanguage?.flagCode && (
              <Flag code={envLanguage?.flagCode} height="25" />
            )}
          </div>
          {dropdownOpenDebounced && (
            <div
              className="language-popper"
              onMouseOver={() => setIsDropdownOpen(true)}
              onMouseOut={() => setIsDropdownOpen(false)}
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              {Environment.languages.map(l => (
                <div
                  key={l.languageCode}
                  className="language"
                  onClick={onChooseLanguage(l.languageCode)}
                >
                  <div className="language-label">{l.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="copyright">© {new Date().getFullYear()}, Nabo NGO</div>
      </Container>
    </StyledFooter>
  );
};
