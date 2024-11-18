<?php
class DatabaseConfiguration
{

    protected $servername;
    protected $username;
    protected $password;
    protected $dbname;
    protected $portnumber;

    public function __construct()
    {		
        // Parse MySQL credentials file.

		$this->servername = "localhost";
        $this->username = "tsnlabrhul";
        $this->password = "!?gb2023?!";
        $this->dbname = "menta";
        $this->portnumber = "3306";
    }
    public function createConnection() {
        // Create connection
		
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname, $this->portnumber);
        // Check connection
        if (!$conn) {
            die('Could not connect: ' . mysqli_error($conn));
        }
        return $conn;
    }
}