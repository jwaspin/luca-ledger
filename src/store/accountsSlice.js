import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import {
  addTransaction,
  updateTransaction,
  removeTransaction,
} from './transactionsSlice';

export const AccountType = Object.freeze({
  SAVINGS: 'Savings',
  CHECKING: 'Checking',
  CREDIT_CARD: 'Credit Card',
});

const initialState = {
  accounts: [],
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
    },
    updateAccount: (state, action) => {
      const updatedAccount = action.payload;
      const updatedAccounts = state.accounts.map((account) =>
        account.id === updatedAccount.id
          ? { ...account, ...updatedAccount }
          : account
      );
      state.accounts = updatedAccounts;
    },
    removeAccount: (state, action) => {
      const accountId = action.payload;
      return state.accounts.filter((account) => account.id !== accountId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTransaction, (state, action) => {
      const { accountId, transaction } = action.payload;
      const accountIndex = state.accounts.findIndex(
        (account) => account.id === accountId
      );
      if (accountIndex !== -1) {
        state.accounts[accountIndex].transactions.push(transaction);
      }
    });
    builder.addCase(updateTransaction, (state, action) => {
      const { accountId, transaction } = action.payload;
      const accountIndex = state.accounts.findIndex(
        (account) => account.id === accountId
      );
      if (accountIndex !== -1) {
        const transactionIndex = state.accounts[
          accountIndex
        ].transactions.findIndex((t) => t.id === transaction.id);
        if (transactionIndex !== -1) {
          state.accounts[accountIndex].transactions[transactionIndex] =
            transaction;
        }
      }
    });
    builder.addCase(removeTransaction, (state, action) => {
      const { accountId, transactionId } = action.payload;
      const accountIndex = state.accounts.findIndex(
        (account) => account.id === accountId
      );
      if (accountIndex !== -1) {
        state.accounts[accountIndex].transactions = state.accounts[
          accountIndex
        ].transactions.filter((t) => t.id !== transactionId);
      }
    });
  },
});

const { addAccount, removeAccount, updateAccount } = accountsSlice.actions;

export { updateAccount };

const generateAccountObject = (id, name, type, transactions) => ({
  id,
  name,
  type,
  transactions,
});

export const createNewAccount = () => (dispatch) => {
  dispatch(
    addAccount(
      generateAccountObject(uuidv4(), 'New Account', AccountType.CHECKING, [])
    )
  );
};

export const removeAccountById = (id) => (dispatch) => {
  dispatch(removeAccount(id));
};

const loadAccountFromFile = async () => {
  const [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const fileContent = await file.text();
  return JSON.parse(fileContent);
};

export const loadAccountAsync = () => async (dispatch) => {
  const data = await loadAccountFromFile();
  const account = generateAccountObject(
    data.id,
    data.name,
    data.type || AccountType.CHECKING,
    data.transactions.map((t) => ({ ...t, amount: parseFloat(t.amount) }))
  );
  dispatch(addAccount(account));
};

export const editAccountName = (id, name) => (dispatch) => {
  dispatch(updateAccount({ id, name }));
};

export const editAccountType = (id, type) => (dispatch) => {
  dispatch(updateAccount({ id, type }));
};

export const selectAccountById = (id) => (state) =>
  state.accounts.accounts.find((account) => account.id === id);

export const selectAccounts = (state) => state.accounts.accounts;

export default accountsSlice.reducer;
