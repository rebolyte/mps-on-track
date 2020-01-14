param(
	[Parameter(Mandatory = $true)]
	[string] $ConnStr,
	[Parameter(Mandatory = $true)]
	[string] $Environment

)

# $connStr = "Server=localhost,1401;Database=OnTrackDb;User Id=SA;Password=HotSprocket123!;"

rh --connectionstring $ConnStr --databasetype=sqlserver --silent --files "." --environment $Environment --warnandignoreononetimescriptchanges

if ($? -eq $True) {
	Write-Host "Migrated application database"
}
else {
	Write-Host "RoundhousE error occurred"
	exit 1
}
