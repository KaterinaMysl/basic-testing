import {
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialAmount = 100;
    const account = new BankAccount(initialAmount);
    expect(account.getBalance()).toBe(initialAmount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(100);
    expect(() => account.withdraw(200)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const fromAccount = new BankAccount(100);
    const toAccount = new BankAccount(50);
    expect(() => fromAccount.transfer(200, toAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = new BankAccount(100);
    expect(() => account.transfer(50, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = new BankAccount(100);
    const depositAmount = 50;
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(100 + depositAmount);
  });

  test('should withdraw money', () => {
    const account = new BankAccount(100);
    const withdrawAmount = 50;
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(100 - withdrawAmount);
  });

  test('should transfer money', () => {
    const fromAccount = new BankAccount(100);
    const toAccount = new BankAccount(50);
    const transferAmount = 50;
    fromAccount.transfer(transferAmount, toAccount);
    expect(fromAccount.getBalance()).toBe(100 - transferAmount);
    expect(toAccount.getBalance()).toBe(50 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = new BankAccount(100);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe(balance === null ? 'object' : 'number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(50);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
