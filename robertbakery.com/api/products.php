<?php
	require_once('../../php-includes/apis/api-get-products.php');

	header("Content-Type: appliation/json; charset=UTF-8");
	
	echo getProducts(true);
?>