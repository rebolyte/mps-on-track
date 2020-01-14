$testConfig = "..\ontrack.config.TEST.json"

$config = Get-Content -Raw -Path $testConfig | ConvertFrom-Json
$appDbConn = "Server=$($config.DB_SERVER),$($config.DB_PORT);Database=$($config.DB_NAME);User Id=$($config.DB_USER);Password='$($config.DB_PASS)';"

$cwd = Get-Location

# navigate to RH dir
Set-Location "..\databases\appdb"

& .\deployAppDb.ps1 -ConnStr $appDbConn -Environment "TEST"

if ($? -ne $True) {
	exit 1
}

Set-Location $cwd
