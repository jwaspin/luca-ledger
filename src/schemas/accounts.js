import * as yup from 'yup';

import { AccountType } from '@/store/accountsSlice';

const commonAccountSchema = yup.object({
  version: yup.string().required('Version is required'),
  id: yup.string().required('ID is required'),
  name: yup.string().required('Name is required'),
  type: yup.string().required('Type is required'),
  transactions: yup
    .array()
    .of(
      yup.object({
        // Define schema for each transaction object if needed
      })
    )
    .required('Transactions are required'),
});

const creditCardSchema = commonAccountSchema.shape({
  statementDay: yup.number().integer().min(1).max(31),
});

export default {
  [AccountType.SAVINGS]: commonAccountSchema,
  [AccountType.CHECKING]: commonAccountSchema,
  [AccountType.CREDIT_CARD]: creditCardSchema,
};
