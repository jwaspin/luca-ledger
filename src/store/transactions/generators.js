import schemas from './schemas';

export const generateTransaction = (id, status, date, amount, description) => {
  const transaction = {
    id,
    status,
    date,
    amount,
    description,
  };

  try {
    schemas.transaction.validateSync(transaction, { abortEarly: false });
    return transaction;
  } catch (error) {
    console.error(error);
    return null;
  }
};
