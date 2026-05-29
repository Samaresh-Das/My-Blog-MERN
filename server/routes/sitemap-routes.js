const express = require("express");
const router = express.Router();
const Post = require("../models/post");

const FRONTEND_URL = "https://sams-dev-blog.vercel.app";

/**
 * GET /sitemap.xml
 * Dynamically generates an XML sitemap by querying all posts from MongoDB.
 * Google Search Console will crawl this to discover every blog post.
 */
router.get("/sitemap.xml", async (req, res) => {
  try {
    // Fetch all posts, sorted by newest first
    const posts = await Post.find({}, "headline createdAt _id").sort({
      createdAt: -1,
    });

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${FRONTEND_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${FRONTEND_URL}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${FRONTEND_URL}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${FRONTEND_URL}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${FRONTEND_URL}/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
`;

    // Dynamic blog post URLs
    for (const post of posts) {
      const lastmod = post.createdAt
        ? new Date(post.createdAt).toISOString().split("T")[0]
        : today;

      xml += `  <url>
    <loc>${FRONTEND_URL}/post/${post._id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }

    xml += `</urlset>`;

    res.set("Content-Type", "application/xml");
    res.set("Cache-Control", "public, max-age=3600, s-maxage=3600"); // Cache for 1 hour
    res.status(200).send(xml);
  } catch (err) {
    console.error("Sitemap generation error:", err);
    res.status(500).send("Error generating sitemap");
  }
});

/**
 * GET /robots.txt
 * Backup robots.txt served from the API server.
 * The primary one lives on the frontend (Vercel).
 */
router.get("/robots.txt", (req, res) => {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: https://api.samsdev.xyz/sitemap.xml
`;

  res.set("Content-Type", "text/plain");
  res.status(200).send(robotsTxt);
});

module.exports = router;
