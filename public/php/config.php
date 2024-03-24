<?php 

class Database{
    private $db_name = 'mysql:host=localhost;dbname=imagini-rainbowpages';
    private $db_user = 'root';
    private $db_pass = '';

    public $conn;

    public function __construct(){

        try{
            $this->conn = new PDO($this->db_name, $this->db_user, $this->db_pass);

            // echo 'Connected Successfully to the database!';
        }catch (PDOException $e){
            die("Connection failed: " . mysqli_connect_error());
        }

        return $this->conn;
    }

    // Check Input
    public function test_input($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
}
?>