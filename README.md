# NuggetAI

Nugget AI Project

## Project Setup

### Project stack:
- React / Redux / Redux-Saga
- Node.js / Express.js
- MongoDB
- IBM Waston API
- Amazon Web Services (EC2, ELB, S3, Cloudfront, Route53, ACM)

### Prerequisites
```
node v8^
npm
```

### Install
```
npm run setup-server
npm run setup-client
```
### Add `.env` file
Refer `.env.copy` file for local environment
```
WASTON_PERSONALITY_API_KEY = xxx
WASTON_PERSONALITY_URL = xxx
WASTON_NATURAL_LANG_API_KEY = xxx
WASTON_NATURAL_LANG_URL = xxx
WASTON_TONE_ANALYZE_API_KEY = xxx
WASTON_TONE_ANALYZE_URL = xxx

# mongodb URI
MONGODB_LOCAL_URI = xxx
MONGODB_DEV_URI = xxx
MONGODB_STAGING_URI = xxx
MONGODB_PROD_URI = xxx
```

### npm scripts

- `setup-server`: install server dependencies
- `setup-client`: install client dependencies
- `dev`: run app in development environment
- `server`: run server in development environment
- `client`: run react client
- `start`: run app in production environment
- `lint` : lint styles

Example: `npm run dev`
## Project structure and Conventions
### React/Redux app : `client/src`
### React UI Framework : `Material-UI`
### Backend framework : `Express`
### DB : `mongodb`
## CI / CD (Circle CI)
CircleCI is Continuous Integration, a development practice which is being used by software teams allowing them to to build, test and deploy applications easier and quicker on multiple platforms.
#### branch
* development environment: `development`
* staging environment: `staging`
* production environment: `master`
## Git
Git conventional workflow. (if you are not familiar with `git rebase` don't use it. It might be waste of time.)

1. `git checkout develop` : goto develop branch<br/>
2. `git pull origin develop`: update local develop branch<br/>
3. `git checkout -b newbranch`: create new branch based on the latest develop<br/>
4. `git add . && git commit -m xxx` : commit changes<br/>
5. `git checkout develop` : goto local develop again<br/>
6. `git pull origin develop`: update local develop branch again<br/>
7. `git checkout newbranch`: goto current branch<br/>
8. `git rebase develop`: rebase off develop branch<br/>
9. `git rebase --continue` : continue rebasing per commit until finished.<br/>
10. `git push origin newbranch` or `git push -f origin newbranch`(if needed).<br/>
11. Send Pull Request to `develop` branch.<br/>
12. Review Code and Merge it.<br/>

Git flow above is based in development mode.

## Environment
### Note:
> Project have 3 environments:
* development
* staging
* production
#### AWS Elastic Beanstalk images
* production
* staging
* development
#### Monbodb Atlas Clusters
* nugget-prod
* nugget-staging
* nugget-dev
## Running the tests
- React unit test with jest/enzyme, react-test-renderer
```
yarn test
```
OR
```
npm run test
```
## Deployment
AWS Elastic beanstalk:
```
Using CI/CD
Commit to remote branch to deploy.

Using eb cli
1. install eb cli for aws elastic beanstalk.
2. checkout the certain environment branch.
3. eb deploy
Or eb deploy --staged (optional)
```
## Code standard
* [React Airbnb code standard](https://github.com/airbnb/javascript/tree/master/react)
* [Prettier](https://prettier.io/)
## Built With

* [React.js](https://reactjs.org/) - React framework
* [Redux](https://github.com/reduxjs/redux) - For react global state management
* [Redux-Saga](https://github.com/redux-saga/redux-saga) - Redux middleware
* [Express](https://expressjs.com/) - Backend framework
* [Mongodb](https://www.mongodb.com/) - NoSQL Database

## Authors

* **Ali El-Shayeb**
* **Chris**
* **Gabriel**


## License

MIT