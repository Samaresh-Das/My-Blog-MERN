import { Helmet } from "react-helmet";
import { SEO } from "../seoConfig";

/**
 * Reusable SEO head component.
 *
 * @param {string} title - Page title (will be appended with site name)
 * @param {string} description - Meta description (max ~160 chars recommended)
 * @param {string} url - Page path (e.g., "/about" or "/post/abc123")
 * @param {string} image - Full URL to the page's OG image
 * @param {string} type - Open Graph type: "website" or "article"
 * @param {object} jsonLd - Optional JSON-LD structured data object
 * @param {string} publishedTime - ISO date string for articles
 * @param {string} author - Author name for articles
 */
const SEOHead = ({
  title,
  description,
  url = "",
  image,
  type = "website",
  jsonLd,
  publishedTime,
  author,
}) => {
  const fullTitle = title
    ? `${title} | ${SEO.siteName}`
    : SEO.defaultTitle;
  const metaDescription = description || SEO.defaultDescription;
  const metaImage = image || SEO.defaultImage;
  const canonicalUrl = `${SEO.siteUrl}${url}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={SEO.siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      {SEO.twitterHandle && (
        <meta name="twitter:creator" content={`@${SEO.twitterHandle}`} />
      )}

      {/* Article-specific tags */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
