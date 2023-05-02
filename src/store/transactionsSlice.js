import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [
    {
      id: 1,
      date: '1/1/2001',
      status: 'complete',
      description: 'some transaction',
      amount: 12.34,
    },
    {
      id: 2,
      date: '1/1/2001',
      status: 'complete',
      description: 'another transaction',
      amount: 56.78,
    },
    {
      id: 3,
      date: '1/1/2001',
      status: 'complete',
      description: 'food',
      amount: 102.11,
    },
    {
      id: 4,
      date: '1/1/2001',
      status: 'complete',
      description: 'more food',
      amount: 21.98,
    },
    {
      id: 5,
      date: '1/1/2001',
      status: 'complete',
      description: 'zero balance',
      amount: -3.21,
    },
    {
      id: 6,
      date: '1/1/2001',
      status: 'complete',
      description: '200 balance',
      amount: 10.0,
    },
  ],
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.data.push(action.payload);
    },
    removeTransaction: (state, action) => {
      const transactionIndex = state.data.indexOf(
        (transaction) => transaction.id === action.payload
      );
      if (transactionIndex !== -1) {
        state.data.splice(transactionIndex, 1);
      }
    },
  },
});

console.log('actions', transactionsSlice.actions);
export const { addTransaction, removeTransaction } = transactionsSlice.actions;
export const selectTransactions = (state) => state.transactions;
export default transactionsSlice.reducer;
