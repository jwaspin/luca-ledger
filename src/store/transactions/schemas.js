import * as yup from 'yup';

const transactionsSchema = yup.object({
  id: yup.string().required('Transaction ID is required'),
  status: yup.string().required('Transaction status is required'),
  date: yup.date().required('Transaction date is required'),
  amount: yup.number().required('Transaction amount is required'),
  description: yup.string().required('Transaction description is required'),
});

export default transactionsSchema;
