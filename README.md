# GiftSystem🎁

Technical Assessment from Govtech 2024

## Background

It's the Christmas season and you've been given the honorable task of distributing
gifts to the teams in your department. Each team can send any representative to
redeem their teams' gift. At the redemption counter, the representative has to show
their staff pass as proof of their identity. 

### Assumption

 * Each staff pass is a unique ID.
 * Data is given in .csv files.
 * Continuous prompt from user until exit. 
 
## Tech Stack

**Back-End:** [Node](https://nodejs.org/en), [Typescript](https://www.typescriptlang.org/)\
**Unit-Testing:** [Jest](https://jestjs.io/), [Sinon](https://sinonjs.org/)


## Prerequisites

Dependencies to be installed:
* [Node](https://nodejs.org/en/download) 


## Run Locally

Clone the project

```bash
  git clone https://github.com/Stabbershade/GiftSystem-Lim-Wei-Jie.git
```

Go to the project directory

```bash
  cd GiftSystem
```

Install dependencies

```bash
  npm install
```

Transpile code  

```bash
  npm run build
```

Run the prompt with a .csv file in the sample directory as an argument
```bash
  npm run start staff-id-to-team-mapping.csv
```

## Features

- Lookup on staff to team , param : staff_id
```bash
  GiftRedemption> lookup (staff_id)
```
- Verify redemption , param : team_name
```bash
  GiftRedemption> verify (team_name)
```
- New redemption , param : team_name
```bash
  GiftRedemption> redeem (team_name)
```
- Exit GiftSystem
```bash
  GiftRedemption> exit
```
## Additional Features

- List teams that has redeemed
```bash
  GiftRedemption> list 
```
- List remaining Teams to redeem
```bash
  GiftRedemption> left
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```



    


