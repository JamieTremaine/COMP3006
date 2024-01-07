# PI.ps1

Write-Host 'Building backend...'
Set-Location -Path ./COMP3006-Backend
npm i
npm run build

Write-Host 'Building frontend...'
Set-Location -Path ../COMP3006-Frontend
npm i

Set-Location -Path ../
& $PSScriptRoot/build-api.ps1
Set-Location -Path ../COMP3006-Frontend
npm run build

Write-Host 'Project built'