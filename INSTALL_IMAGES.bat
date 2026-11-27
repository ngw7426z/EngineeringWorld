@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo Engineering World 이미지 설치를 시작합니다.
where python >nul 2>nul
if %errorlevel%==0 (
  python install_images.py
) else (
  where py >nul 2>nul
  if %errorlevel%==0 (
    py install_images.py
  ) else (
    echo Python을 찾지 못했습니다. Anaconda Prompt에서 이 폴더로 이동한 뒤 python install_images.py 를 실행해 주세요.
  )
)
echo.
pause
