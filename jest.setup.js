import 'whatwg-fetch';
import 'setimmediate';
jest.setTimeout(30000);

require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env })
}));