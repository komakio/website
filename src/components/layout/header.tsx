import { Link, graphql, StaticQuery } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from '@utils/colors';
import { Container } from 'styled-bootstrap-grid';
import { HeaderLink } from './header-link';
import { useLanguage } from '@components/language';
import { Language } from '@utils/language';

export const headerHeight = 65;

const StyledHeader = styled.header`
  background-color: ${colors.green200};
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${headerHeight}px;
  z-index: 10;

  ${Container} {
    display: flex;
    flex-direction: row;
    /* align-items: center;
    justify-content: center;
    align-content: center;
    align-self: center; */
  }

  h1,
  h3 {
    margin: 0;
    line-height: ${headerHeight}px;
    /* display: flex;
    align-self: center; */
  }

  h1 {
    font-size: 32px;
    text-transform: uppercase;
    font-weight: bold;
  }

  a {
    color: white;
    text-decoration: none;
  }
`;

const Flex = styled.div`
  flex: 1;
`;

interface HeaderProps {
  topMenus: any[];
}
export const Header: FC<HeaderProps> = ({ topMenus }) => {
  const language = useLanguage();
  const graphQLQuery = graphql`
    query {
      allSitePage(
        filter: { context: { lang: { eq: "en-us" }, uid: { ne: "" } } }
      ) {
        edges {
          node {
            context {
              lang
              uid
              alternateLanguages {
                uid
                lang
              }
            }
          }
        }
      }
    }
  `;
  // const query = useStaticQuery(graphQLQuery);

  return (
    <StaticQuery
      query={graphQLQuery}
      render={query => {
        const pages = query.allSitePage.edges.map(e => e.node.context);
        return (
          <StyledHeader>
            <Container>
              <h1>
                <Link
                  to={language === Language.defaultLang ? '/' : `/${language}`}
                >
                  Komak
                </Link>
              </h1>
              <Flex />
              <nav style={{ height: 65, paddingTop: 26 }}>
                {topMenus?.map((element: any) => {
                  let link = element.link;
                  if (language !== Language.defaultLang) {
                    const page = pages.find(p => `/${p.uid}` === element.link);
                    const languagePage = page?.alternateLanguages.find(
                      c => c.lang === language
                    );
                    if (languagePage?.uid) {
                      link = `/${language}/${languagePage?.uid}`;
                    }
                  }
                  return (
                    <HeaderLink key={link} link={link} title={element.title} />
                  );
                })}
              </nav>
            </Container>
          </StyledHeader>
        );
      }}
    />
  );
};
