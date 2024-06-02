const request = require('supertest');
const { createServer } = require('http');
const handler = require('../pages/api/submitform').default;
const fetch = require('jest-fetch-mock');

jest.mock('node-fetch', () => fetch);

const createMockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
};

describe('POST /api/submitform', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  const setupServer = (reqBody) => {
    return createServer((req, res) => {
      req.body = reqBody;
      const mockRes = createMockResponse();
      handler(req, mockRes).then(() => {
        res.statusCode = mockRes.status.mock.calls[0][0];
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(mockRes.json.mock.calls[0][0]));
      });
    });
  };

  it('should return success for valid form submission', async () => {
    fetch.mockResponses(
      [JSON.stringify({}), { status: 200 }],
      [JSON.stringify({}), { status: 200 }]
    );

    const server = setupServer({
      whurl: 'contact',
      name: 'Jon Snow',
      email: 'KingOfTheNorth@gmail.com',
    });

    const response = await request(server).post('/api/submitform').send({
      whurl: 'contact',
      name: 'Jon Snow',
      email: 'KingOfTheNorth@gmail.com',
    });

    console.log('Response status:', response.status);
    console.log('Response body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Success');
  }, 10000);

  it('should return 400 for invalid webhook identifier', async () => {
    const server = setupServer({
      whurl: 'invalid_identifier',
      name: 'Jon Snow',
      email: 'KingOfTheNorth@gmail.com',
    });

    const response = await request(server).post('/api/submitform').send({
      whurl: 'invalid_identifier',
      name: 'Jon Snow',
      email: 'KingOfTheNorth@gmail.com',
    });

    console.log('Response status:', response.status);
    console.log('Response body:', response.body);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid webhook identifier');
  }, 10000);

  it('should handle errors from Google Apps Script', async () => {
    fetch.mockRejectOnce(new Error('Google Apps Script error'));

    const server = setupServer({
      whurl: 'contact',
      name: 'Jon Snow',
      email: 'KingOfTheNorth@gmail.com',
    });

    const response = await request(server).post('/api/submitform').send({
      whurl: 'contact',
      name: 'Jon Snow',
      email: 'KingOfTheNorth@gmail.com',
    });

    console.log('Response status:', response.status);
    console.log('Response body:', response.body);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Google Apps Script error');
  }, 10000);

  it('should handle errors from Discord notification', async () => {
    fetch.mockResponses(
      [JSON.stringify({}), { status: 200 }],
      [JSON.stringify({}), { status: 500 }]
    );

    const server = setupServer({
      whurl: 'contact',
      name: 'Jon Snow',
      email: 'KingOfTheNorth@gmail.com',
    });

    const response = await request(server).post('/api/submitform').send({
      whurl: 'contact',
      name: 'Jon Snow',
      email: 'KingOfTheNorth@gmail.com',
    });

    console.log('Response status:', response.status);
    console.log('Response body:', response.body);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Failed to notify Discord');
  }, 10000);
});
