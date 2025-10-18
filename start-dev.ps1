# Chakshi Development Startup Script
# This script helps you start the application easily

Write-Host "🚀 Chakshi Legal Management System" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

$choice = Read-Host @"
What would you like to run?
1. Frontend only
2. Backend Server only  
3. Both Frontend and Backend (in separate windows)
4. Install all dependencies
5. Show project structure

Enter your choice (1-5)
"@

switch ($choice) {
    "1" {
        Write-Host "Starting Frontend..." -ForegroundColor Green
        cd frontend
        npm start
    }
    "2" {
        Write-Host "Starting Backend Server..." -ForegroundColor Green
        cd backend/server
        node index.js
    }
    "3" {
        Write-Host "Starting Frontend and Backend in separate windows..." -ForegroundColor Green
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm start"
        Start-Sleep -Seconds 2
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend\server'; node index.js"
        Write-Host "✅ Both services started in separate windows!" -ForegroundColor Green
    }
    "4" {
        Write-Host "Installing all dependencies..." -ForegroundColor Yellow
        npm run install:all
        Write-Host "✅ All dependencies installed!" -ForegroundColor Green
    }
    "5" {
        Write-Host "`nProject Structure:" -ForegroundColor Cyan
        Write-Host "==================" -ForegroundColor Cyan
        Write-Host "📁 frontend/     - React application"
        Write-Host "📁 backend/      - Backend services"
        Write-Host "   ├── lawagent-ts/   - TypeScript backend"
        Write-Host "   ├── node-payment/  - Payment service"
        Write-Host "   └── server/        - Express API"
        Write-Host "📁 setup-guides/ - Documentation"
        Write-Host ""
        Write-Host "See README.md for more details!" -ForegroundColor Yellow
    }
    default {
        Write-Host "Invalid choice. Please run the script again." -ForegroundColor Red
    }
}
