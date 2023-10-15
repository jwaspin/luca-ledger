# Luca Ledger

Luca Ledger provides a simple user interface for tracking financial transactions through a basic ledger. The goal is to provide an easy to use interface for financial planning and budgeting through the point of view of accounts and transactions.

*If more information is desired in this README, please open an issue and provide a brief description about the type of information desired.*

## Getting Started as a User

This application is being hosted on GitHub using GitHub Pages. There is no other backend to this application and it does not send any data over the network. It is designed to be used entirely locally and it is up to the user to save and maintain their own account files.

**All data is stored locally and must be exported to be saved. Refreshing the page will lose any unsaved data.**

Future versions may become more user friendly in this regard, but for now the intent is to focus on the user interface and not data storage beyond the minimum required to handle defined schemas.

### Dashboard View

This will show an overview of all accounts and their different balances.

### Accounts View

The will show a tiled view of all accounts and their different balances. It also provides buttons for loading, creating, and saving accounts. This is also where the user selects an account to view its ledger. There is currently only one way to save the data, using the 'Save All Accounts' button, which will default to the Downloads folder.

### Ledger View

This view provides a list of transactions and a way to create and modify them individually or create them in bulk.

The power of this application comes from the status of the transactions, especially in regards to scheduled and planned transactions. This allows the user to plan for known transactions well into the future.

Credit card accounts can be used for budgets, but requires some discipline using specific cards for different types of purchases.

## Getting Started as a Developer

This project is a React application created using [`vite`](https://vitejs.dev/).

### Clone & Install

Clone the repository then use `yarn` to install dependencies:

`yarn install` or just `yarn`

### Run Development Environment

`yarn dev`

### Build & Run Local

`yarn build`

`yarn start`

### Contributions

This repository will make use of GitHub's tools to track and maintain bugs and features. If you have a request for an enhancement then create an issue for discussion around the new feature. Use labels to designate the enhancement vs a bug. Bugs should also be reported using issues and labelled as such.

For a list of known bugs, visit the issues page on GitHub. This would be a good place to start contributing. Start by creating a branch from the issues page and do all development work in that branch. When ready, create a Pull Request to merge the changes into the dev branch. This will require a review and approval, at which point the branch will be merged using a squash commit and then the issue branch will be deleted. Merging the PR is expected to close the issue.

More guidelines can be provided upon request using an issue to detail the request.
