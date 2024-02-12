import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  const mockTimeout = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockCallback, mockTimeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(mockCallback, mockTimeout);
    expect(mockCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(mockTimeout);
    expect(mockCallback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();
    doStuffByTimeout(mockCallback, mockTimeout);
    expect(mockCallback).not.toHaveBeenCalled();
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
    expect(setIntervalSpy).toHaveBeenCalled();
    jest.advanceTimersByTime(mockInterval);
    expect(mockCallback).toHaveBeenCalled();
    setIntervalSpy.mockRestore();
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
    expect(result).toBeNull();
    existsSyncMock.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileMock = jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from(mockSampleContent));
    const result = await readFileAsynchronously(mockPathToFile);
    expect(result).toEqual(mockSampleContent);
    existsSyncMock.mockRestore();
    readFileMock.mockRestore();
  });
});
