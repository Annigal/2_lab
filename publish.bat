@echo off
chcp 65001 >nul
echo ========================================
echo XSS Lab - Публикация на GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo [1/6] Инициализация Git репозитория...
git init

echo.
echo [2/6] Проверка статуса...
git status

echo.
echo [3/6] Добавление файлов...
git add .

echo.
echo [4/6] Создание коммита...
git commit -m "feat: XSS lab - vulnerable and protected app"

echo.
echo [5/6] Привязка удалённого репозитория...
git remote add origin https://github.com/Annigal/2_lab.git 2>nul
if %errorlevel% equ 0 (
    echo     -> Remote добавлен
) else (
    echo     -> Remote уже существует (ok)
)

echo.
echo [6/6] Отправка на GitHub...
echo.
echo     !!! ВАЖНО !!!
echo     1. Сначала создайте репозиторий на GitHub:
echo        https://github.com/new
echo        Name: 2_lab
echo        НЕ ставьте галочки README/.gitignore
echo.
echo     2. Затем выполните:
echo        git push -u origin main
echo.
echo ========================================
echo Подсказка: Если запросит авторизацию,
echo используйте GitHub Token:
echo https://github.com/settings/tokens
echo ========================================
pause
