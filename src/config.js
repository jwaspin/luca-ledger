const config = {
  dateFormatString: 'YYYY/MM/DD',
  compareDateFormatString: 'YYYY/MM/DD',
  homeText:
    "This is a basic ledger application. You can add accounts and manage transactions for those accounts. To get started click on the Accounts tab at the top and create an account, then start adding transactions. One of the purposes of this application is to forecast future transactions. In light of this there is a process to generate repeated transactions at once, so it's easy to forecast well into the future. To get started with this click on the Repeated Transactions button at the bottom of the ledger page; you will be presented with a modal that will allow you to create repeated transactions. Another feature of this application is the ability to designate the state of transaction across 4 different states: Planned, Scheduled, Pending, and Complete. Transactions are automatically set to Planned when they are created. To change the state of a transaction click on the transaction and select the state from the dropdown. Use the different balance displays to see the state of your balances based on the state of your transactions. Completed and pending should be visible if you actually login to your account, whereas scheduled and planned should not be visible. Scheduled means that the transaction is scheduled to occur on a specific date, so it's all but guaranteed to happen. Planned transactions can be more speculative, but they are still likely to happen.",
};

export default config;
