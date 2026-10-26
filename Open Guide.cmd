@echo off
rem Double-click to open the China Field Guide with full-detail maps.
rem Keep this window open while you use the guide; close it to stop.
start "" http://localhost:8080/
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
