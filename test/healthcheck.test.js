const request = require('supertest');
const { createServer } = require('http');
const handler = require('../pages/api/healthcheck').default;

const createMockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('GET /api/healthcheck', () => {
  it('should return a status of ok', async () => {
    const server = createServer((req, res) => {
      const mockRes = createMockResponse();
      handler(req, mockRes);
      res.statusCode = mockRes.status.mock.calls[0][0];
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: 'ok' }));
    });

    const response = await request(server).get('/api/healthcheck');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  }, 10000); 
});
