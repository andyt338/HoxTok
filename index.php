<html>
	<head>
	    <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1">
	    <title>Cashvue</title>
	    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"/>
	    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	</head>
    <body style="width:30%; margin:auto; padding-top:10%; text-align:center"> 
        <?php 
        try{
            $db = pg_connect('host=localhost dbname=mydb user=www-data password=newpasswd'); 
             if(!$db)
            {
               throw new Exception("Database Connection Error");
            }
            $email = pg_escape_string($_POST['email']);
            $useragent = $_SERVER ['HTTP_USER_AGENT'];

            $query = "INSERT INTO myschema.customers (email, created_at, useragent) VALUES('$email', 'now()', '$useragent')";
            $result = pg_query($query); 
            if (!$result) { 
                $errormessage = pg_last_error(); 
                echo "Error with query: " . $errormessage; 
                exit(); 
            } 
            print "<h4>Thank you! We will email you when we are about to launch.</h4>";
            pg_close(); 
            }catch(Exception $e){
                echo 'Caught exception: ',  $e->getMessage(), "\n";
            }
        ?> 
    </body>
	<a href="/index.html"><b>Back to Home Page</b></a>
</html> 