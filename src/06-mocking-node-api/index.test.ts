import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');
jest.mock('fs/promises', () => ({
  existsSync: jest.fn(),
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  const mockTimeout = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockCallback, mockTimeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(mockCallback, mockTimeout);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();
    doStuffByTimeout(mockCallback, mockTimeout);
    jest.advanceTimersByTime(mockTimeout);
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const mockInterval = 1000;
  const callTimes = 5;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockCallback, mockInterval);
    expect(setIntervalSpy).toHaveBeenCalledWith(mockCallback, mockInterval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    doStuffByInterval(mockCallback, mockInterval);
    jest.advanceTimersByTime(mockInterval * callTimes);
    expect(mockCallback).toHaveBeenCalledTimes(callTimes);
  });
});

describe('readFileAsynchronously', () => {
  const mockPathToFile = 'file.txt';
  const mockSampleContent = 'This is a sample file content';

  test('should call join with pathToFile', async () => {
    const mockedJoin = jest.fn(path.join);
    path.join = mockedJoin;
    await readFileAsynchronously(mockPathToFile);
    expect(mockedJoin).toHaveBeenCalledWith(__dirname, mockPathToFile);
    path.join = jest.requireActual('path').join;
  });

  test('should return null if file does not exist', async () => {
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(mockPathToFile);
    expect(result).toBe(null);
    existsSyncMock.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileMock = jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from(mockSampleContent));
    const result = await readFileAsynchronously(mockPathToFile);
    expect(result).toBe(mockSampleContent);
    existsSyncMock.mockRestore();
    readFileMock.mockRestore();
  });
});
