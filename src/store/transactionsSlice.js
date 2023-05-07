import { createSlice } from '@reduxjs/toolkit';

export const TransactionStatusEnum = Object.freeze({
  PENDING: 'pending ',
  COMPLETE: 'complete ',
  SCHEDULED: 'scheduled ',
  PLANNED: 'planned ',
});

const initialState = {
  data: [],
  original: [],
  modified: false,
  accountName: '',
};

const findTransactionIndexById = (transactions, id) =>
  transactions.findIndex((transaction) => transaction.id === id);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.data.push(action.payload);
      state.modified = true;
    },
    updateTransaction: (state, action) => {
      const transactionIndex = findTransactionIndexById(
        state.data,
        action.payload.id
      );
      if (transactionIndex !== -1) {
        state.data[transactionIndex] = action.payload;
        state.modified = true;
      } else {
        console.log('Error updating transaction: Not Found', action.payload.id);
      }
    },
    removeTransaction: (state, action) => {
      const transactionIndex = findTransactionIndexById(
        state.data,
        action.payload
      );
      if (transactionIndex !== -1) {
        state.data.splice(transactionIndex, 1);
        state.modified = true;
      } else {
        console.log('Error updating transaction: Not Found', action.payload);
      }
    },
    setTransactions: (state, action) => {
      state.data = action.payload;
      state.original = action.payload;
      state.modified = false;
    },
    setModified: (state, action) => {
      state.modified = !!action.payload;
    },
    setAccountName: (state, action) => {
      state.accountName = action.payload;
    },
  },
});

const {
  addTransaction,
  updateTransaction,
  removeTransaction,
  setTransactions,
  setModified,
  setAccountName,
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
  updateTransaction,
  saveTransactions,
  selectTransactions,
  modifyAccountName,
};
