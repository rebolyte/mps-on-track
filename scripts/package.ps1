# Based on:
# https://gist.github.com/tommedema/cd5e41fc22ab6c26b31b7eb234238b56

# this is assumed to run from a child package, e.g. at packages/my-service

# $org = "@mps"

$cwd = Get-Location

# navigate to workspace root
Set-Location ..\..

Write-Host $cwd

# keep reference to development dependencies, if any
if (Test-Path .\dev_node_modules) {
	Remove-Item .\dev_node_modules -Recurse -Force
}
if (Test-Path .\dev_yarn.lock) {
	Remove-Item .\dev_yarn.lock
}
Move-Item -path .\node_modules -destination .\dev_node_modules
Move-Item -path yarn.lock -destination dev_yarn.lock

# install production deps for the entire workspace
Write-Host "Calling yarn install --production"
yarn install --production

# navigate back to package
Set-Location $cwd

# dupe nohoisted production node_modules
if (!(Test-Path .\dist)) {
	New-Item -Path .\dist -Type Directory
}
if (Test-Path .\dist\node_modules) {
	Remove-Item .\dist\node_modules -Recurse -Force
}
Copy-Item .\node_modules .\dist\node_modules -Recurse # resolve symlinks
Copy-Item ..\..\.env .\dist\.env

# back to root
Set-Location ..\..

# restore development dependencies
Write-Host "Restoring development node_modules"
Move-Item .\dev_node_modules .\node_modules -Force
# yarn install
Move-Item dev_yarn.lock yarn.lock -Force

# back to package
Set-Location $cwd

# cleanup and prepare artifact
# cd dist
# rm -rf node_modules/.bin
# rm -rf node_modules/$org/*/{src,__tests__}
# zip -rq artifact.zip * # (generating .zip from .\dist is handled in TeamCity)
