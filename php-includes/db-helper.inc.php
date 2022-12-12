<?php
	//This page will help with running queries to the database
	
	require_once('class-helper.inc.php');
	
	function runQuery($connection, $query, $values)
	{
		$statement = null;
		
		if($values != null)
		{
			$statement = $connection->prepare($query);
			
			foreach($values as $key => $value)
			{
				$statement->bindValue($key,$value);
			}
			
			$statement->execute();
			
			if(!$statement)
			{
				throw new PDOException;
			}
		}
		else
		{
			$statement = $connection->query($query);
			
			if(!$statement)
			{
				throw new PDOException;
			}
		}
		
		return $statement;
	}
	
	function getAllProducts($isActive, $connection)
	{
		$products = [];
		
		try
		{
			$queryResult = runQuery($connection, getAllProductsQuery($isActive), null);
			
			foreach($queryResult as $result)
			{
				$products[] = new Product($result);
			}
		}
		catch(PDOException $ex)
		{}
		
		return $products;
	}
	
	function getAllProductsQuery($isActive)
	{
		$query = 'SELECT * FROM products ';
		
		if($isActive)
		{
			$query .= 'WHERE isActive = 1';
		}
		
		return $query;
	}
	
	function insertProduct($newProduct, $connection)
	{
		//Create the values array to be passed on when the query is prepared
		$values = array();
		
		$values[":productName"] = $newProduct->productName;
		
		try{
			runQuery($connection, insertProductQuery(), $values); //Execute the SQL query which is called upon and executed with the given connection variable

			return true;  //Return true if the product have been successfully inserted
		}
		catch(PDOException $e){
			return false;  //Return false if an error occured in the database
		}
	}
	
	function insertProductQuery()   //SQL query to insert a new product with all the given data
	{
		
		$query = 'INSERT INTO products (productName)';
		$query .= 'VALUES (:productName);';

		return $query;
	}
	
	function updateProduct($existingProduct, $connection)
	{
		//Create the values array to be passed on when the query is prepared
		$values = array();
		
		$values[":productId"] = $existingProduct->productId;
		$values[":isActive"] = $existingProduct->isActive;
		
		try{
			runQuery($connection, updateProductQuery(), $values); //Execute the SQL query which is called upon and executed with the given connection variable

			return true;  //Return true if the product have been successfully inserted
		}
		catch(PDOException $e){
			return false;  //Return false if an error occured in the database
		}
	}
	
	function updateProductQuery()   //SQL query to update a product's active status
	{
		
		$query = 'UPDATE products SET isActive = (:isActive)';
		$query .= 'WHERE productId = (:productId);';

		return $query;
	}
?>