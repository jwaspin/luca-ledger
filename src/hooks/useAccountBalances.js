import { useMemo } from 'react';
import { constants } from '@/store/accounts';
import { TransactionStatusEnum } from '../store/transactions/constants';

export const useAccountBalances = (accounts) => {
  return useMemo(() => {
    const totals = {
      current: 0,
      pending: 0,
      scheduled: 0,
      future: 0,
    };

    const { COMPLETE, PENDING, SCHEDULED, PLANNED } = TransactionStatusEnum;

    const processedAccounts = accounts.map((account) => {
      const balances = {
        current: calculateBalance(account.transactions, [COMPLETE]),
        pending: calculateBalance(account.transactions, [COMPLETE, PENDING]),
        scheduled: calculateBalance(account.transactions, [
          COMPLETE,
          PENDING,
          SCHEDULED,
        ]),
        future: calculateBalance(account.transactions, [
          COMPLETE,
          PENDING,
          SCHEDULED,
          PLANNED,
        ]),
      };

      if (account.type === constants.AccountType.CREDIT_CARD) {
        Object.keys(balances).forEach((key) => {
          totals[key] -= Math.max(balances[key], 0);
        });
      } else {
        Object.keys(balances).forEach((key) => {
          totals[key] += balances[key];
        });
      }

      return { ...account, ...balances };
    });

    return { accounts: processedAccounts, totals };
  }, [accounts]);
};

const calculateBalance = (transactions, statuses) => {
  return transactions
    .filter((tx) => statuses.includes(tx.status))
    .reduce((acc, tx) => acc + Number(tx.amount), 0);
};
