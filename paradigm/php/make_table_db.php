<html>
   <head>
      <title></title>
   </head>
   
   <body>
   <?php
         $dbhost = 'localhost:3036';
         $dbuser =  'lone';
         $dbpass = 'waiDee8ut3aj';
         $conn = mysql_connect($dbhost, $dbuser, $dbpass);
         
         if(! $conn ) {
            die('Could not connect: ' . mysql_error());
         }
         echo 'Connected successfully<br />';
         $sql = "CREATE TABLE testing_tbl( ".
            "subjnum INT, ".
            "worker_ID varchar(255), ".
            "assignment_ID varchar(255), ".
            "hit_ID varchar(255), ".
            "responses varchar(255), ".
            "event varchar(255), ".
            "task varchar(255),".
            "key_press varchar(255), ".
            "trial_num INT, ".
            "rt float ); ";
         mysql_select_db( 'lone' );
         $retval = mysql_query( $sql, $conn );
         
         if(! $retval ) {
            die('Could not create table: ' . mysql_error());
         }
         echo "Table created successfully\n";
         mysql_close($conn);
      ?>
</body>
</html>
      