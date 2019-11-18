param(
	[string]$Environment="production"
)

$connStr = "Host=localhost;Port=1401;Database=DataLibrary;Username=SA;Password=HotSprocket123!;"

rh --connectionstring $connStr --donotcreatedatabase --databasetype=sqlserver --silent --files "." --environment $Environment --warnandignoreononetimescriptchanges

Write-Host "Initialized application database"
