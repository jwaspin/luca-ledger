import { v4 as uuid } from 'uuid';

import { AccountType } from './constants';
import schemas from './schemas';

export const generateAccount = (accountType, initialData = {}) => {
  const account = {
    id: uuid(),
    type: accountType,
    balance: 0,
    transactions: [],
    ...initialData,
  };
  schemas[accountType].validateSync(account);
  return account;
};

export const generateNewCheckingAccount = () =>
  generateAccount(AccountType.CHECKING);

export const generateNewSavingsAccount = () =>
  generateAccount(AccountType.SAVINGS);

export const generateNewCreditCardAccount = () =>
  generateAccount(AccountType.CREDIT_CARD, { statementDay: 1 });

export const generateAccountObject = (
  id,
  name,
  type,
  statementDay,
  transactions
) => ({
  version: '1.0.0',
  id,
  name,
  type,
  statementDay,
  transactions,
});
