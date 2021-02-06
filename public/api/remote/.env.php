<?php
define('API_URL', 'http://10.1.1.113:9000');
define("VERSION", '0.07');
define("LOG_MODE", 'write_log');

//directories
define("ROOT_LOG", '../../../log/');
define("DIR_API", 'c:/xampp/htdocs/celebrate2021/public/api/');
define("TESTING_API_FILE_DIRECTORY", 'c:/xampp/htdocs/celebrate2021/public/api/testing/');
define("UNIQUE_API_FILE_DIRECTORY", 'c:/xampp/htdocs/celebrate2021/public/api/local/');
define("STANDARD_API_FILE_DIRECTORY", 'c:/xampp/htdocs/celebrate2021/public/api/standard/');
// database
define("HOST", "localhost");
define("USER", "celebrate2020");
define("PASS", "I5f?[Gd@JF_R");
define("DATABASE_CONTENT", "celebrate");
define("DATABASE_PORT", 3306);
define("CHARSET", 'utf8');
define("DSN", 'mysql:host=' . HOST . ';dbname='. DATABASE_CONTENT .';charset='. CHARSET );
//security
define('ACCEPTABLE_IP', '*');
define ('LOCAL_TOKEN', 'zzxyzzy');
define("DEVELOPER", 11);

//CORS	
//https://www.html5rocks.com/en/tutorials/cors/
//https://stackoverflow.com/questions/9631155/specify-multiple-subdomains-with-access-control-origin/9737907
//
function acceptableLinks(){
    return '*';
    if(isset($_SERVER['HTTP_ORIGIN'])) {
        return ACCEPTABLE_IP;
    }
    else{
        return '*';
    }
}
// find file 
function my_require_once_setup($user){
    $_SESSION['user'] = $user;
    return;
}
function my_require_once($filename){
    $new_name = 'not found';
    
    if (file_exists(UNIQUE_API_FILE_DIRECTORY . $filename)){
        $new_name = UNIQUE_API_FILE_DIRECTORY . $filename;  
    }
    else if (file_exists(STANDARD_API_FILE_DIRECTORY . $filename)){
        $new_name = STANDARD_API_FILE_DIRECTORY . $filename;
    }
    else if (file_exists($filename)){
        $new_name = $filename ;
    }
    if (isset($_SESSION['user']) ){
        if (file_exists(TESTING_API_FILE_DIRECTORY . $filename) && $_SESSION['user'] ==  DEVELOPER){
            $new_name = TESTING_API_FILE_DIRECTORY . $filename;  
        }
    }
    $debug = $filename .  '--' . $new_name . "\n";
    $debug .= UNIQUE_API_FILE_DIRECTORY . $filename . "\n";
    $debug .= STANDARD_API_FILE_DIRECTORY . $filename . "\n";
    $debug .= $filename . "\n\n\n";
    _append('my_require_once', $debug);
    if ($new_name != 'not found'){
        require_once ($new_name);
    }
    return;
}
function my_file($filename){
    if ($_SESSION['user'] ){
        if (file_exists(TESTING_API_FILE_DIRECTORY . $filename) && $_SESSION['user'] ==  DEVELOPER){
            return TESTING_API_FILE_DIRECTORY . $filename;  
        }
    }
    if (file_exists(UNIQUE_API_FILE_DIRECTORY . $filename)){
        return UNIQUE_API_FILE_DIRECTORY . $filename;
    }
    if (file_exists(STANDARD_API_FILE_DIRECTORY . $filename)){
        return STANDARD_API_FILE_DIRECTORY . $filename;
    }
    else if (file_exists($filename)){
        return $filename;
    }
    return $filename . ' was not found';
}