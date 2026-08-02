@echo off
setlocal

cd /d "%~dp0"

echo [DreamingFish] Stopping current Next.js dev server...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$project = (Resolve-Path '.').Path; " ^
  "Get-CimInstance Win32_Process -Filter \"name = 'node.exe'\" | " ^
  "Where-Object { $_.CommandLine -like \"*$project*\" } | " ^
  "ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"

echo [DreamingFish] Removing .next cache...
if exist ".next" (
  rmdir /s /q ".next"
)

echo [DreamingFish] Starting dev server...
npm run dev

pause
