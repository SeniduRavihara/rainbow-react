<?php 
    session_start();
    require_once 'auth.php';
    $user = new Auth();

    // handle Sample_Ad_For_Testing_Form
    if(isset($_FILES['sample_ad_for_testing01']) || isset($_FILES['sample_ad_for_testing02']) || isset($_FILES['sample_ad_for_testing03']) || isset($_FILES['sample_ad_for_testing04'])){

        // Handle file upload01
        $target_dir = "upload_images/sample_ad_for_testing/";
        $test01_original_filename = basename($_FILES["sample_ad_for_testing01"]["name"]);
        $extension1 = pathinfo($test01_original_filename, PATHINFO_EXTENSION);
        $testing01 = uniqid() . '.' . $extension1; // Generate a unique filename

        $test_image01 = $testing01;


        // Handle file upload02
        $target_dir = "upload_images/sample_ad_for_testing/";
        $test02_original_filename = basename($_FILES["sample_ad_for_testing02"]["name"]);
        $extension2 = pathinfo($test02_original_filename, PATHINFO_EXTENSION);
        $testing02 = uniqid() . '.' . $extension2; // Generate a unique filename

        $test_image02 = $testing02;



        // Handle file upload03
        $target_dir = "upload_images/sample_ad_for_testing/";
        $test03_original_filename = basename($_FILES["sample_ad_for_testing03"]["name"]);
        $extension3 = pathinfo($test03_original_filename, PATHINFO_EXTENSION);
        $testing03 = uniqid() . '.' . $extension3; // Generate a unique filename

        $test_image03 = $testing03;


        // Handle file upload04
        $target_dir = "upload_images/sample_ad_for_testing/";
        $test04_original_filename = basename($_FILES["sample_ad_for_testing04"]["name"]);
        $extension4 = pathinfo($test04_original_filename, PATHINFO_EXTENSION);
        $testing04 = uniqid() . '.' . $extension4; // Generate a unique filename

        $test_image04 = $testing04;


            if($user->get_readTestingImages01(1)){
                echo 'have';
            }else{
                if($user->add_sample_testing($test_image01, $test_image02, $test_image03, $test_image04)){
                    echo 'added';
                    move_uploaded_file($_FILES["sample_ad_for_testing01"]["tmp_name"], "upload_images/sample_ad_for_testing/" . $test_image01);
                    move_uploaded_file($_FILES["sample_ad_for_testing02"]["tmp_name"], "upload_images/sample_ad_for_testing/" . $test_image02);
                    move_uploaded_file($_FILES["sample_ad_for_testing03"]["tmp_name"], "upload_images/sample_ad_for_testing/" . $test_image03);
                    move_uploaded_file($_FILES["sample_ad_for_testing04"]["tmp_name"], "upload_images/sample_ad_for_testing/" . $test_image04);
                }else{
                    echo 'Something went wrong! try again later!';
                }
            }

    }



// read sample testing image requset ajax handle
if(isset($_POST['action']) && $_POST['action'] == 'readTestingImages01'){
	$output = '
        <div class="wrapper">

	';

	$readTestingImages01 = $user->get_readTestingImages01(1);

	if($readTestingImages01){
        if($readTestingImages01['test_image01']){
            $output .='
                <img src="./assets/php/upload_images/sample_ad_for_testing/'. $readTestingImages01['test_image01'].'">
            ';           
        }else{

        }

        if($readTestingImages01['test_image02']){
            $output .='
                <img src="./assets/php/upload_images/sample_ad_for_testing/'. $readTestingImages01['test_image02'].'">
            ';           
        }else{
            
        }

        if($readTestingImages01['test_image03']){
            $output .='
                <img src="./assets/php/upload_images/sample_ad_for_testing/'. $readTestingImages01['test_image03'].'">
            ';           
        }else{

        }

        if($readTestingImages01['test_image04']){
            $output .='
                <img src="./assets/php/upload_images/sample_ad_for_testing/'. $readTestingImages01['test_image04'].'">
            ';           
        }else{
            
        }

      $output .='</div>';

        echo $output;
	}else{
		echo '<b>Do not have sample test images!</b>';
	}
} 


// Add section 02 
if(isset($_FILES['section02_for_testing01']) || isset($_FILES['section02_for_testing02']) || isset($_FILES['section02_for_testing03']) || isset($_FILES['section02_for_testing04'])){

        // Handle file upload01
        $target_dir_sec02 = "upload_images/sample_ad_for_testing/";
        $test01_original_filename_sec02 = basename($_FILES["section02_for_testing01"]["name"]);
        $extension1_sec02 = pathinfo($test01_original_filename_sec02, PATHINFO_EXTENSION);
        $testing01_sec02 = uniqid() . '.' . $extension1_sec02; // Generate a unique filename

        $test_image01_sec02 = $testing01_sec02;
       


        // Handle file upload02
        $target_dir = "upload_images/testing02/";
        $test02_original_filename = basename($_FILES["section02_for_testing02"]["name"]);
        $extension2 = pathinfo($test02_original_filename, PATHINFO_EXTENSION);
        $testing02 = uniqid() . '.' . $extension2; // Generate a unique filename

        $test_image02 = $testing02;



        // Handle file upload03
        $target_dir = "upload_images/testing02/";
        $test03_original_filename = basename($_FILES["section02_for_testing03"]["name"]);
        $extension3 = pathinfo($test03_original_filename, PATHINFO_EXTENSION);
        $testing03 = uniqid() . '.' . $extension3; // Generate a unique filename

        $test_image03 = $testing03;



        // Handle file upload04
        $target_dir = "upload_images/testing02/";
        $test04_original_filename = basename($_FILES["section02_for_testing04"]["name"]);
        $extension4 = pathinfo($test04_original_filename, PATHINFO_EXTENSION);
        $testing04 = uniqid() . '.' . $extension4; // Generate a unique filename

        $test_image04 = $testing04;


            if($user->get_readTestingImages02(1)){
                echo 'have';
            }else{
                if($user->add_sample_testing02($test_image01_sec02, $test_image02, $test_image03, $test_image04)){
                    echo 'added';
                    move_uploaded_file($_FILES["section02_for_testing01"]["tmp_name"], "upload_images/testing02/" . $test_image01_sec02);
                    move_uploaded_file($_FILES["section02_for_testing02"]["tmp_name"], "upload_images/testing02/" . $test_image02);
                    move_uploaded_file($_FILES["section02_for_testing03"]["tmp_name"], "upload_images/testing02/" . $test_image03);
                    move_uploaded_file($_FILES["section02_for_testing04"]["tmp_name"], "upload_images/testing02/" . $test_image04);
                }else{
                    echo 'Something went wrong! try again later!';
                }
            }

}


// read sample testing image requset ajax handle
if(isset($_POST['action']) && $_POST['action'] == 'readSection02Images'){
    $output = '';

	$row = $user->get_readTestingImages02(1);
    echo json_encode($row);

} 



    // handle Popular Brands
    if(isset($_FILES['popular_img01']) || isset($_FILES['popular_img02']) || isset($_FILES['popular_img03'])){

        // Handle file upload01
        $target_dir = "upload_images/popular_brands/";
        $test01_original_filename = basename($_FILES["popular_img01"]["name"]);
        $extension1 = pathinfo($test01_original_filename, PATHINFO_EXTENSION);
        $testing01 = uniqid() . '.' . $extension1; // Generate a unique filename

        $test_image01 = $testing01;


        // Handle file upload02
        $target_dir = "upload_images/popular_brands/";
        $test02_original_filename = basename($_FILES["popular_img02"]["name"]);
        $extension2 = pathinfo($test02_original_filename, PATHINFO_EXTENSION);
        $testing02 = uniqid() . '.' . $extension2; // Generate a unique filename

        $test_image02 = $testing02;



        // Handle file upload03
        $target_dir = "upload_images/popular_brands/";
        $test03_original_filename = basename($_FILES["popular_img03"]["name"]);
        $extension3 = pathinfo($test03_original_filename, PATHINFO_EXTENSION);
        $testing03 = uniqid() . '.' . $extension3; // Generate a unique filename

        $test_image03 = $testing03;



            if($user->get_readpopularbrands(1)){
                echo 'have';
            }else{
                if($user->add_popularbrands($test_image01, $test_image02, $test_image03)){
                    echo 'added';
                    move_uploaded_file($_FILES["popular_img01"]["tmp_name"], "upload_images/popular_brands/" . $test_image01);
                    move_uploaded_file($_FILES["popular_img02"]["tmp_name"], "upload_images/popular_brands/" . $test_image02);
                    move_uploaded_file($_FILES["popular_img03"]["tmp_name"], "upload_images/popular_brands/" . $test_image03);

                }else{
                    echo 'Something went wrong! try again later!';
                }
            }

    }


// read popular brands image requset ajax handle
if(isset($_POST['action']) && $_POST['action'] == 'readpopularbrands'){
    $output = '
           <div class="pop-brand-title">
                Popular Brands
            </div>
            <div class="pop-brand-imgs">
    ';

    $readPopularbrands = $user->get_readpopularbrands(1);

    if($readPopularbrands){

        $output .= '

                <img src="./assets/php/upload_images/popular_brands/'. $readPopularbrands['test_image01'] .'" alt="">
                <img src="./assets/php/upload_images/popular_brands/'. $readPopularbrands['test_image02'] .'" alt="">
                <img src="./assets/php/upload_images/popular_brands/'. $readPopularbrands['test_image03'] .'" alt="">
            
        ';

        $output .= '</div>';

        echo $output;
    }else{
        echo '<center><b>Do not have sample test images!</b></center>';
    }
} 


// change login and sign up button requset ajax handle
if(isset($_POST['action']) && $_POST['action'] == 'changeloginbtn'){

    $output = '';

    if(isset($_SESSION['action'])){
        $Webuser = '';
        $create_store_row = '';

        $Webuser = $user->login($_SESSION['email']);

        $create_store_row = $user->get_create_store($_SESSION['email']);
          
        if($create_store_row){

            if($create_store_row['action'] === 'active' ){
            $output .= '

               <div class="notifify-icon">
                    <div class="notifify-icon-alert">0</div>
                    <ion-icon name="notifications-outline" style="cursor: pointer;"></ion-icon>
                </div>
                <div class="profile">
                     <img src="./assets/php/upload_images/profile/'.$Webuser['image'].'">
                    <ul class="content">
                        <li><a href="./profile.php">My store</a></li>
                        <li><a href="./assets/php/logout.php">Logout</a></li>
                    </ul>
                </div>


                ';
            }else{
               $output .= '

               <div class="notifify-icon">
                    <ion-icon name="notifications-outline" style="cursor: pointer;"></ion-icon>
                </div>
                <div class="profile">
                     <img src="./assets/php/upload_images/profile/'.$Webuser['image'].'">
                    <ul class="content">
                        <li><a href="./create-store.php">Create store</a></li>
                        <li><a href="./assets/php/logout.php">Logout</a></li>
                    </ul>
                </div>

                ';        
            }

        }else{
            $output .= '

               <div class="notifify-icon">
                    <ion-icon name="notifications-outline" style="cursor: pointer;"></ion-icon>
                </div>
                <div class="profile">
                     <img src="./assets/php/upload_images/profile/'.$Webuser['image'].'">
                    <ul class="content">
                        <li><a href="./create-store.php">Create store</a></li>
                        <li><a href="./assets/php/logout.php">Logout</a></li>
                    </ul>
                </div>

                ';
        }



    }else{
        $output .= '
            <div class="notifify-icon">
                <ion-icon name="notifications-outline" style="cursor: pointer;"></ion-icon>
            </div>
            <div class="log-sign-bt">
                <a href="login.php"><button>Login/Sign Up</button></a>
            </div>
        ';
    }

    echo $output;



} 

// Add Create store
if(isset($_FILES['logo'])){

    $email = $_SESSION['email'];

    $title = $user->test_input($_POST['title']);
    $address = $user->test_input($_POST['address']);
    $mobile = $user->test_input($_POST['mobile']);
    $whatsapp_number = $user->test_input($_POST['whats_number']);
    $tag = $user->test_input($_POST['tag']);

        $Webuser = $user->login($_SESSION['email']);
        $name = $Webuser['name'];


        // Handle file logo
        $absolute_path = realpath("upload_images/create_store/".$name );

        if(!$absolute_path){
            mkdir("upload_images/create_store/".$name."");
        }

        $logo_original_filename = basename($_FILES["logo"]["name"]);
        $extensionlogo = pathinfo($logo_original_filename, PATHINFO_EXTENSION);
        $testinglogo = uniqid() . '.' . $extensionlogo; // Generate a unique filename

        $logo = $testinglogo;
        move_uploaded_file($_FILES["logo"]["tmp_name"], 'upload_images/create_store/'.$name.'/' . $logo);

        // Handle file storeinputimages1
        $storeimages1_original_filename = basename($_FILES["storeinputimages1"]["name"]);
        $extensionstoreimages1 = pathinfo($storeimages1_original_filename, PATHINFO_EXTENSION);
        $testingstoreimages1 = uniqid() . '.' . $extensionstoreimages1; // Generate a unique filename

        $storeimages1 = $testingstoreimages1;


        // Handle file storeinputimages2
        $storeimages2_original_filename = basename($_FILES["storeinputimages2"]["name"]);
        $extensionstoreimages2 = pathinfo($storeimages2_original_filename, PATHINFO_EXTENSION);
        $testingstoreimages2 = uniqid() . '.' . $extensionstoreimages2; // Generate a unique filename

        $storeimages2 = $testingstoreimages2;

    
        // Handle file storeinputimages3
        $storeimages3_original_filename = basename($_FILES["storeinputimages3"]["name"]);
        $extensionstoreimages3 = pathinfo($storeimages3_original_filename, PATHINFO_EXTENSION);
        $testingstoreimages3 = uniqid() . '.' . $extensionstoreimages3; // Generate a unique filename

        $storeimages3 = $testingstoreimages3;


        // Handle file storeinputimages4
        $storeimages4_original_filename = basename($_FILES["storeinputimages4"]["name"]);
        $extensionstoreimages4 = pathinfo($storeimages4_original_filename, PATHINFO_EXTENSION);
        $testingstoreimages4 = uniqid() . '.' . $extensionstoreimages4; // Generate a unique filename

        $storeimages4 = $testingstoreimages4;


        // Handle file storeinputimages5
        $storeimages5_original_filename = basename($_FILES["storeinputimages5"]["name"]);
        $extensionstoreimages5 = pathinfo($storeimages5_original_filename, PATHINFO_EXTENSION);
        $testingstoreimages5 = uniqid() . '.' . $extensionstoreimages5; // Generate a unique filename

        $storeimages5 = $testingstoreimages5;

        // Handle file storeinputimages6
        $storeimages6_original_filename = basename($_FILES["storeinputimages6"]["name"]);
        $extensionstoreimages6 = pathinfo($storeimages6_original_filename, PATHINFO_EXTENSION);
        $testingstoreimages6 = uniqid() . '.' . $extensionstoreimages6; // Generate a unique filename

        $storeimages6 = $testingstoreimages6;

        // Handle file storeinputimages6
        $storeimages7_original_filename = basename($_FILES["storeinputimages7"]["name"]);
        $extensionstoreimages7 = pathinfo($storeimages7_original_filename, PATHINFO_EXTENSION);
        $testingstoreimages7 = uniqid() . '.' . $extensionstoreimages7; // Generate a unique filename

        $storeimages7 = $testingstoreimages7;


        $storeimgCollection = implode(',',array($storeimages1,$storeimages2,$storeimages3,$storeimages4,$storeimages5,$storeimages6,$storeimages7));


        if($user->addcreatestore($email, $title, $address, $mobile, $whatsapp_number, $logo, $storeimgCollection, $tag)){
           move_uploaded_file($_FILES["logo"]["tmp_name"], 'upload_images/create_store/'.$name.'/' . $logo);
           move_uploaded_file($_FILES["storeinputimages1"]["tmp_name"], 'upload_images/create_store/'.$name.'/' . $storeimages1);
           move_uploaded_file($_FILES["storeinputimages2"]["tmp_name"], 'upload_images/create_store/'.$name.'/' . $storeimages2);
           move_uploaded_file($_FILES["storeinputimages3"]["tmp_name"], 'upload_images/create_store/'.$name.'/' . $storeimages3);
           move_uploaded_file($_FILES["storeinputimages4"]["tmp_name"], 'upload_images/create_store/'.$name.'/' . $storeimages4);
           move_uploaded_file($_FILES["storeinputimages5"]["tmp_name"], 'upload_images/create_store/'.$name.'/' . $storeimages5);
           move_uploaded_file($_FILES["storeinputimages6"]["tmp_name"], 'upload_images/create_store/'.$name.'/' . $storeimages6);
           move_uploaded_file($_FILES["storeinputimages7"]["tmp_name"], 'upload_images/create_store/'.$name.'/' . $storeimages7);

           echo 'create_store_added';

        }else{
            echo false;
        }

}



// read profile data in create store requset ajax handle
if(isset($_POST['action']) && $_POST['action'] == 'readprofiledata'){
    $output = '';

    $row = $user->get_create_store($_SESSION['email']);

    $images = explode(',', $row['storeimgCollection']);
    $Webuser = $user->login($_SESSION['email']);
    $name = $Webuser['name'];

     $object = (object) [
    'id' => $row['id'],
    'name' => $name,
    'email' => $row['email'],
    'title' => $row['title'],
    'address' => $row['address'],
    'mobile' => $row['mobile'],
    'whatsap_number' => $row['whatsap_number'],
    'logo' => $row['logo'],
    'action' => $row['action'],
    'img1' => $images[0],
    'img2' => $images[1],
    'img3' => $images[2],
    'img4' => $images[3],
    'img5' => $images[4],
    'img6' => $images[5],
    'img7' => $images[6],
  ];
    echo json_encode($object);
  // echo $images[5];1

}


// Handle Display All Notes Of An User
if(isset($_POST['action']) && $_POST['action'] == 'display_createstore'){
    $output = '';

    $create_store = $user->get_createstore_all(1);

    if($create_store){

        $output .='            

        <table class="table table-striped text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>EMAIL</th>
                  <th>TITLE</th>
                  <th>ADDRESS</th>
                  <th>TAG</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>';

        foreach($create_store as $row){
            if($row['action'] == 'active'){
                $action_btn = '<button class="btn btn-success">Active</button>
                                <button class="btn btn-secondary updatedeactive" action="deactive" id="'.$row['id'].'">Deactive</button>';
            }else{
                $action_btn = '<button class="btn btn-secondary updateactive" action="active" id="'.$row['id'].'" id="updateActive">Active</button>
                                <button class="btn btn-success">Deactive</button>';
            }
        $output .='
                <tr>
                  <td>'.$row['id'].'</td>
                  <td>'.$row['email'].'</td>
                   <td>'.$row['title'].'</td>
                    <td>'.$row['address'].'</td>
                  <td>'.$row['tag'].'</td>   
                  <td>'.$action_btn.'</td>
                </tr>';
        }

        $output .= '              

                </tbody>
            </table>';
        echo $output;
    }else{
        echo '<h3 class="text-center text-secondary">:( You have not Create store! )</h3>';
    }

} 

// update create store action (active)
if(isset($_POST['action']) && $_POST['action'] == 'updatecreatestoreaction'){

    $id = $user->test_input($_POST['edit_id']);
    $action = $user->test_input($_POST['edit_action']);

    if($user->updatecreateaction($id, $action)){
        echo true;
    }
}


// rating
if(isset($_POST['action']) && $_POST['action'] == 'addrating'){

    $comment = $user->test_input($_POST['comment']);
    $rate = $user->test_input($_POST['rate']);
    $store_id = $user->test_input($_POST['store_id']);
    $email = $_SESSION['email'];

    $Webuser = $user->login($_SESSION['email']);
    $name = $Webuser['name'];
    $image = $Webuser['image'];

    echo $name, $image;

    if($user->getrowrating($email, $store_id)){
        echo 'has';
    }else{

       if($user->addrating($email, $comment, $rate, $name, $image, $store_id)){
        echo 'added';
       }else{
        echo 'Something went wrong!';
       }
    }

}


// read email raing
if(isset($_POST['action']) && $_POST['action'] == 'reademailrating'){

    $row = $user->get_create_store($_SESSION['email']);
    $store_id = $row['id'];

    if($user->getrowrating($_SESSION['email'], $store_id)){
        echo 'has';
    }else{
        echo 'no';
    }
}

// read store id raing
if(isset($_POST['action']) && $_POST['action'] == 'readstoreid'){

    $store_id = $user->test_input($_POST['store_id']);
    
    if($user->getrowrating($_SESSION['email'], $store_id)){
        echo 'has';
    }else{
        echo 'no';
    }
}




// read all email rating data
if(isset($_POST['action']) && $_POST['action'] == 'readallratingemail'){



    $row = $user->get_create_store($_SESSION['email']);
    $store_id = $row['id'];

    $output = '';

    $rating = $user->get_allrating_id($store_id);

    if($rating){

      // print_r($rating);

        foreach($rating as $row){


              $output .='            
                    <div class="recent-user-rate" style="display:block;">
                        <div style="display:flex;">
                            <div class="recnet-user-pro-pic-div">
                                <div class="rated-user-pro-pic" style="background-image: url(./assets/php/upload_images/profile/'.$row['image'].');" ></div>
                            </div>
                            <div class="rated-user-informations">
                                <div class="rated-user-info-names">
                                    '.$row['name'].'
                                </div>';


                                if($row['rate'] == 'rate1'){
                                    $output .= '<div class="rated-user-info-rate">
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star-outline"></ion-icon>
                                    <ion-icon name="star-outline"></ion-icon>
                                    <ion-icon name="star-outline"></ion-icon>
                                    <ion-icon name="star-outline" ></ion-icon>
                                </div>';

                                } elseif ($row['rate'] == 'rate2') {
                                    $output .= '<div class="rated-user-info-rate">
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star-outline"></ion-icon>
                                    <ion-icon name="star-outline"></ion-icon>
                                    <ion-icon name="star-outline" ></ion-icon>
                                </div>';

                                }elseif ($row['rate'] == 'rate3') {
                                    $output .= '<div class="rated-user-info-rate">
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star-outline"></ion-icon>
                                    <ion-icon name="star-outline" ></ion-icon>
                                </div>';

                                }elseif ($row['rate'] == 'rate4') {
                                    $output .= '<div class="rated-user-info-rate">
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star-outline" ></ion-icon>
                                </div>';
                                }elseif ($row['rate'] == 'rate5') {
                                    $output .= '<div class="rated-user-info-rate">
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                </div>';
                                }

                        $output .=  
                          '</div>
                        </div>
                            <p class="" style="width:410px;">'.$row['comment'].'</p>
                    </div>';

                }




            echo $output;
    }else{
        echo '<h3 class="text-center text-secondary">:( You have not rating! )</h3>';
    }    
}


// read all store id rating data
if(isset($_POST['action']) && $_POST['action'] == 'readallrating'){

    $store_id = $user->test_input($_POST['store_id']);

    $output = '';

    $rating = $user->get_allrating_id($store_id);

    if($rating){

      // print_r($rating);

        foreach($rating as $row){


              $output .='            
                    <div class="recent-user-rate" style="display:block;">
                        <div style="display:flex;">
                            <div class="recnet-user-pro-pic-div">
                                <div class="rated-user-pro-pic" style="background-image: url(./assets/php/upload_images/profile/'.$row['image'].');" ></div>
                            </div>
                            <div class="rated-user-informations">
                                <div class="rated-user-info-names">
                                    '.$row['name'].'
                                </div>';


                                if($row['rate'] == 'rate1'){
                                    $output .= '<div class="rated-user-info-rate">
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star-outline"></ion-icon>
                                    <ion-icon name="star-outline"></ion-icon>
                                    <ion-icon name="star-outline"></ion-icon>
                                    <ion-icon name="star-outline" ></ion-icon>
                                </div>';

                                } elseif ($row['rate'] == 'rate2') {
                                    $output .= '<div class="rated-user-info-rate">
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star-outline"></ion-icon>
                                    <ion-icon name="star-outline"></ion-icon>
                                    <ion-icon name="star-outline" ></ion-icon>
                                </div>';

                                }elseif ($row['rate'] == 'rate3') {
                                    $output .= '<div class="rated-user-info-rate">
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star-outline"></ion-icon>
                                    <ion-icon name="star-outline" ></ion-icon>
                                </div>';

                                }elseif ($row['rate'] == 'rate4') {
                                    $output .= '<div class="rated-user-info-rate">
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star-outline" ></ion-icon>
                                </div>';
                                }elseif ($row['rate'] == 'rate5') {
                                    $output .= '<div class="rated-user-info-rate">
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                    <ion-icon name="star" class="active"></ion-icon>
                                </div>';
                                }

                        $output .=  
                          '</div>
                        </div>
                            <p class="" style="width:410px;">'.$row['comment'].'</p>
                    </div>';

                }




            echo $output;
    }else{
        echo '<h3 class="text-center text-secondary">:( You have not rating! )</h3>';
    }    
}


// load first data from index searching
if(isset($_POST['action']) && $_POST['action'] == 'loadindexsearchong'){

    $location = $user->test_input($_POST['location']);
    $search_item = $user->test_input($_POST['search_item']);

    $searching_data = $user->searchdatafromcreatestore($location, $search_item);

   $output = '';

    if($searching_data){


        foreach($searching_data as $row){

            $email = $row['email'];
            $Webuser = $user->login($email);
            $name = $Webuser['name'];

            $store_id = $row['id'];

            $storeCount =  $user->getstoreratingcount($store_id);
            $tags = explode(',', $row['tag']);

            $output .= '
                <div class="left-store-ad-posters">
                    <div class="left-store-ad-poster-image poster_logo" id="'.$row['id'].'" style="cursor:pointer;">
                        <img src="assets/php/upload_images/create_store/'.$name.'/'.$row['logo'].'" alt="">
                    </div>
                    <div class="left-store-ad-poster-details">
                        <div class="ad-poster-name" >
                            '.$row['title'].'
                        </div>
                        <div class="rating-level">
                            <div class="rate-level">
                                4.7
                            </div>
                            <div class="ratins-stars">
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                            </div>
                            <div class="rating-collection-in-numbers">
                                '. $storeCount.' Ratings
                            </div>
                        </div>
                        <div class="ad-poster-details-location">
                            <div class="ad-poster-details-location-icon">
                                <ion-icon name="location-outline"></ion-icon>
                            </div>
                            <div class="ad-poster-details-location-details">
                              '.$row['address'].'
                            </div>
                        </div>
                        <div class="ad-post-tags-section">';

                               foreach($tags as $tag){

                                      $output .= '<div class="ad-post-tags">'.$tag.'</div>';
                               }

                            // <div class="ad-post-tags">Premium</div>
                            // <div class="ad-post-tags">Economy</div>
                            // <div class="ad-post-tags">Hair Straightening</div>


                       $output .= '</div>
                        <div class="contact-info">
                            <a href="tel:09054211453" class="call-button">
                                <div class="cnt-info-call-icon">
                                    <ion-icon name="call"></ion-icon>
                                </div>
                                <div class="phone-number">
                                    '.$row['mobile'].'
                                </div></a>
                            <a href="#" class="ad-snd-enquiry">Send Enquiry</a>
                            <a href="#" class="ad-whatsapp-msg-sender">
                                <div class="ad-whatsapp-msg-sender-img">
                                    <img src="./assets/img/search_result/whatsappico.png" alt="">
                                </div>
                                <div class="ad-whatsapp-msg-sender-text">
                                    Chat
                                </div>
                            </a>
                        </div>
                    </div>
                </div>';

        }

        echo $output;
    }else{
        echo '<h3 class="text-center text-secondary">:( Nothing! )</h3>';
    }    
}


    // handlesearch result pages sample images
    if(isset($_FILES['resultaddimg1']) || isset($_FILES['resultaddimg2']) || isset($_FILES['resultaddimg3']) || isset($_FILES['resultaddimg4'])){

        // Handle file upload01
        $target_dir = "upload_images/search_result_add/";
        $test01_original_filename = basename($_FILES["resultaddimg1"]["name"]);
        $extension1 = pathinfo($test01_original_filename, PATHINFO_EXTENSION);
        $testing01 = uniqid() . '.' . $extension1; // Generate a unique filename

        $test_image01 = $testing01;


        // Handle file upload02
        $target_dir = "upload_images/search_result_add/";
        $test02_original_filename = basename($_FILES["resultaddimg2"]["name"]);
        $extension2 = pathinfo($test02_original_filename, PATHINFO_EXTENSION);
        $testing02 = uniqid() . '.' . $extension2; // Generate a unique filename

        $test_image02 = $testing02;



        // Handle file upload03
        $target_dir = "upload_images/search_result_add/";
        $test03_original_filename = basename($_FILES["resultaddimg3"]["name"]);
        $extension3 = pathinfo($test03_original_filename, PATHINFO_EXTENSION);
        $testing03 = uniqid() . '.' . $extension3; // Generate a unique filename

        $test_image03 = $testing03;

        // Handle file upload03
        $target_dir = "upload_images/search_result_add/";
        $test04_original_filename = basename($_FILES["resultaddimg4"]["name"]);
        $extension4 = pathinfo($test04_original_filename, PATHINFO_EXTENSION);
        $testing04 = uniqid() . '.' . $extension4; // Generate a unique filename

        $test_image04 = $testing04;


            if($user->get_readsearchresultaddimages(1)){
                echo 'have';
            }else{
                if($user->add_searchresultaddimages($test_image01, $test_image02, $test_image03, $test_image04)){
                    echo 'added';
                    move_uploaded_file($_FILES["resultaddimg1"]["tmp_name"], "upload_images/search_result_add/" . $test_image01);
                    move_uploaded_file($_FILES["resultaddimg2"]["tmp_name"], "upload_images/search_result_add/" . $test_image02);
                    move_uploaded_file($_FILES["resultaddimg3"]["tmp_name"], "upload_images/search_result_add/" . $test_image03);
                    move_uploaded_file($_FILES["resultaddimg4"]["tmp_name"], "upload_images/search_result_add/" . $test_image04);
                }else{
                    echo 'Something went wrong! try again later!';
                }
            }

    }


// read search result image requset ajax handle
if(isset($_POST['action']) && $_POST['action'] == 'readsearchresulttestimages'){

    $readimages = $user->get_readsearchresultaddimages(1);

   $output1 = '';

    if($readimages){

        $output1 .= '
                <div class="wrapper">
                   <img src="./assets/php/upload_images/search_result_add/'. $readimages['test_image01'] .'" alt="">
                   <img src="./assets/php/upload_images/search_result_add/'. $readimages['test_image02'] .'" alt="">
                   <img src="./assets/php/upload_images/search_result_add/'. $readimages['test_image03'] .'" alt="">
                   <img src="./assets/php/upload_images/search_result_add/'. $readimages['test_image04'] .'" alt="">
                </div>';

        echo $output1;
    }else{
        echo '<center><b>Do not have sample test images!</b></center>';
    }
} 

    
// get data from  searching
if(isset($_POST['action']) && $_POST['action'] == 'getsearchresulttestitems'){

    $location = $user->test_input($_POST['location']);
    $search_item = $user->test_input($_POST['search_item']);

    $searching_data = $user->searchdatafromcreatestore($location, $search_item);



   $output = '';

    if($searching_data){


        foreach($searching_data as $row){

            $store_id = $row['id'];
            $email = $row['email'];
            $Webuser = $user->login($email);
            $name = $Webuser['name'];

            $storeCount =  $user->getstoreratingcount($store_id);

            $tags = explode(',', $row['tag']);

            $output .= '
                <div class="left-store-ad-posters">
                    <div class="left-store-ad-poster-image poster_logo" id="'.$row['id'].'">
                        <img src="assets/php/upload_images/create_store/'.$name.'/'.$row['logo'].'" alt="">
                    </div>
                    <div class="left-store-ad-poster-details">
                        <div class="ad-poster-name">
                            '.$row['title'].'
                        </div>
                        <div class="rating-level">
                            <div class="rate-level">
                                4.7
                            </div>
                            <div class="ratins-stars">
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                            </div>
                            <div class="rating-collection-in-numbers">
                                '.$storeCount.' Ratings
                            </div>
                        </div>
                        <div class="ad-poster-details-location">
                            <div class="ad-poster-details-location-icon">
                                <ion-icon name="location-outline"></ion-icon>
                            </div>
                            <div class="ad-poster-details-location-details">
                              '.$row['address'].'
                            </div>
                        </div>
                        <div class="ad-post-tags-section">';
                    
                        foreach($tags as $tag){
                              $output .= '<div class="ad-post-tags">'.$tag.'</div>';
                        }

                       $output .= '</div>
                        <div class="contact-info">
                            <a href="tel:09054211453" class="call-button">
                                <div class="cnt-info-call-icon">
                                    <ion-icon name="call"></ion-icon>
                                </div>
                                <div class="phone-number">
                                    '.$row['mobile'].'
                                </div></a>
                            <a href="#" class="ad-snd-enquiry">Send Enquiry</a>
                            <a href="#" class="ad-whatsapp-msg-sender">
                                <div class="ad-whatsapp-msg-sender-img">
                                    <img src="./assets/img/search_result/whatsappico.png" alt="">
                                </div>
                                <div class="ad-whatsapp-msg-sender-text">
                                    Chat
                                </div>
                            </a>
                        </div>
                    </div>
                </div>';

        }

        echo $output;
    }else{
        echo '<h3 class="text-center text-secondary">:( Nothing! )</h3>';
    }    
}

// read profile data in create store requset ajax handle
if(isset($_POST['action']) && $_POST['action'] == 'getstoreid'){

    $id = $user->test_input($_POST['store_id']);    

    $row = $user->get_create_store_id($id);
    $email = $row['email'];
    $images = explode(',', $row['storeimgCollection']);
    $Webuser = $user->login($email);
    $name = $Webuser['name'];

     $object = (object) [
    'id' => $row['id'],
    'name' => $name,
    'email' => $row['email'],
    'title' => $row['title'],
    'address' => $row['address'],
    'mobile' => $row['mobile'],
    'whatsap_number' => $row['whatsap_number'],
    'logo' => $row['logo'],
    'action' => $row['action'],
    'img1' => $images[0],
    'img2' => $images[1],
    'img3' => $images[2],
    'img4' => $images[3],
    'img5' => $images[4],
    'img6' => $images[5],
    'img7' => $images[6],
  ];
    echo json_encode($object);
  // echo $images[5];1

}

// read store id raing count
if(isset($_POST['action']) && $_POST['action'] == 'readstorecount'){

    $row = $user->get_create_store($_SESSION['email']);
    $store_id = $row['id'];

    echo $user->getstoreratingcount($store_id);
}


// read store id raing count
if(isset($_POST['action']) && $_POST['action'] == 'readstorecountstoreid'){

    $store_id = $user->test_input($_POST['store_id']); 

    echo $user->getstoreratingcount($store_id);
}


// get all address
if(isset($_POST['action']) && $_POST['action'] == 'getalladdress'){

    
    if($user->getalladdress(1)){

        $data = $user->getalladdress(1);
        $output = '';

         // foreach($data as $row){
         $object = (object) [

            'address' => 'katu','katuda',

          ];
         // }


    echo json_encode($object);


        // echo implode(', ', array_map(function ($entry) {
        //   return $entry['address'];
        // }, $data));

        // print_r($user->getalladdress(1));
    }else{
        echo 'no';
    }
}


  
  // Handle Display All Notes Of An User
  // if(isset($_POST['action']) && $_POST['action'] == 'load_address'){
  //   $output = '';
  
  //   $projects = $user->getalladdress(1);
  
  //   if($projects){
  //     $output .='            
  
  //     <option selected disabled>Search Project Title</option>';
  
  //         foreach($projects as $row){
  //         $output .='
  //                   <option value="'.$row['address'].'">'.$row['address'].'</option>';
  //         }
  
  //         echo $output;
  //   }else{
  //     echo '<option selected>No Project Title Found</option>';
  //   }
  // }


    //  Add message admin panel
if(isset($_POST['action']) && $_POST['action'] == 'addMessage'){

    $email = $user->test_input($_POST['msemail']);
    $message = $user->test_input($_POST['mscontent']);
    $action = $user->test_input($_POST['selectaction']);

    $adminEmail = $_SESSION['email'];

    if($action == 'custom'){
        if($user->addMessageCustom($email, $message, $adminEmail)){
            echo 'added';
        }
    }else if ($action == 'all'){

        // if($user->addMessageAll($message, $adminEmail)){
        //     echo 'added';
        // }

            $result = $user->getAllUserEmail(1);
            foreach ($result as $row){
                if($user->addMessageCustom($row['email'], $message, $adminEmail)){
                }
            }
            echo 'added';

    }
}


// read message
if(isset($_POST['action']) && $_POST['action'] == 'readMessageCount'){


    $countall = $user->MessageCountall('all');
    $countemail = $user->MessageCountemail($_SESSION['email']);

    echo $countall + $countemail;

}


if(isset($_POST['action']) && $_POST['action'] == 'readMessage'){


    $output = '';

    if($user->readMessageall('all')){
        $message = $user->readMessageall('all');
        $adminUser = $user->getadmin('admin');

        foreach($message as $row){

            $output .= '
            <div class="box" style="display:block;" id="'.$row['id'].'">
                <div style="display: flex;justify-content: space-between;">
                    <div class="left" style="display: flex;">
                        <div class="profile-img">
                            <img src="./assets/php/upload_images/profile/'.$adminUser['image'].'">
                        </div>
                        <div class="headercontent">
                            <h3>'.$adminUser['name'].'</h3>
                            <p>Admin</p>
                        </div>  
                    </div>
                    <div class="right">
                        <ion-icon name="close-outline" class="close-outline" id="'.$row['id'].'"></ion-icon>
                    </div>
                </div>
                <p >'.$row['content'].'</p>
            </div>
            ';
        }



    }
      



        if($user->readMessageemail($_SESSION['email'])){
        $messageemail = $user->readMessageemail($_SESSION['email']);
        $adminUser = $user->getadmin('admin');

        foreach($messageemail as $emailrow){

            $output .= '
            <div class="box" style="display:block;" ">
                <div style="display: flex;justify-content: space-between;">
                    <div class="left" style="display: flex;">
                        <div class="profile-img">
                            <img src="./assets/php/upload_images/profile/'.$adminUser['image'].'">
                        </div>
                        <div class="headercontent">
                            <h3>'.$adminUser['name'].'</h3>
                            <p>Admin</p>
                        </div>  
                    </div>
                    <div class="right messageId" id="3">
                        <ion-icon name="close-outline" class="close-outline" id='.$emailrow['id'].' ></ion-icon>
                    </div>
                </div>
                <p>'.$emailrow['content'].'</p>
                <div class="messageId" hidden>'.$emailrow['id'].'</div>
            </div>
            ';
        }



    }

        echo $output;


}


if(isset($_POST['action']) && $_POST['action'] == 'closebtnid'){

    $id = $user->test_input($_POST['message_id']);

    if($user->changeMessageAction($id, 0)){
        echo 'updated';
    }
}

if(isset($_POST['action']) && $_POST['action'] == 'getSession'){
    if(isset($_SESSION['email'])){
        $countall = $user->MessageCountall('all');
        $countemail = $user->MessageCountemail($_SESSION['email']);

        if($countall){
            echo 'has';
        }else if($countemail){
            echo 'has';
        }

    }else{
        echo 'no';
    }
}   


if(isset($_POST['action']) && $_POST['action'] == 'display_sample_add_image_01'){

  $row = $user->get_readTestingImages01(1);
  echo json_encode($row);
}



if(isset($_POST['action']) && $_POST['action'] == 'display_sample_add_image_02'){

  $row = $user->get_readTestingImages02(1);
  echo json_encode($row);
}


if(isset($_POST['action']) && $_POST['action'] == 'popular_brands'){

  $row = $user->get_readpopularbrands(1);
  echo json_encode($row);
}


if(isset($_POST['action']) && $_POST['action'] == 'search_result_add_images'){

  $row = $user->get_readsearchresultaddimages(1);
  echo json_encode($row);
}

if(isset($_FILES['index01img1']) || isset($_POST['index01img1_old'])){


    $index01img1old_img = $user->test_input($_POST['index01img1_old']);
  

    if($_FILES['index01img1']['name']){

        $target_dir = "upload_images/sample_ad_for_testing/";
        $test01_original_filename = basename($_FILES["index01img1"]["name"]);
        $extension1 = pathinfo($test01_original_filename, PATHINFO_EXTENSION);
        $testing01 = uniqid() . '.' . $extension1; // Generate a unique filename

        $test_image01 = $testing01;



      if($index01img1old_img != null){
        unlink("upload_images/sample_ad_for_testing/".$index01img1old_img);
      }
        }else{
          $test_image01 = $index01img1old_img;
        }

    if($user->update_index01img1($test_image01, 1)){
        move_uploaded_file($_FILES["index01img1"]["tmp_name"], "upload_images/sample_ad_for_testing/" . $test_image01);
        echo 'updated';
    }
}


if(isset($_FILES['index01img2']) || isset($_POST['index01img2_old'])){


  $index01img2old_img = $user->test_input($_POST['index01img2_old']);
  

    if($_FILES['index01img2']['name']){

        $target_dir = "upload_images/sample_ad_for_testing/";
        $test02_original_filename = basename($_FILES["index01img2"]["name"]);
        $extension2 = pathinfo($test02_original_filename, PATHINFO_EXTENSION);
        $testing02 = uniqid() . '.' . $extension2; // Generate a unique filename

        $test_image02 = $testing02;



      if($index01img2old_img != null){
        unlink("upload_images/sample_ad_for_testing/".$index01img2old_img);
      }
        }else{
          $test_image02 = $index01img2old_img;
        }

    if($user->update_index01img2($test_image02, 1)){
        move_uploaded_file($_FILES["index01img2"]["tmp_name"], "upload_images/sample_ad_for_testing/" . $test_image02);
        echo 'updated';
    }
}


if(isset($_FILES['index01img3']) || isset($_POST['index01img3_old'])){


  $index01img3old_img = $user->test_input($_POST['index01img3_old']);
  

    if($_FILES['index01img3']['name']){

        $target_dir = "upload_images/sample_ad_for_testing/";
        $test03_original_filename = basename($_FILES["index01img3"]["name"]);
        $extension3 = pathinfo($test03_original_filename, PATHINFO_EXTENSION);
        $testing03 = uniqid() . '.' . $extension3; // Generate a unique filename

        $test_image03 = $testing03;



      if($index01img3old_img != null){
        unlink("upload_images/sample_ad_for_testing/".$index01img3old_img);
      }
        }else{
          $test_image03 = $index01img3old_img;
        }

    if($user->update_index01img3($test_image03, 1)){
        move_uploaded_file($_FILES["index01img3"]["tmp_name"], "upload_images/sample_ad_for_testing/" . $test_image03);
        echo 'updated';
    }
}


if(isset($_FILES['index01img4']) || isset($_POST['index01img4_old'])){


  $index01img4old_img = $user->test_input($_POST['index01img4_old']);
  

    if($_FILES['index01img4']['name']){

        $target_dir = "upload_images/sample_ad_for_testing/";
        $test04_original_filename = basename($_FILES["index01img4"]["name"]);
        $extension4 = pathinfo($test04_original_filename, PATHINFO_EXTENSION);
        $testing04 = uniqid() . '.' . $extension4; // Generate a unique filename

        $test_image04 = $testing04;



      if($index01img4old_img != null){
        unlink("upload_images/sample_ad_for_testing/".$index01img4old_img);
      }
        }else{
          $test_image04 = $index01img4old_img;
        }

    if($user->update_index01img4($test_image04, 1)){
        move_uploaded_file($_FILES["index01img4"]["tmp_name"], "upload_images/sample_ad_for_testing/" . $test_image04);
        echo 'updated';
    }
}



// index 02 section 
if(isset($_FILES['index02img1']) || isset($_POST['index02img1_old'])){


    $index02img1old_img = $user->test_input($_POST['index02img1_old']);
  

    if($_FILES['index02img1']['name']){

        $target_dir = "upload_images/testing02/";
        $test01_original_filename = basename($_FILES["index02img1"]["name"]);
        $extension1 = pathinfo($test01_original_filename, PATHINFO_EXTENSION);
        $testing01 = uniqid() . '.' . $extension1; // Generate a unique filename

        $test_image01 = $testing01;



      if($index02img1old_img != null){
        unlink("upload_images/testing02/".$index02img1old_img);
      }
        }else{
          $test_image01 = $index02img1old_img;
        }

    if($user->update_index02img1($test_image01, 1)){
        move_uploaded_file($_FILES["index02img1"]["tmp_name"], "upload_images/testing02/" . $test_image01);
        echo 'updated';
    }
}


if(isset($_FILES['index02img2']) || isset($_POST['index02img2_old'])){


    $index02img2old_img = $user->test_input($_POST['index02img2_old']);
  

    if($_FILES['index02img2']['name']){

        $target_dir = "upload_images/testing02/";
        $test02_original_filename = basename($_FILES["index02img2"]["name"]);
        $extension2 = pathinfo($test02_original_filename, PATHINFO_EXTENSION);
        $testing02 = uniqid() . '.' . $extension2; // Generate a unique filename

        $test_image02 = $testing02;



      if($index02img2old_img != null){
        unlink("upload_images/testing02/".$index02img2old_img);
      }
        }else{
          $test_image02 = $index02img2old_img;
        }

    if($user->update_index02img2($test_image02, 1)){
        move_uploaded_file($_FILES["index02img2"]["tmp_name"], "upload_images/testing02/" . $test_image02);
        echo 'updated';
    }
}


if(isset($_FILES['index02img3']) || isset($_POST['index02img3_old'])){


    $index02img3old_img = $user->test_input($_POST['index02img3_old']);
  

    if($_FILES['index02img3']['name']){

        $target_dir = "upload_images/testing03/";
        $test03_original_filename = basename($_FILES["index02img3"]["name"]);
        $extension3 = pathinfo($test03_original_filename, PATHINFO_EXTENSION);
        $testing03 = uniqid() . '.' . $extension3; // Generate a unique filename

        $test_image03 = $testing03;



      if($index02img3old_img != null){
        unlink("upload_images/testing02/".$index02img3old_img);
      }
        }else{
          $test_image03 = $index02img3old_img;
        }

    if($user->update_index02img3($test_image03, 1)){
        move_uploaded_file($_FILES["index02img3"]["tmp_name"], "upload_images/testing02/" . $test_image03);
        echo 'updated';
    }
}


if(isset($_FILES['index02img4']) || isset($_POST['index02img4_old'])){


    $index02img4old_img = $user->test_input($_POST['index02img4_old']);
  

    if($_FILES['index02img4']['name']){

        $target_dir = "upload_images/testing03/";
        $test04_original_filename = basename($_FILES["index02img4"]["name"]);
        $extension4 = pathinfo($test04_original_filename, PATHINFO_EXTENSION);
        $testing04 = uniqid() . '.' . $extension4; // Generate a unique filename

        $test_image04 = $testing04;



      if($index02img4old_img != null){
        unlink("upload_images/testing02/".$index02img4old_img);
      }
        }else{
          $test_image04 = $index02img4old_img;
        }

    if($user->update_index02img4($test_image04, 1)){
        move_uploaded_file($_FILES["index02img4"]["tmp_name"], "upload_images/testing02/" . $test_image04);
        echo 'updated';
    }

}

// // index 03 section 
if(isset($_FILES['index03img1']) || isset($_POST['index03img1_old'])){


    $index03img1old_img = $user->test_input($_POST['index03img1_old']);
  

    if($_FILES['index03img1']['name']){

        $target_dir = "upload_images/popular_brands/";
        $test01_original_filename = basename($_FILES["index03img1"]["name"]);
        $extension1 = pathinfo($test01_original_filename, PATHINFO_EXTENSION);
        $testing01 = uniqid() . '.' . $extension1; // Generate a unique filename

        $test_image01 = $testing01;



      if($index03img1old_img != null){
        unlink("upload_images/popular_brands/".$index03img1old_img);
      }
        }else{
          $test_image01 = $index03img1old_img;
        }

    if($user->update_index03img1($test_image01, 1)){
        move_uploaded_file($_FILES["index03img1"]["tmp_name"], "upload_images/popular_brands/" . $test_image01);
        echo 'updated';
    }
}


// // index 03 section 02
if(isset($_FILES['index03img2']) || isset($_POST['index03img2_old'])){


    $index03img2old_img = $user->test_input($_POST['index03img2_old']);
  

    if($_FILES['index03img2']['name']){

        $target_dir = "upload_images/popular_brands/";
        $test02_original_filename = basename($_FILES["index03img2"]["name"]);
        $extension2 = pathinfo($test02_original_filename, PATHINFO_EXTENSION);
        $testing02 = uniqid() . '.' . $extension2; // Generate a unique filename

        $test_image02 = $testing02;



      if($index03img2old_img != null){
        unlink("upload_images/popular_brands/".$index03img2old_img);
      }
        }else{
          $test_image02 = $index03img2old_img;
        }

    if($user->update_index03img2($test_image02, 1)){
        move_uploaded_file($_FILES["index03img2"]["tmp_name"], "upload_images/popular_brands/" . $test_image02);
        echo 'updated';
    }
}


// // index 03 section 03
if(isset($_FILES['index03img3']) || isset($_POST['index03img3_old'])){


    $index03img3old_img = $user->test_input($_POST['index03img3_old']);
  

    if($_FILES['index03img3']['name']){

        $target_dir = "upload_images/popular_brands/";
        $test03_original_filename = basename($_FILES["index03img3"]["name"]);
        $extension3 = pathinfo($test03_original_filename, PATHINFO_EXTENSION);
        $testing03 = uniqid() . '.' . $extension3; // Generate a unique filename

        $test_image03 = $testing03;



      if($index03img3old_img != null){
        unlink("upload_images/popular_brands/".$index03img3old_img);
      }
        }else{
          $test_image03 = $index03img3old_img;
        }

    if($user->update_index03img3($test_image03, 1)){
        move_uploaded_file($_FILES["index03img3"]["tmp_name"], "upload_images/popular_brands/" . $test_image03);
        echo 'updated';
    }
}



// index 4 search result
if(isset($_FILES['index04img1']) || isset($_POST['index04img1_old'])){


    $index04img1old_img = $user->test_input($_POST['index04img1_old']);
  

    if($_FILES['index04img1']['name']){

        $target_dir = "upload_images/search_result_add/";
        $test01_original_filename = basename($_FILES["index04img1"]["name"]);
        $extension1 = pathinfo($test01_original_filename, PATHINFO_EXTENSION);
        $testing01 = uniqid() . '.' . $extension1; // Generate a unique filename

        $test_image01 = $testing01;



      if($index04img1old_img != null){
        unlink("upload_images/search_result_add/".$index04img1old_img);
      }
        }else{
          $test_image01 = $index04img1old_img;
        }

    if($user->update_index04img1($test_image01, 1)){
        move_uploaded_file($_FILES["index04img1"]["tmp_name"], "upload_images/search_result_add/" . $test_image01);
        echo 'updated';
    }
}

// index 4 search result
if(isset($_FILES['index04img2']) || isset($_POST['index04img2_old'])){


    $index04img2old_img = $user->test_input($_POST['index04img2_old']);
  

    if($_FILES['index04img2']['name']){

        $target_dir = "upload_images/search_result_add/";
        $test02_original_filename = basename($_FILES["index04img2"]["name"]);
        $extension2 = pathinfo($test02_original_filename, PATHINFO_EXTENSION);
        $testing02 = uniqid() . '.' . $extension2; // Generate a unique filename

        $test_image02 = $testing02;



      if($index04img2old_img != null){
        unlink("upload_images/search_result_add/".$index04img2old_img);
      }
        }else{
          $test_image02 = $index04img2old_img;
        }

    if($user->update_index04img2($test_image02, 1)){
        move_uploaded_file($_FILES["index04img2"]["tmp_name"], "upload_images/search_result_add/" . $test_image02);
        echo 'updated';
    }
}


// index 4 search result
if(isset($_FILES['index04img3']) || isset($_POST['index04img3_old'])){


    $index04img3old_img = $user->test_input($_POST['index04img3_old']);
  

    if($_FILES['index04img3']['name']){

        $target_dir = "upload_images/search_result_add/";
        $test03_original_filename = basename($_FILES["index04img3"]["name"]);
        $extension3 = pathinfo($test03_original_filename, PATHINFO_EXTENSION);
        $testing03 = uniqid() . '.' . $extension3; // Generate a unique filename

        $test_image03 = $testing03;



      if($index04img3old_img != null){
        unlink("upload_images/search_result_add/".$index04img3old_img);
      }
        }else{
          $test_image03 = $index04img3old_img;
        }

    if($user->update_index04img3($test_image03, 1)){
        move_uploaded_file($_FILES["index04img3"]["tmp_name"], "upload_images/search_result_add/" . $test_image03);
        echo 'updated';
    }
}


// index 4 search result
if(isset($_FILES['index04img4']) || isset($_POST['index04img4_old'])){


    $index04img4old_img = $user->test_input($_POST['index04img4_old']);
  

    if($_FILES['index04img4']['name']){

        $target_dir = "upload_images/search_result_add/";
        $test04_original_filename = basename($_FILES["index04img4"]["name"]);
        $extension4 = pathinfo($test04_original_filename, PATHINFO_EXTENSION);
        $testing04 = uniqid() . '.' . $extension4; // Generate a unique filename

        $test_image04 = $testing04;



      if($index04img4old_img != null){
        unlink("upload_images/search_result_add/".$index04img4old_img);
      }
        }else{
          $test_image04 = $index04img4old_img;
        }

    if($user->update_index04img4($test_image04, 1)){
        move_uploaded_file($_FILES["index04img4"]["tmp_name"], "upload_images/search_result_add/" . $test_image04);
        echo 'updated';
    }
}
?>