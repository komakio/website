import React, { memo, FC } from 'react';
import { Container } from 'styled-bootstrap-grid';
import { Link } from 'gatsby';
import { MetaLink } from '@components/page-context';
import styled from 'styled-components';
import Img from 'gatsby-image';

interface ImageProps {
  image: { url: string };
  imageLink: MetaLink;
  imageSharp: any;
}

const StyledImageContainer = styled.div`
  margin-bottom: 20px;
`;

export const ImageElement: FC<ImageProps> = memo(
  ({ image, imageLink, imageSharp }) => {
    const imageTag = imageSharp ? (
      <Img fluid={imageSharp} />
    ) : (
      <img src={image.url} />
    );

    return (
      <Container>
        <StyledImageContainer>
          {imageLink && imageLink._linkType === 'Link.web' && (
            <a href={imageLink.url} target="_blank" rel="noopener noreferrer">
              {imageTag}
            </a>
          )}
          {imageLink && imageLink._linkType === 'Link.document' && (
            <Link to={imageLink.url}>{imageTag}</Link>
          )}
          {!imageLink && imageTag}
        </StyledImageContainer>
      </Container>
    );
  }
);
