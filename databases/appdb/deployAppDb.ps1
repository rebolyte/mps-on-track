param(
	[string]$Environment = "PROD"
)

$connStr = "Server=localhost,1401;User Id=SA;Password=HotSprocket123!;"

rh --connectionstring $connStr --donotcreatedatabase --databasetype=sqlserver --silent --files "." --environment $Environment --warnandignoreononetimescriptchanges

if ($? -eq $True) {
	Write-Host "Initialized application database"
} else {
	Write-Host "RoundhousE error occurred"
}
