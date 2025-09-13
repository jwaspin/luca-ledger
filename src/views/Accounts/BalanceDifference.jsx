import PropTypes from 'prop-types';

export default function BalanceDifference({ transactions, filterArray }) {
  if (filterArray.length <= 1) {
    return null;
  }

  const lastStatus = filterArray[filterArray.length - 1];
  const difference = transactions
    .filter((t) => t.status === lastStatus)
    .reduce((acc, t) => acc + Number(t.amount), 0);

  return (
    <span
      style={{
        color: difference >= 0 ? 'green' : 'red',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      {difference >= 0 ? (
        <span
          style={{ marginLeft: 4, marginRight: 4 }}
          aria-label='increase'
          title='Increase'
        >
          ▲
        </span>
      ) : (
        <span
          style={{ marginLeft: 4, marginRight: 4 }}
          aria-label='decrease'
          title='Decrease'
        >
          ▼
        </span>
      )}
      $
      {Math.abs(difference).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
}

BalanceDifference.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
    })
  ).isRequired,
  filterArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};
