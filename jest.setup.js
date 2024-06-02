// jest.setup.js
jest.setTimeout(10000); 
require('dotenv').config({ path: '.env.test' });
require('jest-fetch-mock').enableMocks();
