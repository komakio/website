// import React, { memo } from 'react';
// import { graphql } from 'gatsby';
// import { Layout } from '@components/layout/layout';
// import { PageElement } from './element';

// const Page = memo((props: any) => {
//   const doc = props.data?.prismic?.allPages?.edges?.slice(0, 1)?.pop();
//   if (!doc?.node) {
//     return null;
//   }

//   const topMenusNode = props.data.prismic?.allTopmenus?.edges[0].node;
//   const topMenus = topMenusNode.elements;
//   topMenusNode.body?.forEach((subitemsConfig: any) => {
//     const topMenu = topMenus.find(
//       c =>
//         c.multiitem_reference_id ===
//         subitemsConfig.primary.multiitem_reference_id
//     );
//     if (topMenu) {
//       topMenu.children = subitemsConfig.fields;
//     }
//   });

//   const allPages = props.data.allSitePage.edges.map(e => e.node.context);
//   const { meta_title, meta_description, social_image, body, _meta } = doc.node;

//   return (
//     <Layout
//       context={{
//         context: {
//           title: meta_title,
//           description: meta_description,
//           image: social_image,
//           ..._meta,
//         },
//         topMenus,
//         allPages,
//       }}
//     >
//       {body?.map((item: any, index: number) => (
//         <PageElement
//           key={`${item.__typename}${index}`}
//           item={item}
//           index={index}
//         />
//       ))}
//     </Layout>
//   );
// });

// export default Page;

// export const query = graphql`
//   query PageQuery($uid: String, $lang: String) {
//     allSitePage(
//       filter: { context: { lang: { eq: "en-us" }, uid: { ne: "" } } }
//     ) {
//       edges {
//         node {
//           context {
//             uid
//             alternateLanguages {
//               uid
//               lang
//             }
//           }
//         }
//       }
//     }
//     prismic {
//       allTopmenus(lang: $lang) {
//         edges {
//           node {
//             elements {
//               button
//               menu_link {
//                 ... on PRISMIC_Page {
//                   _meta {
//                     uid
//                   }
//                 }
//               }
//               title
//               multiitem_reference_id
//             }
//             body {
//               ... on PRISMIC_TopmenuBodyMultiitem_dropdown {
//                 type
//                 primary {
//                   multiitem_reference_id
//                 }
//                 fields {
//                   dropdown_item_link {
//                     ... on PRISMIC_Page {
//                       _meta {
//                         uid
//                         lang
//                       }
//                     }
//                   }
//                   dropdown_item_title
//                 }
//               }
//             }
//           }
//         }
//       }
//       allPages(uid: $uid, lang: $lang) {
//         edges {
//           node {
//             meta_title
//             meta_description
//             social_image
//             _meta {
//               uid
//               lang
//               alternateLanguages {
//                 lang
//                 uid
//               }
//             }
//             body {
//               ... on PRISMIC_PageBodyText {
//                 type
//                 label
//                 primary {
//                   text
//                 }
//               }
//               ... on PRISMIC_PageBodyImage {
//                 type
//                 primary {
//                   image
//                   image_link {
//                     _linkType
//                     ... on PRISMIC_Page {
//                       prismic_display_title
//                       meta_title
//                     }
//                     ... on PRISMIC__ExternalLink {
//                       url
//                     }
//                   }
//                 }
//               }
//               ... on PRISMIC_PageBodyPage_title {
//                 type
//                 label
//                 primary {
//                   heading
//                 }
//               }
//               ... on PRISMIC_PageBodyTwo_columns_rich_text {
//                 type
//                 fields {
//                   rich_text_column
//                   two_columns_cta_label
//                   two_columns_cta_link {
//                     ... on PRISMIC_Page {
//                       _meta {
//                         uid
//                       }
//                     }
//                   }
//                 }
//               }
//               ... on PRISMIC_PageBodyIcon_boxes {
//                 type
//                 primary {
//                   icon_box_title
//                 }
//                 fields {
//                   icon_box_description
//                   icon_box_icon
//                   icon_box_title
//                   icon_box_link {
//                     ... on PRISMIC_Page {
//                       _meta {
//                         uid
//                       }
//                     }
//                   }
//                 }
//               }
//               ... on PRISMIC_PageBodyDownload {
//                 type
//                 primary {
//                   apple_download
//                   download_subtitle
//                   download_title
//                   google_download
//                 }
//               }
//               ... on PRISMIC_PageBodyContact_form {
//                 type
//                 primary {
//                   contact_form_body
//                   contact_form_email_label
//                   contact_form_message_label
//                   contact_form_name_label
//                   contact_form_submit_label
//                   contact_form_reason
//                   contact_form_success_label
//                   contact_form_failed_label
//                 }
//               }
//               ... on PRISMIC_PageBodyRequesthelp {
//                 type
//                 primary {
//                   request_form_email
//                   request_form_explanations
//                   request_form_firstname
//                   request_form_gdpr
//                   request_form_lastname
//                   request_form_location
//                   request_form_phone
//                   request_form_privacy
//                   request_form_submit
//                   request_form_terms
//                   request_form_terms_privacy_title
//                   request_form_title
//                   request_form_country_choose
//                   request_form_loading
//                   request_form_no_results
//                   request_form_success
//                   request_form_error
//                 }
//               }
//               ... on PRISMIC_PageBodyFull_width_background {
//                 type
//                 label
//                 primary {
//                   full_width_cta_label
//                   full_width_cta_link {
//                     ... on PRISMIC_Page {
//                       _meta {
//                         uid
//                       }
//                     }
//                   }
//                   full_width_image
//                   full_width_imageSharp {
//                     childImageSharp {
//                       fluid(maxWidth: 2000) {
//                         base64
//                         src
//                         srcSet
//                       }
//                     }
//                   }
//                   full_width_subtitle
//                   full_width_title
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
