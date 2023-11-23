/** @type {import('mock-config-server').MockServerConfig} */
import { cities } from './server-data/cities';
const mockServerConfig = {
  rest: {
    baseUrl: '/api',
    configs: [
      {
        path: '/cities',
        method: 'get',
        routes: [{ data: cities }]
      }
    ]
  }
};

export default mockServerConfig;
