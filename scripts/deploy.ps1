$stageDir = Join-Path $env:SystemDrive "Users\James\proj\doubleline\minneapolis\ontrack-staging"
$artifactZip = Join-Path $stageDir "artifact.zip"
$artifactDir = Join-Path $stageDir "artifact"

$prodConfig = ".\ontrack.config.PROD.json"

$deployDir = Join-Path $env:SystemDrive "ontrack"

Write-Host "Looking for $($artifactZip)"

if (!(Test-Path $artifactZip)) {
	Write-Host "Artifact zip file not found (must be manually uploaded from TeamCity)" -ForegroundColor "red" -BackgroundColor "white"
	exit 1
}

# destroy $artifactDir if exists
if (Test-Path $artifactDir) {
	Write-Host "Cleaning up old files..."
	Remove-Item $artifactDir -Recurse -Force
}

# Grab permanent config file (which contains connstring, etc), copy to deploy
Write-Host "Deploying $($prodConfig)..."
Copy-Item $prodConfig $deployDir -Force

# Unzip TeamCity artifact that has been manually uploaded to the staging directory
Write-Host "Unzipping archive..."
Expand-Archive $artifactZip -DestinationPath $artifactDir

Write-Host "Deploying API files..."
$apiDir = Join-Path $artifactDir "api\*"
$apiOut = Join-Path $deployDir "api"
Copy-Item $apiDir $apiOut -Recurse -Force

Write-Host "Deploying web client files..."
$clientDir = Join-Path $artifactDir "client\*"
$clientOut = Join-Path $deployDir "wwwroot"
Copy-Item $clientDir $clientOut -Recurse -Force

# call RoundhousE to run all migrations
Write-Host "Running RoundhousE..."
$config = Get-Content -Raw -Path $prodConfig | ConvertFrom-Json
$appDbConn = "Server=$($config.DB_SERVER),$($config.DB_PORT);Database=$($config.DB_NAME);User Id=$($config.DB_USER);Password='$($config.DB_PASS)';"

Write-Host $appDbConn

$cwd = Get-Location

# navigate to RH dir
Set-Location (Join-Path $artifactDir "databases\appdb")

& .\deployAppDb.ps1 -ConnStr $appDbConn -Environment "PROD"

if ($? -ne $True) {
	exit 1
}

# navigate back to working dir
Set-Location $cwd

# start/restart Node API
$pm2Check = & pm2 id ontrack

if ($pm2Check -eq "[]") {
	Write-Host "Starting Node API..."
	$api = Join-Path $apiOut "index.js"
	pm2 start -i 2 --name ontrack $api
	pm2 save
}
else {
	Write-Host "Restarting Node API..."
	pm2 restart ontrack
}

# destroy temp artifact dir
Write-Host "Cleaning up..."
Remove-Item $artifactDir -Recurse -Force

Write-Host "Deployed successfully"