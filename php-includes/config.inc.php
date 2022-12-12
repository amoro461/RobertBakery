<?php
	//This page returns the connection to the database
	
	define('DBHOST', 'localhost');
	define('DBNAME', 'robertbakery');
	define('DBUSER', 'root');
	define('DBPASS', 'SuperSecretCredentials11!');
	define('DBCONNSTRING', "mysql:host=" . DBHOST . ";dbname=" . DBNAME . ";charset=utf8mb4;");
	
	define('CONNECTION', new PDO(DBCONNSTRING, DBUSER, DBPASS));
?>