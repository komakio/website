import React, { memo, FC } from 'react';
import { Container } from 'styled-bootstrap-grid';
import { Link } from 'gatsby';
import { MetaLink } from '@components/page-context';

interface ImageProps {
  image: { url: string };
  imageLink: MetaLink;
  imageSharp: any;
}

export const ImageElement: FC<ImageProps> = memo(
  ({ image, imageLink, imageSharp }) => {
    const imageTag = <img src={image.url} />;

    return (
      <Container>
        {imageLink && imageLink._linkType === 'Link.web' && (
          <a href={imageLink.url} target="_blank" rel="noopener noreferrer">
            {imageTag}
          </a>
        )}
        {imageLink && imageLink._linkType === 'Link.document' && (
          <Link to={imageLink.url}>{imageTag}</Link>
        )}
        {!imageLink && imageTag}
      </Container>
    );
  }
);
