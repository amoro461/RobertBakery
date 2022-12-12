<?php
	//This page receives a request to update an existing Product
	
	require_once(realpath(dirname(__FILE__)) . "\..\db-helper.inc.php");
	require_once(realpath(dirname(__FILE__)) . "\..\class-helper.inc.php");
	require_once(realpath(dirname(__FILE__)) . "\..\config.inc.php");
	
	function patchProduct($existingProduct)
	{
		if(updateProduct($existingProduct, CONNECTION))
		{
			$payload = new Payload(true, null, null);
		}
		else
		{
			$payload = new Payload(false, null, "Error, could not update the Product!");
		}
		
		$json = json_encode($payload);
		
		return $json;
	}
?>