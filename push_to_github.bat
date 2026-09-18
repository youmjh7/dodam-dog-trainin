@echo off
echo ==========================================
echo [dodam.kr] GitHub Auto Upload
echo ==========================================

git init
git config user.name "youmjh7"
git config user.email "youmjh7@users.noreply.github.com"

git add .
git commit -m "feat: Initial commit for dog training app"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/youmjh7/dodam-dog-trainin.git
git push -u origin main

echo ==========================================
echo Upload completed!
echo ==========================================
pause
