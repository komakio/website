import React from 'react';
import PropTypes from 'prop-types';

export default function HTML(props) {
  const isDev =
    props.headComponents?.find(c => c.key === 'environment')?.props?.content ===
    'environment=development';
  console.log(isDev);
  console.log('---------------------');
  console.log('---------------------');
  console.log('---------------------');
  console.log('---------------------');
  console.log('---------------------');
  console.log('---------------------');
  console.log('---------------------');
  console.log('---------------------');
  console.log('---------------------');
  console.log('---------------------');
  console.log('---------------------');
  console.log('---------------------');
  console.log('---------------------');
  return (
    <html {...props.htmlAttributes}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-598C7SZ');`,
          }}
        />

        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
        {props.headComponents}

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '214549336308915', {
                "em": "dragos.petria1@gmail.com",
                "fn": "Dragos",
                "ln": "Petria"
              }, {
                  "agent": "wordpress-5.3.2-2.0.1"
              });
              fbq('track', 'PageView', []);
              `,
          }}
        ></script>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" alt="fbpx" src="https://www.facebook.com/tr?id=214549336308915&ev=PageView&noscript=1" />`,
          }}
        />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-598C7SZ" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}

        {!isDev && (
          <script
            async
            defer
            src="//static.cdn.prismic.io/prismic.js?repo=Komak&new=true"
          ></script>
        )}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
