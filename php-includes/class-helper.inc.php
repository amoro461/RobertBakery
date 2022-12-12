<?php
	//This page is used to define the classes used in the website
	
	//This class represents Products
	class Product
	{
		function __construct($productData)
		{
			if($productData['productId'] != null) //Check for ProductId since new Products won't have it
			{
				$this->productId = $productData['productId'];
			}
			$this->productName = $productData['productName'];
			$this->isActive = $productData['isActive'];
		}
		
		public $productId;
		public $productName;
		public $isActive;
	}
	
	//This represents results from API calls
	class Payload
	{
		function __construct($isSuccessful, $data, $errorMessage)
		{
			$this->isSuccessful = $isSuccessful;
			$this->data = $data;
			$this->errorMessage = $errorMessage;
		}
		
		public $isSuccessful;
		public $data;
		public $errorMessage;
	}
?>