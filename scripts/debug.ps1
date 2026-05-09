#!/usr/bin/env pwsh
Write-Host "=== DIAGNOSTICO DOCKER COMPOSE ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Verificando disponibilidade de docker..." -ForegroundColor Yellow
if (Get-Command docker -ErrorAction SilentlyContinue) {
  Write-Host "OK - docker encontrado" -ForegroundColor Green
}
else {
  Write-Host "ERRO - docker NAO encontrado" -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "2. Verificando versao docker compose..." -ForegroundColor Yellow
$version = docker compose version 2>&1
Write-Host "OK - $version" -ForegroundColor Green

Write-Host ""
Write-Host "3. Verificando se docker daemon esta ativo..." -ForegroundColor Yellow
docker ps > $null 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "OK - Docker daemon esta ativo" -ForegroundColor Green
}
else {
  Write-Host "ERRO - Docker daemon NAO esta respondendo" -ForegroundColor Red
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = (Resolve-Path (Join-Path $scriptDir '..')).Path
Write-Host ""
Write-Host "4. Diretorio do projeto:" -ForegroundColor Yellow
Write-Host "   $rootDir" -ForegroundColor White

Write-Host ""
Write-Host "5. Verificando arquivo .env..." -ForegroundColor Yellow
$envFile = Join-Path $rootDir '.env'
if (Test-Path $envFile) {
  Write-Host "OK - .env encontrado" -ForegroundColor Green
  Write-Host ""
  Get-Content $envFile
}
else {
  Write-Host "ERRO - .env NAO encontrado" -ForegroundColor Red
}

Write-Host ""
Write-Host "6. Verificando docker-compose.yaml..." -ForegroundColor Yellow
$composeFile = Join-Path $rootDir 'docker-compose.yaml'
if (Test-Path $composeFile) {
  Write-Host "OK - docker-compose.yaml encontrado" -ForegroundColor Green
}
else {
  Write-Host "ERRO - docker-compose.yaml NAO encontrado" -ForegroundColor Red
}

Write-Host ""
Write-Host "7. Executando 'docker compose config'..." -ForegroundColor Yellow
Push-Location $rootDir
$output = docker compose config 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "OK - Configuracao valida" -ForegroundColor Green
  Write-Host ""
  Write-Host "Saida de 'docker compose config':" -ForegroundColor White
  Write-Host ($output | Select-Object -First 20)
}
else {
  Write-Host "ERRO - Erro na configuracao:" -ForegroundColor Red
  Write-Host $output
}
Pop-Location

Write-Host ""
Write-Host "8. Resolvendo caminho do workspace..." -ForegroundColor Yellow
$workspaceResolved = $rootDir -replace '\\', '/'
Write-Host "   Workspace resolvido: $workspaceResolved" -ForegroundColor White

Write-Host ""
Write-Host "=== FIM DO DIAGNOSTICO ===" -ForegroundColor Cyan
