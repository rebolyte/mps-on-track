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

1. In Powershell, run migrations and insert test data:

```sh
PS> cd .\localDev
PS> .\deployLocalAppDb.ps1
```

## Running the API

1. Install [Yarn](https://yarnpkg.com/en/docs/install). On Windows, using [Chocolatey](https://chocolatey.org/) is the easiest way to install and keep Yarn up to date.

```sh
> choco install yarn
```

2. Install [Lerna](https://github.com/lerna/lerna) globally:

```sh
> yarn global add lerna
```

If running `lerna` doesn't work, make sure you add the result of `yarn global bin` to your \$PATH in your _system_ environment variables, not just for your user.

3. Install dependencies:

```sh
> yarn install
```

4. Run API:

```sh
> yarn api:start
```

### API Workflow

1. Go to packages/api and run `yarn watch`. This will compile the code to dist/, and TypeScript will watch and recompile on changes.
2. In VS Code, start the API by starting the "Run and debug API" task defined in launch.json (or just hit F5 if it's already selected).
   - If you want to run the API from the terminal, run `node dist/index.js`.
3. VS Code's terminal will show that the API is now running, and you can set breakpoints if you'd like.

Note that when you make changes, you'll need to wait a couple seconds before starting the API so TypeScript has a chance to write out the new code to dist/.

## Running the web client

1. Navigate to packages/client
2. Run `yarn start`

This will start Webpack's dev server, and auto-reload on changes to the front-end code.

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

## Building and deploying

Builds run on TeamCity. It basically does this:

```sh
> yarn install
> yarn build
> yarn package
```

This will:

1. Install dependencies.
2. Execute the `build` script specified in the package.json of each package under the `packages/` directory.
3. Execute the `package` script in each package, outputting a dist/ folder with all of its dependencies.

In practice, you should just have to kick off a new TeamCity build. This will give you the artifact.zip file you need to deploy.

### Setting up the server

#### Prerequisites to run on the server:

- Install chocolatey
  - https://chocolatey.org/install
- Restart Powershell
- Install Node: `choco install nodejs-lts -y`
- Install yarn: `choco install yarn -y`
- Install pm2: `npm i -g pm2`
- Install RoundhousE:
  - Install .NET Core SDK 2.1 from https://dotnet.microsoft.com/download/dotnet-core/2.1
  - `dotnet tool install -g dotnet-roundhouse`

#### To deploy:

1. Make sure you've manually copied scripts\deploy.ps1 to the server, at c:\ontrack-deploy\deploy.ps1
2. Make sure you've manually copied and updated ontrack.config.json to c:\ontrack-deploy
3. Manually upload the artifact.zip file from TeamCity to c:\ontrack-deploy.
4. Navigate to c:\ontrack-deploy in Powershell, and run .\deploy.ps1

#### Set up IIS:

This is a one-time setup to be done AFTER first deploy.

1. If necessary, install URL Rewrite module - https://www.iis.net/downloads/microsoft/url-rewrite
2. If necessary, install Application Request Routing module - https://www.iis.net/downloads/microsoft/application-request-routing
3. Open IISMS by hitting super+R to open the Run window, and using the `inetmgr` command.
4. Select the default web site on the left, and then select the OnTrackApi folder that you just deployed
5. Click URL Rewrite.
6. Add a new rule and select the "Reverse Proxy" template.
   1. In the inbound rule, change the path to `http://localhost:4000/api/`. Click save.
   2. Edit the new rule, and update match pattern to `.*` (dot star).
   3. Make sure the rewrite URL matches `http://localhost:4000/api/{R:0}`. Click save.
7. You should now be able to access the client and API:
   1. https://pulse-staging.mpls.k12.mn.us/ontrackapi (http://localhost/ontrackapi/health)
   2. https://pulse-staging.mpls.k12.mn.us/ontrack/ (http://localhost/ontrack/)

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

Or just navigate to the subdirectory and use `yarn add` as usual.

### Removing a dependency

Currently this must be done directly with Yarn workspaces:

```sh
> yarn workspace @mps/api remove helmet
```

Or just navigate to the subdirectory and use `yarn remove` as usual.
