const TransactionStateEnum = [
  'PLANNED',
  'SCHEDULED',
  'PENDING',
  'COMPLETED',
  'CANCELLED',
  'FAILED',
  'DISPUTED',
  'REFUNDED',
  'TENTATIVE',
  'UPCOMING',
];

const CategoryTypeEnum = ['DEFAULT', 'MODIFIED', 'CUSTOM'];

const EntityTypeEnum = [
  'ACCOUNT',
  'RETAILER',
  'BUSINESS',
  'INDIVIDUAL',
  'UTILITY',
  'GOVERNMENT',
];

const RepeatedTransactionFrequencyEnum = ['DAY', 'WEEK', 'MONTH', 'YEAR'];

const RepeatedTransactionStateEnum = [
  'ACTIVE',
  'PAUSED',
  'COMPLETED',
  'CANCELLED',
];

const RepeatedTransactionOccurrenceStatusEnum = ['MODIFIED', 'DELETED'];

export {
  TransactionStateEnum,
  CategoryTypeEnum,
  EntityTypeEnum,
  RepeatedTransactionFrequencyEnum,
  RepeatedTransactionStateEnum,
  RepeatedTransactionOccurrenceStatusEnum,
};
