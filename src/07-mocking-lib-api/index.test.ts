import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const axiosM = axios as jest.Mocked<typeof axios>;
jest.mock('lodash', () => ({
  throttle: (func: unknown) => func,
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    axiosM.create.mockImplementation(() => axiosM);
    axiosM.get.mockResolvedValue({ data: 'response data' });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should create instance with provided base url', async () => {
    throttledGetDataFromApi('path');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('correct url');
    expect(axios.get).toHaveBeenCalledWith('correct url');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('path');
    expect(result).toBe('response data');
  });
});
