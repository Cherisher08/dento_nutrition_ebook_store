#!/usr/bin/env node

/**
 * Sitemap Generator Script
 * Generates sitemap.xml based on available books from the API
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = process.env.VITE_API_URL || 'http://localhost:8000';
const BASE_URL = process.env.SITE_URL || 'https://dentonutrition.fit';
const PUBLIC_DIR = path.join(__dirname, 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

async function fetchBooks() {
  try {
    const response = await fetch(`${API_URL}/public/books`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error.message);
    console.warn('Using empty book list. Sitemap will only contain static pages.');
    return [];
  }
}

function generateSitemapXml(books) {
  const urls = [];

  // Add static pages
  urls.push({
    loc: `${BASE_URL}/`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '1.0',
  });

  urls.push({
    loc: `${BASE_URL}/admin`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.5',
  });

  // Add dynamic book pages
  books.forEach((book) => {
    urls.push({
      loc: `${BASE_URL}/book/${book.id}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8',
    });
  });

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach((url) => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

async function main() {
  try {
    console.log('Generating sitemap...');
    console.log(`API URL: ${API_URL}`);
    console.log(`Base URL: ${BASE_URL}`);

    // Ensure public directory exists
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    // Fetch books
    const books = await fetchBooks();
    console.log(`Found ${books.length} books`);

    // Generate sitemap
    const sitemapXml = generateSitemapXml(books);

    // Write sitemap
    fs.writeFileSync(SITEMAP_PATH, sitemapXml, 'utf-8');
    console.log(`✓ Sitemap generated: ${SITEMAP_PATH}`);
    console.log(`✓ Total URLs in sitemap: ${books.length + 2}`); // +2 for static pages
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

main();
