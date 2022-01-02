### Capture the Ether - Solutions

This repo contains all the solutions for the wargame [Capture the Ether](https://capturetheether.com/).

To start right away, clone the repo and:

```bash
$ yarn # install deps
$ export ROPSTEN_PRIVATE_KEY=... # export it from metamask or something alike
$ export ACCOUNT_TAKEOVER_PKEY=... # export it from metamask or something alike
$ npx hardhat test --network hardhat # run all the tests
$ npx hardhat run $SCRIPT_PATH # run a script for a single problem
```
