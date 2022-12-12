<?php
	require_once('../../../php-includes/apis/api-patch-product.php');
	
	header("Content-Type: appliation/json; charset=UTF-8");
	
	//Get JSON body
	$json = file_get_contents('php://input');
	
	if(!$json)
	{
		http_response_code(400);
		
		$payload = new Payload(false, null, "Empty request body!");
		$json = json_encode($payload);
		
		echo $json;
	}
	else
	{
		//Convert JSON body to object
		$data = json_decode($json);
		
		echo patchProduct($data);
	}
?>