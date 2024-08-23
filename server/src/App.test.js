const request = require('supertest');
const app = require('./server');

describe('POST /fetch-metadata', () => {
  it('should return 400 if no URLs are provided', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({});
    expect(response.status).toBe(400);
  });

  it('should return 400 if less than 3 URLs are provided', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({ urls: ['https://example.com', 'https://example.org'] });
    expect(response.status).toBe(400);
  });

  it('should return metadata for valid URLs', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({ urls: ['https://example.com', 'https://example.org', 'https://example.net'] });
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('image');
  });

  it('should handle errors for invalid URLs', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({ urls: ['https://example.com', 'https://non-existent-domain.com', 'https://example.net'] });
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[1]).toHaveProperty('error');
  });

  it('should enforce rate limiting', async () => {
    const requests = Array(6).fill().map(() =>
      request(app)
        .post('/fetch-metadata')
        .send({ urls: ['https://example.com', 'https://example.org', 'https://example.net'] })
    );
    const responses = await Promise.all(requests);
    const rateLimitedResponses = responses.filter(r => r.status === 429);
    expect(rateLimitedResponses).toHaveLength(1);
  });
});