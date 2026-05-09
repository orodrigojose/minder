param(
  [Parameter(Position = 0)]
  [string]$CommandOrWorkspace,

  [Parameter(Position = 1)]
  [string]$WorkspacePath
)

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = (Resolve-Path (Join-Path $scriptDir '..')).Path
Set-Location $rootDir

$composeFile = 'docker-compose.yaml'

if (Get-Command docker -ErrorAction SilentlyContinue) {
  try {
    docker compose version | Out-Null
    $composeCmd = @('docker', 'compose')
  }
  catch {
    $composeCmd = $null
  }
}

if (-not $composeCmd -and (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
  $composeCmd = @('docker-compose')
}

if (-not $composeCmd) {
  throw 'Erro: docker compose nao foi encontrado. Instale Docker Desktop ou Docker Engine com o plugin compose.'
}

function Ensure-EnvFile {
  if (-not (Test-Path '.env') -and (Test-Path '.env.example')) {
    Copy-Item '.env.example' '.env'
    Write-Host 'Arquivo .env criado a partir de .env.example'
  }
}

function Load-Env {
  if (Test-Path '.env') {
    Get-Content '.env' | ForEach-Object {
      if ($_ -match '^\s*#') { return }
      if ($_ -match '^\s*$') { return }
      $parts = $_ -split '=', 2
      if ($parts.Count -eq 2) {
        [Environment]::SetEnvironmentVariable($parts[0], $parts[1])
      }
    }
  }

  if (-not $env:MINDER_PORT) { $env:MINDER_PORT = '8080' }
}

function Save-Env([string]$varName, [string]$varValue) {
  if (-not (Test-Path '.env')) {
    return
  }
  
  $lines = @(Get-Content '.env')
  $found = $false
  
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match "^$varName=") {
      $lines[$i] = "$varName=$varValue"
      $found = $true
      break
    }
  }
  
  if (-not $found) {
    $lines += "$varName=$varValue"
  }
  
  $lines | Set-Content '.env'
}

function Resolve-WorkspaceHostPath([string]$workspaceInput) {
  if ([string]::IsNullOrWhiteSpace($workspaceInput) -or $workspaceInput -eq '.') {
    return $rootDir -replace '\\', '/'
  }

  if ([System.IO.Path]::IsPathRooted($workspaceInput)) {
    return ([System.IO.Path]::GetFullPath($workspaceInput) -replace '\\', '/')
  }

  return ([System.IO.Path]::GetFullPath((Join-Path $rootDir $workspaceInput)) -replace '\\', '/')
}

function Ensure-WorkspacePath([string]$workspaceHostPath) {
  New-Item -ItemType Directory -Path (Join-Path $workspaceHostPath '.minder/database') -Force | Out-Null
  New-Item -ItemType Directory -Path (Join-Path $workspaceHostPath '.minder/nodes') -Force | Out-Null
}

function Flatten-Args([object]$items) {
  $out = @()
  if ($null -eq $items) { return $out }
  if ($items -is [System.Array]) {
    foreach ($it in $items) {
      $out += (Flatten-Args $it)
    }
  }
  else {
    $out += $items
  }
  return $out
}

function Run-Compose() {
  # Flatten any nested arrays that might come from callers
  $composeArgs = Flatten-Args $args

  # Build the executable and argument list explicitly
  if ($composeCmd.Count -eq 1) {
    # docker-compose (single executable)
    $exe = $composeCmd[0]
    $argList = @('-f', $composeFile) + $composeArgs
  }
  else {
    # docker compose (docker + compose subcommand)
    $exe = $composeCmd[0]
    $argList = @($composeCmd[1], '-f', $composeFile) + $composeArgs
  }

  # Convert any non-string args to string (prevent System.Object[] entries)
  $argList = $argList | ForEach-Object { if ($_ -is [string]) { $_ } else { $_.ToString() } }

  $argString = $argList -join ' '
  Write-Host "Running: $exe $argString"

  try {
    $proc = Start-Process -FilePath $exe -ArgumentList $argList -NoNewWindow -PassThru -Wait -RedirectStandardOutput stdout.txt -RedirectStandardError stderr.txt
    Get-Content stdout.txt -Raw | Write-Host
    Get-Content stderr.txt -Raw | Write-Host
    Remove-Item stdout.txt, stderr.txt -ErrorAction SilentlyContinue
  }
  catch {
    Write-Host "Erro ao executar '$exe': $_" -ForegroundColor Red
    throw
  }
}

function Open-App {
  $url = "http://localhost:$($env:MINDER_PORT)"
  Start-Process $url | Out-Null
  Write-Host "Minder: $url"
}

function Show-Help {
@"
Uso:
  ./scripts/minder.ps1
  ./scripts/minder.ps1 <workspace_path>
  ./scripts/minder.ps1 up [workspace_path]
  ./scripts/minder.ps1 restart [workspace_path]
  ./scripts/minder.ps1 rebuild [workspace_path]
  ./scripts/minder.ps1 down
  ./scripts/minder.ps1 logs
  ./scripts/minder.ps1 status
  ./scripts/minder.ps1 open
  ./scripts/minder.ps1 ls [workspace_path]
"@ | Write-Host
}

function List-Workspace([string]$workspaceHostPath) {
  Write-Host "Workspace host path: $workspaceHostPath"
  Write-Host ''
  Write-Host '.minder/database'
  Get-ChildItem -Force (Join-Path $workspaceHostPath '.minder/database') -ErrorAction SilentlyContinue
  Write-Host ''
  Write-Host '.minder/nodes'
  Get-ChildItem -Force (Join-Path $workspaceHostPath '.minder/nodes') -ErrorAction SilentlyContinue
}

$command = 'up'
$workspace = ''

switch ($CommandOrWorkspace) {
  '' { $command = 'up'; $workspace = '' }
  'up' { $command = 'up'; $workspace = $WorkspacePath }
  'down' { $command = 'down'; $workspace = $WorkspacePath }
  'restart' { $command = 'restart'; $workspace = $WorkspacePath }
  'rebuild' { $command = 'rebuild'; $workspace = $WorkspacePath }
  'logs' { $command = 'logs'; $workspace = $WorkspacePath }
  'status' { $command = 'status'; $workspace = $WorkspacePath }
  'open' { $command = 'open'; $workspace = $WorkspacePath }
  'ls' { $command = 'ls'; $workspace = $WorkspacePath }
  'help' { $command = 'help'; $workspace = $WorkspacePath }
  '-h' { $command = 'help'; $workspace = $WorkspacePath }
  '--help' { $command = 'help'; $workspace = $WorkspacePath }
  default { $command = 'up'; $workspace = $CommandOrWorkspace }
}

switch ($command) {
  'up' {
    Ensure-EnvFile
    Load-Env
    $env:MINDER_WORKSPACE_PATH = Resolve-WorkspaceHostPath $workspace
    Save-Env 'MINDER_WORKSPACE_PATH' $env:MINDER_WORKSPACE_PATH
    Ensure-WorkspacePath $env:MINDER_WORKSPACE_PATH
    Run-Compose @('up', '-d', '--force-recreate', '--remove-orphans')
    Write-Host "Workspace host path: $($env:MINDER_WORKSPACE_PATH)"
    Open-App
  }
  'restart' {
    Ensure-EnvFile
    Load-Env
    $env:MINDER_WORKSPACE_PATH = Resolve-WorkspaceHostPath $workspace
    Save-Env 'MINDER_WORKSPACE_PATH' $env:MINDER_WORKSPACE_PATH
    Ensure-WorkspacePath $env:MINDER_WORKSPACE_PATH
    Run-Compose @('down')
    Run-Compose @('up', '-d', '--force-recreate', '--remove-orphans')
    Write-Host "Workspace host path: $($env:MINDER_WORKSPACE_PATH)"
    Open-App
  }
  'rebuild' {
    Ensure-EnvFile
    Load-Env
    $env:MINDER_WORKSPACE_PATH = Resolve-WorkspaceHostPath $workspace
    Save-Env 'MINDER_WORKSPACE_PATH' $env:MINDER_WORKSPACE_PATH
    Ensure-WorkspacePath $env:MINDER_WORKSPACE_PATH
    Run-Compose @('up', '-d', '--build', '--force-recreate', '--remove-orphans')
    Write-Host "Workspace host path: $($env:MINDER_WORKSPACE_PATH)"
    Open-App
  }
  'down' {
    Load-Env
    Run-Compose @('down')
  }
  'logs' {
    Load-Env
    Run-Compose @('logs', '-f')
  }
  'status' {
    Load-Env
    Run-Compose @('ps')
  }
  'open' {
    Load-Env
    Open-App
  }
  'ls' {
    Load-Env
    $resolved = Resolve-WorkspaceHostPath $workspace
    List-Workspace $resolved
  }
  'help' {
    Show-Help
  }
  default {
    throw "Comando invalido: $command"
  }
}
