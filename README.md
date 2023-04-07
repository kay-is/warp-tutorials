# Warp Contract Tutorials

SmartWeave contracts based on [Warp Academy tutorials](https://academy.warp.cc/tutorials/ardit/introduction/intro).

- [Hello World](hello-world/contract.js)
- [Ardit](ardit/contract.js)

Also, Warp SDK scripts for deployment.

- [Create Wallet](scripts/create-wallet.js)
- [Deploy Contract](scripts/deploy-contract.js)
- [Call Contract](scripts/call-contract.js)

## Prerequisites

[Node.js](https://nodejs.org/en)

## Setup

Install dependencies:

    $ npm i

Run in separate terminal:

    $ npm run arlocal

Initialize wallets:

    $ npm run create-wallet admin
    $ npm run create-wallet user1
    $ npm run create-wallet user2

## Hello World Contract

Minimal contract that only returns its initial state.

Deploy contract:

    $ npm run deploy admin hello-world

Get contract state:

    $ npm run call user1 hello-world

## Ardit Contract

Contract that lets multiple users post messages and vote for them.

Deploy contract:

    $ npm run deploy admin ardit

Create Message:

    $ npm run call admin ardit postMessage "Hello, Ardit!"

Upvote Message:

    $ npm run call user1 ardit upvoteMessage 1

Downvote Message:

    $ npm run call user2 ardit downvoteMessage 1

Read Message:

    $ npm run call admin ardit readMessage 1
