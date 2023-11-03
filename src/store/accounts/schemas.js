import * as yup from 'yup';

import { AccountType } from './constants';
import transactionsSchema from '@/store/transactions/schemas';

const commonAccountSchema = yup
  .object({
    version: yup.string().required('Version is required'),
    id: yup.string().required('ID is required'),
    name: yup.string().required('Name is required'),
    type: yup.string().required('Type is required'),
    transactions: yup
      .array()
      .of(transactionsSchema)
      .required('Transactions are required'),
  })
  .noUnknown();

const creditCardSchema = commonAccountSchema
  .shape({
    statementDay: yup
      .number()
      .integer()
      .min(1)
      .max(31)
      .required('Statement day is required'),
  })
  .noUnknown();

export default {
  [AccountType.SAVINGS]: commonAccountSchema,
  [AccountType.CHECKING]: commonAccountSchema,
  [AccountType.CREDIT_CARD]: creditCardSchema,
};
