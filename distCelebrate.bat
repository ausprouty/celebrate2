cd dist 
if EXIST "api/" (
    cd api
    if EXIST .env.api.local.mc2.php  del .env.api.local.mc2.php  
    if EXIST composer.lock del composer.lock
    if EXIST composer del composer
    if EXIST "ckfinder\" (
        cd ckfinder
        DEL /F/Q/S *.* > NUL
        cd ..
        RMDIR /Q/S ckfinder
    )
    if EXIST "local\" (
        cd local\
        DEL /F/Q/S *.* > NUL
        cd ..
        RMDIR /Q/S local
    )
    if EXIST "vendor\" (
        cd vendor
        DEL /F/Q/S *.* > NUL
        cd ..
        RMDIR /Q/S vendor
    )
    if EXIST "logs\" (
        cd  logs
        DEL /F/Q/S *.* > NUL
        cd ..
        RMDIR /Q/S logs
    )
    if EXIST "nppBackup\" (
        cd  nppBackup
        DEL /F/Q/S *.* > NUL
        cd ..
        RMDIR /Q/S nppBackup
    )
    cd ..
)
if EXIST "content/" (
    cd content
    DEL /F/Q/S *.* > NUL
    cd ..
    RMDIR /Q/S content
)
if EXIST "prototype/" (
    cd prototype
    DEL /F/Q/S *.* > NUL
    cd ..
    RMDIR /Q/S prototype
)
if EXIST "templates/" (
    cd templates
    DEL /F/Q/S *.* > NUL
    cd ..
    RMDIR /Q/S templates
)
if EXIST "translations/" (
    cd translations
    DEL /F/Q/S *.* > NUL
    cd ..
    RMDIR /Q/S translations
)
if EXIST "node_modules/" (
    cd node_modules
    DEL /F/Q/S *.* > NUL
    cd ..
    RMDIR /Q/S node_modules
)
if EXIST "nppBackup/" (
    cd nppBackup
    DEL /F/Q/S *.* > NUL
    cd ..
    RMDIR /Q/S nppBackup
)

if EXIST favicon.ico del favicon.ico
if EXIST feather-sprite.svg  del feather-sprite.svg
if EXIST  manifest.json del manifest.json
if EXIST robots.txt del robots.txt
if EXIST service-worker.js del service-worker.js
if EXIST .htaccess del .htaccess 
if EXIST .htaccess.remote del .htaccess.remote 
echo 'use notepad to edit index.html replacing myfriends if needed'
