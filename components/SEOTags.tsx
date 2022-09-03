import React from "react";
import { DefaultSeo, LogoJsonLd, SocialProfileJsonLd } from "next-seo";

const SEOTags: React.FC = () => {
  return (
    <>
      <DefaultSeo
        defaultTitle="Peter Fritz"
        titleTemplate="%s | Peter Fritz"
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://peterfritz.dev",
          site_name: "Peter Fritz",
        }}
        twitter={{
          handle: "@p3t3rfr1tz",
          site: "@p3t3rfr1tz",
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
          {
            rel: "icon",
            href: "/favicon.svg",
            type: "image/svg+xml",
          },
        ]}
      />
      <SocialProfileJsonLd
        type="Person"
        name="Peter Fritz"
        url="https://peterfritz.dev"
        sameAs={[
          "https://www.facebook.com/p3t3rfr1tz",
          "https://www.instagram.com/euptr",
          "https://www.instagram.com/p3t3rfr1tz",
          "https://www.twitter.com/p3t3rfr1tz",
          "https://www.linkedin.com/in/p3t3rfr1tz",
          "https://www.youtube.com/channel/UComyc_NfwLGhLcFoG7h89Kw",
        ]}
      />
      <LogoJsonLd
        logo="https://peterfritz.dev/images/ptr.png"
        url="https://peterfritz.dev"
      />
    </>
  );
};

export default SEOTags;
