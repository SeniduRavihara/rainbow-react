<?php 
    require_once 'config.php';

    class Auth extends Database{
        
        // Register New User
        public function register($name, $email, $password, $gender, $profile_picture){
            $sql  = "INSERT INTO users (name, email, password, gender, image) VALUES (:name, :email, :password, :gender, :image)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['name'=>$name, 'email'=>$email, 'password'=>$password, 'gender' => $gender, 'image' => $profile_picture]);
            return true;
        }

        // Check if user already registered
        public function user_exist($email){
            $sql = "SELECT email FROM users WHERE email = :email";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['email' => $email]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result;
        }




        // Login Existing User
        public function login($email){
            $sql = "SELECT * FROM users WHERE email = :email AND deleted != 0";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['email'=> $email]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            return $row;
        }


        // add_sample_testing
        public function add_sample_testing($test_image01, $test_image02, $test_image03, $test_image04){
            $sql  = "INSERT INTO Sample_add_image_01 (test_image01, test_image02, test_image03, test_image04) VALUES (:test_image01, :test_image02, :test_image03, :test_image04)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image01'=>$test_image01, 'test_image02'=>$test_image02, 'test_image03'=>$test_image03, 'test_image04' => $test_image04]);
            return true;
        }

       // Fetch Sample Testing 01
        public function get_readTestingImages01($deleted){
            $sql = "SELECT * FROM sample_add_image_01  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['deleted' => $deleted]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result;
        }

        // add_sample_testing 02
        public function add_sample_testing02($test_image01, $test_image02, $test_image03, $test_image04){
            $sql  = "INSERT INTO Sample_add_image_02 (test_image01, test_image02, test_image03, test_image04) VALUES (:test_image01, :test_image02, :test_image03, :test_image04)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image01'=>$test_image01, 'test_image02'=>$test_image02, 'test_image03'=>$test_image03, 'test_image04' => $test_image04]);
            return true;
        }

       // Fetch Sample Testing 01
        public function get_readTestingImages02($deleted){
            $sql = "SELECT * FROM Sample_add_image_02  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['deleted' => $deleted]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result;
        }

        // add popular brands
        public function add_popularbrands($test_image01, $test_image02, $test_image03){
            $sql  = "INSERT INTO popular_brands (test_image01, test_image02, test_image03) VALUES (:test_image01, :test_image02, :test_image03)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image01'=>$test_image01, 'test_image02'=>$test_image02, 'test_image03'=>$test_image03]);
            return true;
        }

       // Fetch popular brands deleted = 1
        public function get_readpopularbrands($deleted){
            $sql = "SELECT * FROM popular_brands  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['deleted' => $deleted]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result;
        }

        // add create store
       //  public function addcreatestore($email, $title, $address, $mobile, $whatsapp_number, $logo, $storeimgCollection){
       //      $sql  = "INSERT INTO create_store (email, title, address, mobile, whatsap_number, logo, storeimgCollection) VALUES (:email, :title, :address, :mobile, :whatsap_number, :logo, :storeimgCollection )";
       //      $stmt = $this->conn->prepare($sql);
       //      $stmt->execute(['email'=>$email, 'title'=>$title, 'address'=>$address, 'mobile' => $mobile, 'whatsap_number' => $whatsapp_number, 'logo' => $logo, 'storeimgCollection' => $storeimgCollection]);
       //      return true;
       //  }

       // // Fetch popular brands deleted = 1
       //  public function get_createstore($deleted){
       //      $sql = "SELECT * FROM popular_brands  WHERE deleted = :deleted";
       //      $stmt = $this->conn->prepare($sql);
       //      $stmt->execute(['deleted' => $deleted]);
       //      $result = $stmt->fetch(PDO::FETCH_ASSOC);
       //      return $result;
       //  }


        // Add projects
        public function addcreatestore($email, $title, $address, $mobile, $whatsapp_number, $logo, $storeimgCollection, $tag){

            $get = $this->conn->prepare("SELECT * FROM `create_store` WHERE email = ?");
            $get->execute([$email]);
         
            if($get->rowCount() > 0){
                // return 'create store already exist!';
                return false;
            }else{
            $sql  = "INSERT INTO create_store (email, title, address, mobile, whatsap_number, logo, storeimgCollection, tag) VALUES (:email, :title, :address, :mobile, :whatsap_number, :logo, :storeimgCollection, :tag )";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['email'=>$email, 'title'=>$title, 'address'=>$address, 'mobile' => $mobile, 'whatsap_number' => $whatsapp_number, 'logo' => $logo, 'storeimgCollection' => $storeimgCollection, 'tag' => $tag]);
            return true;                

            }

        }

        // Fetch create store
        public function get_create_store($email){
            $sql = "SELECT * FROM create_store  WHERE email = :email";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['email' => $email]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result;
        }


         // Update Create Store action
        public function updatecreateaction($id, $action){
            $sql = "UPDATE create_store SET action = :action WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['action' => $action, 'id' => $id]);
            return true;
        }

        // Fetch All Note Of An User
        public function get_createstore_all($deleted){
            $sql = "SELECT * FROM create_store WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['deleted' => $deleted]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }

        // Check if rating already added
        public function getrowrating($email, $store_id){
            $sql = "SELECT * FROM rating WHERE email = :email AND store_id = :store_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['email' => $email, 'store_id' => $store_id]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result;
        }

        // add popular brands
        public function addrating($email, $comment, $rate, $name, $image, $store_id){
            $sql  = "INSERT INTO rating (email, comment, rate, name, image, store_id) VALUES (:email, :comment, :rate, :name, :image, :store_id)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['email'=>$email, 'comment'=>$comment, 'rate'=>$rate, 'name' => $name, 'image' => $image, 'store_id' => $store_id]);
            return true;
        }

        // Fetch All Rating
        public function get_allrating_id($store_id){
            $sql = "SELECT * FROM rating WHERE store_id = :store_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['store_id' => $store_id]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }

        // search data from create store
        public function searchdatafromcreatestore($location, $search_item){

            $get = $this->conn->prepare("SELECT * FROM `create_store` WHERE deleted = ?");
            $get->execute([1]);
         
            if($get->rowCount() > 0){
                $sql = "SELECT * FROM create_store WHERE address LIKE :location OR title LIKE :title OR tag LIKE :tag ";
                $stmt = $this->conn->prepare($sql);
                $stmt->execute(['location' => $location, 'title' => $search_item, 'tag' => $search_item]);
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $result;
            }else{
         

            }

        }

        // add search result add images
        public function add_searchresultaddimages($test_image01, $test_image02, $test_image03, $test_image04){
            $sql  = "INSERT INTO search_result_add_images  (test_image01, test_image02, test_image03, test_image04) VALUES (:test_image01, :test_image02, :test_image03, :test_image04)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image01'=>$test_image01, 'test_image02'=>$test_image02, 'test_image03'=>$test_image03, 'test_image04' => $test_image04]);
            return true;
        }

       // Fetch search result add images
        public function get_readsearchresultaddimages($deleted){
            $sql = "SELECT * FROM search_result_add_images   WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['deleted' => $deleted]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result;
        }

        // Fetch create store
        public function get_create_store_id($id){
            $sql = "SELECT * FROM create_store  WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['id' => $id]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result;
        }

        // get store rating count
        public function getstoreratingcount($store_id){
            $sql = "SELECT * FROM rating WHERE store_id = :store_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['store_id' => $store_id]);
            $result = $stmt->rowCount();
            return $result;
        }

        // Fetch All Note Of An User
        public function getalladdress($deleted){
            $sql = "SELECT * FROM create_store WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['deleted' => $deleted]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }


        // add message custom
        public function addMessageCustom($email,$content, $admin){
            $sql  = "INSERT INTO  message  (email, content, admin) VALUES (:email, :content, :admin)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['email'=>$email, 'content'=>$content, 'admin' => $admin]);
            return true;
        }

        // add message all
        public function addMessageAll($content, $admin){
            $sql  = "INSERT INTO  message  (content, admin) VALUES (:content, :admin)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['content'=>$content, 'admin' => $admin]);
            return true;
        }



        public function MessageCountemail($email){

            $get = $this->conn->prepare("SELECT * FROM `message` WHERE email = ? AND action = ?");
            $get->execute([$email, 1]);
         
            if($get->rowCount() > 0){
                return $get->rowCount();
            }

        }

        public function MessageCountall($email){

            $get = $this->conn->prepare("SELECT * FROM `message` WHERE email = ? AND action = ?");
            $get->execute([$email, 1]);
         
            if($get->rowCount() > 0){
                return $get->rowCount();
            }

        }

        public function readMessageall($email){
            $sql = "SELECT * FROM message WHERE email = :email AND action = :action";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['email' => $email, 'action' => 1]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }

        public function readMessageemail($email){
            $sql = "SELECT * FROM message WHERE email = :email AND action = :action";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['email' => $email, 'action' => 1]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }

        public function getadmin($admin){
            $sql = "SELECT * FROM users WHERE action = :admin";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['admin' => $admin]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result;            
        }

        public function changeMessageAction($id, $action){
            $sql = "UPDATE message SET action = :action WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['action' => $action, 'id' => $id]);
            return true;
        }

        // Fetch All Note Of An User
        public function getAllUserEmail($deleted){
            $sql = "SELECT * FROM users WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['deleted' => $deleted]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }

         // Update Create Store action
        public function update_index01img1($img, $deleted){
            $sql = "UPDATE sample_add_image_01 SET test_image01  = :test_image01  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image01' => $img, 'deleted' => $deleted]);
            return true;
        }

                 // Update Create Store action
        public function update_index01img2($img, $deleted){
            $sql = "UPDATE sample_add_image_01 SET test_image02  = :test_image02  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image02' => $img, 'deleted' => $deleted]);
            return true;
        }

                         // Update Create Store action
        public function update_index01img3($img, $deleted){
            $sql = "UPDATE sample_add_image_01 SET test_image03  = :test_image03  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image03' => $img, 'deleted' => $deleted]);
            return true;
        }

                         // Update Create Store action
        public function update_index01img4($img, $deleted){
            $sql = "UPDATE sample_add_image_01 SET test_image04  = :test_image04  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image04' => $img, 'deleted' => $deleted]);
            return true;
        }


        public function update_index02img1($img, $deleted){
            $sql = "UPDATE sample_add_image_02 SET test_image01  = :test_image01  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image01' => $img, 'deleted' => $deleted]);
            return true;
        }

         public function update_index02img2($img, $deleted){
            $sql = "UPDATE sample_add_image_02 SET test_image02  = :test_image02  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image02' => $img, 'deleted' => $deleted]);
            return true;
        }

                         // Update Create Store action
        public function update_index02img3($img, $deleted){
            $sql = "UPDATE sample_add_image_02 SET test_image03  = :test_image03  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image03' => $img, 'deleted' => $deleted]);
            return true;
        }

                         // Update Create Store action
        public function update_index02img4($img, $deleted){
            $sql = "UPDATE sample_add_image_02 SET test_image04  = :test_image04  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image04' => $img, 'deleted' => $deleted]);
            return true;
        }

        public function update_index03img1($img, $deleted){
            $sql = "UPDATE popular_brands  SET test_image01  = :test_image01  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image01' => $img, 'deleted' => $deleted]);
            return true;
        }


        public function update_index03img2($img, $deleted){
            $sql = "UPDATE popular_brands  SET test_image02  = :test_image02  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image02' => $img, 'deleted' => $deleted]);
            return true;
        }

        public function update_index03img3($img, $deleted){
            $sql = "UPDATE popular_brands  SET test_image03  = :test_image03  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image03' => $img, 'deleted' => $deleted]);
            return true;
        }

        public function update_index04img1($img, $deleted){
            $sql = "UPDATE search_result_add_images   SET test_image01  = :test_image01  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image01' => $img, 'deleted' => $deleted]);
            return true;
        }

                public function update_index04img2($img, $deleted){
            $sql = "UPDATE search_result_add_images   SET test_image02  = :test_image02  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image02' => $img, 'deleted' => $deleted]);
            return true;
        }

                public function update_index04img3($img, $deleted){
            $sql = "UPDATE search_result_add_images   SET test_image03  = :test_image03  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image03' => $img, 'deleted' => $deleted]);
            return true;
        }

                public function update_index04img4($img, $deleted){
            $sql = "UPDATE search_result_add_images   SET test_image04  = :test_image04  WHERE deleted = :deleted";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['test_image04' => $img, 'deleted' => $deleted]);
            return true;
        }
    }
?>