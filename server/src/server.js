const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { fetchMetadata } = require('./metadataFetcher');
const { rateLimiter } = require('./rateLimiter');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.post('/fetch-metadata', rateLimiter, async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length < 3) {
      return res.status(400).json({ error: 'Please provide at least 3 valid URLs' });
    }

    const metadata = await Promise.all(urls.map(fetchMetadata));
    res.json(metadata);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
});

module.exports = app;