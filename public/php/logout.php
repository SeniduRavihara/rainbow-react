<?php 

session_start();
unset($_SESSION['action']);
unset($_SESSION['email']);
header('location:../../index.php');

?>