@echo off
rem ==========================================================================
rem  Uldem - Landing
rem  Arma la carpeta "publicar" con lo que se sube al hosting:
rem  index.html, marca.html, rubro.html, css, js, assets y los archivos de
rem  seguridad del hosting (_headers, vercel.json, .htaccess). NO copia source ni qa.
rem  Uso: doble clic. (Con /nopause no espera una tecla al terminar.)
rem ==========================================================================
setlocal
cd /d "%~dp0"

if not exist "index.html" (
  echo ERROR: no se encontro index.html. Ejecuta este archivo desde la carpeta del proyecto.
  goto :error
)

echo Armando la carpeta "publicar"...

if exist "publicar" rmdir /s /q "publicar"
if exist "publicar" (
  echo ERROR: no se pudo borrar la carpeta "publicar" anterior. Cerra los archivos abiertos y proba de nuevo.
  goto :error
)
mkdir "publicar" || goto :error

copy /y "index.html" "publicar\" >nul || goto :error
copy /y "marca.html" "publicar\" >nul || goto :error
copy /y "rubro.html" "publicar\" >nul || goto :error
rem Cabeceras de seguridad: _headers (Netlify), vercel.json (Vercel), .htaccess (cPanel / Apache)
copy /y "_headers" "publicar\" >nul || goto :error
copy /y "vercel.json" "publicar\" >nul || goto :error
copy /y ".htaccess" "publicar\" >nul || goto :error
xcopy "css" "publicar\css\" /e /i /q /y >nul || goto :error
xcopy "js" "publicar\js\" /e /i /q /y >nul || goto :error
xcopy "assets" "publicar\assets\" /e /i /q /y >nul || goto :error

rem Las fotos originales en alta (Imagenes) no se publican: la pagina usa las de assets\products\catalogo.
if exist "publicar\assets\products\Imagenes" rmdir /s /q "publicar\assets\products\Imagenes"

rem Control: en "publicar" no puede haber PDFs, planillas, archivos de precios ni archivos
rem internos (README, scripts .bat / .ps1).
rem (dir devuelve error cuando no encuentra nada: eso es lo esperado.)
dir /s /b /a-d "publicar\*.pdf" "publicar\*.xls*" "publicar\*.csv" "publicar\*precio*" "publicar\*.md" "publicar\*.bat" "publicar\*.ps1" >nul 2>nul
if not errorlevel 1 (
  echo.
  echo ERROR: en "publicar" hay archivos que NO deben subirse:
  dir /s /b /a-d "publicar\*.pdf" "publicar\*.xls*" "publicar\*.csv" "publicar\*precio*" "publicar\*.md" "publicar\*.bat" "publicar\*.ps1" 2>nul
  rmdir /s /q "publicar"
  echo Se borro la carpeta "publicar" para que no se suba por error.
  echo Sacalos de css, js o assets y volve a ejecutar este archivo.
  goto :error
)

echo.
echo Listo. Control OK: no hay PDFs, archivos de precios ni archivos internos.
echo Subi la carpeta:
echo   %~dp0publicar
echo Netlify: arrastrala a https://app.netlify.com/drop
if /i not "%~1"=="/nopause" pause
exit /b 0

:error
echo.
echo No se armo la carpeta de publicacion.
if /i not "%~1"=="/nopause" pause
exit /b 1
