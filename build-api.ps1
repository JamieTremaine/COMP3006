# PI.ps1
Write-Host 'Building client api...'

Set-Location -Path ./COMP3006-Backend
npm run build-spec
Copy-Item "build/spec.json" -Destination "../COMP3006-Frontend/src/app/api"

Set-Location -Path ../COMP3006-Frontend
npm run build-spec