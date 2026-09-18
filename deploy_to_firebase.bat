@echo off
echo ==========================================
echo [dodam.kr] Firebase Hosting Deploy
echo ==========================================

if not exist "dist" (
    mkdir "dist"
)

copy /y "index_standalone.html" "dist\index.html" >nul
if exist "로고시안" (
    copy /y "로고시안" "dist\로고시안" >nul
    copy /y "로고시안" "dist\dodam_mascot.jpg" >nul
)
if exist "public" (
    xcopy /y /e /i "public" "dist" >nul
)

echo [1/2] Preparing dist files... Done.
echo [2/2] Uploading to Firebase Hosting (dodam-76)...

call npx firebase-tools deploy --only hosting --project dodam-76

echo ==========================================
echo Firebase Deploy Completed!
echo ==========================================

