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
* Server type: Database Engine
* Server name: `127.0.0.1,1401`
* Authentication: SQL Server Authentication
* User: `SA`
* Password: (specified in `localDev/docker-compose.yml`)

Reference the [SQL Server on Docker documentation](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-configure-docker?view=sql-server-ver15).

### Install RoundhousE

1. Install the dotnet global tool for [RoundhousE](https://github.com/chucknorris/roundhouse):

```sh
> dotnet tool install --global dotnet-roundhouse --version 1.1.0
```

### Initialize app database

1. In Powershell, run migrations (optionally inserting test data):

```sh
> cd .\src\databases\appdb\
> .\deployAppDb.ps1 -Environment "TEST"
```

Specify "TEST" as the environment to seed the database with test data. The default is "PROD".

## Running the API

TODO

## Running the web client

TODO
