import { createSlice } from '@reduxjs/toolkit';

export const TransactionStatusEnum = Object.freeze({
  PENDING: 'pending ',
  COMPLETE: 'complete ',
  SCHEDULED: 'scheduled ',
  PLANNED: 'planned ',
});

const initialState = {
  transactions: [],
  original: [],
};

const findTransactionIndexById = (transactions, id) =>
  transactions.findIndex((transaction) => transaction.id === id);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      state.modified = true;
    },
    updateTransaction: (state, action) => {
      const updatedTransaction = action.payload;
      const updatedTransactions = state.transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? { ...transaction, ...updatedTransaction }
          : transaction
      );
      state.transactions = updatedTransactions;
    },
    removeTransaction: (state, action) => {
      const transactionId = action.payload;
      const newData = state.transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
      if (newData.length === state.transactions.length) {
        console.log('Error updating transaction: Not Found', transactionId);
      } else {
        state.transactions = newData;
      }
    },
    resetTransactions: (state) => {
      state.transactions = state.original;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
      state.original = action.payload;
    },
  },
});

const {
  addTransaction,
  updateTransaction,
  removeTransaction,
  resetTransactions,
  setTransactions,
} = transactionsSlice.actions;

const loadTransactions = () => async (dispatch) => {
  const [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const fileContent = await file.text();
  const parsedContent = JSON.parse(fileContent);
  dispatch(setTransactions(parsedContent.transactions));
  dispatch(setAccountName(parsedContent.account));
};

// not a thunk - this function writes to the file system
// and does not use any reducer functions
const saveTransactions = (transactions, filename) => (dispatch) => {
  const saveObject = {
    account: transactions.accountName,
    transactions: transactions.data,
  };
  const saveString = JSON.stringify(saveObject, null, 2);
  const saveBlob = new Blob([saveString]);
  const url = URL.createObjectURL(saveBlob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
  dispatch(setTransactions(transactions.data));
};

const modifyAccountName = (newName) => (dispatch) => {
  dispatch(setAccountName(newName));
  dispatch(setModified(true));
};

const selectTransactions = (state) => state.transactions;

export default transactionsSlice.reducer;
export {
  addTransaction,
  loadTransactions,
  removeTransaction,
  resetTransactions,
  updateTransaction,
  saveTransactions,
  selectTransactions,
  modifyAccountName,
};
