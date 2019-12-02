# MPS "On Track" Application

## Local dev setup

### Docker and SQL Server

1. Install Docker for Windows or Docker Toolbox.

2. Create a Docker volume:

```sh
> docker volume create --name=mssql-volume
```

3. In the localDev/ directory, run `docker-compose up -d`. When running this the first time, it will download the required Docker images. Subsequent runs should start up immediately.
4. If you are using Docker Toolbox on Win10 Home, make sure you [map ports correctly](https://stackoverflow.com/a/57417278/2486583).
5. SQL Server should now be running and listening on port `1401`.
6. Connect with SSMS, using the login information:

- Server type: Database Engine
- Server name: `127.0.0.1,1401`
- Authentication: SQL Server Authentication
- User: `SA`
- Password: (specified in `localDev/docker-compose.yml`)

Reference the [SQL Server on Docker documentation](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-configure-docker?view=sql-server-ver15).

### Install RoundhousE

1. Install the dotnet global tool for [RoundhousE](https://github.com/chucknorris/roundhouse):

```sh
> dotnet tool install --global dotnet-roundhouse --version 1.1.0
```

### Initialize app database

1. In Powershell, run migrations (optionally inserting test data):

```sh
> cd .\packages\databases\appdb\
> .\deployAppDb.ps1 -Environment "TEST"
```

Specify "TEST" as the environment to seed the database with test data. The default is "PROD".

## Running the API

1. Copy `.env.default` to a new file named `.env` and update its config values.

2. Install [Yarn](https://yarnpkg.com/en/docs/install). On Windows, using [Chocolatey](https://chocolatey.org/) is the easiest way to install and keep Yarn up to date.

```sh
> choco install yarn
```

3. Install [Lerna](https://github.com/lerna/lerna) globally:

```sh
> yarn global add lerna
```

If running `lerna` doesn't work, make sure you add the result of `yarn global bin` to your \$PATH in your _system_ environment variables, not just for your user.

4. Install dependencies:

```sh
> yarn install
```

5. Run API:

```sh
> yarn api:start
```

## Running the web client

TODO

## Building and deploying

Build TypeScript files in all packages:

```sh
$ lerna run build
```

This will execute the `build` script specified in the package.json of each package under the `packages/` directory.

## Running tests

```sh
# Run all tests
> yarn test

# To specify a path or specific test file to run, add it as a parameter
> yarn test packages/api/

# You can also automatically re-run tests when files are changed
> yarn test --watch
```

There are also launch configurations set up for running tests in VS Code.

---

## Other items

### Adding a new dependency

See [lerna add](https://github.com/lerna/lerna/tree/master/commands/add#readme):

```sh
# add lodash as dependency to @mps/api package
> lerna add lodash --scope @mps/api

# add lodash as dependency to all packages
> lerna add lodash
```

### Removing a dependency

Currently this must be done directly with Yarn workspaces:

```sh
> yarn workspace @mps/api remove helmet
```
