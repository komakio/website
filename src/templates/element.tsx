import React, { memo, FC } from 'react';
import { Container } from 'styled-bootstrap-grid';
import { RichText } from '@components/elements/rich-text';
import { PageTitle } from '@components/elements/page-title';
import { FullWidthBackground } from '@components/elements/full-width-background';
import { IconBoxes } from '@components/elements/icon-boxes';
import { TwoColumnsRichText } from '@components/elements/two-colums-rich-text';
import { ContactForm } from '@components/elements/contact-form';
import { Image } from '@components/image';
import { ImageElement } from '@components/elements/image-element';

interface PageElementProps {
  item: any;
  index: number;
}

export const PageElement: FC<PageElementProps> = memo(({ item, index }) => {
  if (item.type === 'page_title') {
    if (index === 0) {
      return <PageTitle title={item.primary.heading[0].text} />;
    }
    return <RichText text={item.primary.heading} />;
  }
  if (item.type === 'text') {
    return <RichText text={item.primary.text} />;
  }

  if (item.type === 'full_width_background') {
    return (
      <FullWidthBackground
        ctaLabel={item.primary.full_width_cta_label}
        ctaLink={item.primary.full_width_cta_link}
        image={item.primary.full_width_image}
        title={item.primary.full_width_title}
        subtitle={item.primary.full_width_subtitle}
      />
    );
  }

  if (item.type === 'icon_boxes') {
    return (
      <IconBoxes
        title={item.primary.icon_box_title}
        items={item.fields.map(i => ({
          icon: i.icon_box_icon,
          description: i.icon_box_description,
          title: i.icon_box_title,
          link: i.icon_box_link,
        }))}
      />
    );
  }

  if (item.type === 'two_columns_rich_text') {
    return (
      <TwoColumnsRichText
        items={item.fields.map(i => ({
          richText: i.rich_text_column,
          ctaLabel: i.two_columns_cta_label,
          ctaLink: i.two_columns_cta_link,
        }))}
      />
    );
  }

  if (item.type === 'contact_form') {
    return (
      <ContactForm
        emailLabel={item.primary.contact_form_email_label}
        nameLabel={item.primary.contact_form_name_label}
        messageLabel={item.primary.contact_form_message_label}
        submitLabel={item.primary.contact_form_submit_label}
        successLabel={item.primary.contact_form_success_label}
        failedLabel={item.primary.contact_form_failed_label}
        reason={item.primary.contact_form_reason}
        hasBody={item.primary.contact_form_body}
      />
    );
  }

  if (item.type === 'image') {
    return (
      <ImageElement
        image={item.primary.image}
        imageLink={item.primary.image_link}
        imageSharp={item.primary.image_sharp}
      />
    );
  }

  // contact_form;
  console.log(`${item.type} not defined.`);
  return null;
});
