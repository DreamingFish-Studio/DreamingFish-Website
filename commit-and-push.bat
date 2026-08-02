@echo off
setlocal

cd /d "%~dp0"
chcp 65001 >nul

echo.
echo DreamingFish Git commit and push
echo.

set /p COMMIT_MSG=请输入本次提交信息: 

if "%COMMIT_MSG%"=="" (
  echo.
  echo 提交信息不能为空。
  pause
  exit /b 1
)

git status --short
echo.

git add .
if errorlevel 1 (
  echo.
  echo git add 失败。
  pause
  exit /b 1
)

git diff --cached --quiet
if not errorlevel 1 (
  echo.
  echo 没有需要提交的改动。
  pause
  exit /b 0
)

git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
  echo.
  echo git commit 失败。
  pause
  exit /b 1
)

git remote get-url origin >nul 2>nul
if errorlevel 1 (
  echo.
  echo 未找到远程仓库 origin。
  set /p REMOTE_URL=请输入远程仓库地址，例如 https://github.com/user/repo.git: 

  if "%REMOTE_URL%"=="" (
    echo.
    echo 未输入远程仓库地址，已完成本地提交，暂未推送。
    pause
    exit /b 0
  )

  git remote add origin "%REMOTE_URL%"
  if errorlevel 1 (
    echo.
    echo 添加远程仓库失败。
    pause
    exit /b 1
  )
)

git push origin main
if errorlevel 1 (
  echo.
  echo git push 失败，请检查远程仓库、登录状态或网络。
  pause
  exit /b 1
)

echo.
echo 已提交并推送到 origin/main。
pause
