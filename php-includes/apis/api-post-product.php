<?php
	//This page receives a request to create a new Product
	
	require_once(realpath(dirname(__FILE__)) . "\..\db-helper.inc.php");
	require_once(realpath(dirname(__FILE__)) . "\..\class-helper.inc.php");
	require_once(realpath(dirname(__FILE__)) . "\..\config.inc.php");
	
	function createProduct($newProduct)
	{
		if(insertProduct($newProduct, CONNECTION))
		{
			$payload = new Payload(true, null, null);
		}
		else
		{
			$payload = new Payload(false, null, "Error, could not create the Product!");
		}
		
		$json = json_encode($payload);
		
		return $json;
	}
?>