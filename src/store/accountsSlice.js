import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { addTransaction, updateTransaction } from './transactionsSlice';

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
  },
});

const { addAccount, removeAccount, updateAccount } = accountsSlice.actions;

export { updateAccount };

const generateAccountObject = (id, name, balance, transactions) => ({
  id,
  name,
  balance,
  transactions,
  modified: false,
});

export const createNewAccount = () => (dispatch) => {
  dispatch(addAccount(generateAccountObject(uuidv4(), 'New Account', 0.0, [])));
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
  const balance = data.transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0.0
  );
  const account = generateAccountObject(
    data.id,
    data.name,
    balance,
    data.transactions
  );
  dispatch(addAccount(account));
};

export const selectAccountById = (id) => (state) =>
  state.accounts.accounts.find((account) => account.id === id);

export const selectAccounts = (state) => state.accounts.accounts;

export default accountsSlice.reducer;
