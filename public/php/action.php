<?php 
    session_start();
    require_once 'auth.php';
    $user = new Auth();

    // Handle Register Ajax Requset
    if(isset($_FILES['profile_picture'])){

        $name = $user->test_input($_POST['name']);
        $email = $user->test_input($_POST['email']);
        $pass = $user->test_input($_POST['password']);
        $gender = $user->test_input($_POST['gender']);


        // Handle file upload
        $target_dir = "upload_images/profile/";
        $original_filename = basename($_FILES["profile_picture"]["name"]);
        $extension = pathinfo($original_filename, PATHINFO_EXTENSION);
        $new_filename = uniqid() . '.' . $extension; // Generate a unique filename

        $profile_picture = $new_filename;


        $hpass = password_hash($pass, PASSWORD_DEFAULT);
        if($user->user_exist($email)){
            echo 'This E-mail is already registered!';
        }else{
            if($user->register($name, $email, $hpass, $gender, $profile_picture)){
                move_uploaded_file($_FILES["profile_picture"]["tmp_name"], "upload_images/profile/" . $profile_picture);

                echo 'register';
                $_SESSION['action'] = 'user';
                $_SESSION['email'] = $email;

            }else{
                echo 'Something went wrong! try again later!';
            }
        }
        // echo $name, $email, $pass, $gender, $profile_picture;
    }

    // Handle Login Ajax Requset
    if(isset($_POST['action']) && $_POST['action'] == 'login'){

      $email = $user->test_input($_POST['email']);
      $pass = $user->test_input($_POST['password']);


      $loggedInUser = $user->login($email);

      if($loggedInUser != null){ 
        if(password_verify($pass, $loggedInUser['password'])){
            if(!empty($_POST['rem'])){
                setcookie('email', $email, time() + (30*24*60*60), '/');
                setcookie('password', $pass, time()+(30*24*60*60), '/');
            }else{
                setcookie("email", "", 1, '/');
                setcookie("password", "", 1, '/');
            }

            $_SESSION['email'] = $loggedInUser['email'];
            $_SESSION['action'] = $loggedInUser['action'];
            echo $_SESSION['action'];
        }else{
            echo 'incorrect';
        }


      }else{
        echo 'not_found';
      }
    }



?>
