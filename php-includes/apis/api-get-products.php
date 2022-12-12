<?php
	//This page returns all Products from the database
	
	require_once(realpath(dirname(__FILE__)) . "\..\db-helper.inc.php");
	require_once(realpath(dirname(__FILE__)) . "\..\class-helper.inc.php");
	require_once(realpath(dirname(__FILE__)) . "\..\config.inc.php");
		
	function getProducts($isActive)
	{
		$products = getAllProducts($isActive, CONNECTION);
		
		if($products != null && $products > 0)
		{
			$payload = new Payload(true, $products, null);
		}
		else
		{
			$payload = new Payload(false, null, "Error, could not retrieve Products!");
		}	
		
		$json = json_encode($payload);
		
		return $json;
	}
?>