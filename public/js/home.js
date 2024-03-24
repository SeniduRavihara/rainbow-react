
  // index 01 img 1
      let button = document.getElementById('index1imgbutton1');
      let input = document.getElementById('index1img1input');

      let file;



      button.onclick = () => {
        input.click();
      }

      // when browser
      input.addEventListener('change', function(){
        file = this.files[0];
        displayFile();
      })


      function displayFile(){
        let fileType = file.type;
        // console.log(fileType)

        let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

        if(validExtensions.includes(fileType)){
          let fileReader = new FileReader();

          fileReader.onload = () => {
            let fileURL = fileReader.result;
            // console.log(fileURL)
            let imgTag = `<img class="card-img-top" src="${fileURL}" alt="Card image cap">`;
            document.querySelector('.index1img1').innerHTML = imgTag;
          };
          fileReader.readAsDataURL(file);
        }
      }


  // index 01 img 2
      let button2 = document.getElementById('index1imgbutton2');
      let input2 = document.getElementById('index1img2input');

      let file2;



      button2.onclick = () => {
        input2.click();
      }

      // when browser
      input2.addEventListener('change', function(){
        file2 = this.files[0];
        displayFile2();
      })


      function displayFile2(){
        let fileType2 = file2.type;
        // console.log(fileType)

        let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

        if(validExtensions.includes(fileType2)){
          let fileReader = new FileReader();

          fileReader.onload = () => {
            let fileURL = fileReader.result;
            // console.log(fileURL)
            let imgTag = `<img class="card-img-top" src="${fileURL}" alt="Card image cap">`;
            document.querySelector('.index1img2').innerHTML = imgTag;
          };
          fileReader.readAsDataURL(file2);
        }
      }



  // index 01 img 3
      let button3 = document.getElementById('index1imgbutton3');
      let input3 = document.getElementById('index1img3input');

      let file3;



      button3.onclick = () => {
        input3.click();
      }

      // when browser
      input3.addEventListener('change', function(){
        file3 = this.files[0];
        displayFile3();
      })


      function displayFile3(){
        let fileType3 = file3.type;
        // console.log(fileType)

        let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

        if(validExtensions.includes(fileType3)){
          let fileReader = new FileReader();

          fileReader.onload = () => {
            let fileURL = fileReader.result;
            // console.log(fileURL)
            let imgTag = `<img class="card-img-top" src="${fileURL}" alt="Card image cap">`;
            document.querySelector('.index1img3').innerHTML = imgTag;
          };
          fileReader.readAsDataURL(file3);
        }
      }

  // index 01 img 4
      let button4 = document.getElementById('index1imgbutton4');
      let input4 = document.getElementById('index1img4input');

      let file4;



      button4.onclick = () => {
        input4.click();
      }

      // when browser
      input4.addEventListener('change', function(){
        file4 = this.files[0];
        displayFile4();
      })


      function displayFile4(){
        let fileType4 = file4.type;
        // console.log(fileType)

        let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

        if(validExtensions.includes(fileType4)){
          let fileReader = new FileReader();

          fileReader.onload = () => {
            let fileURL = fileReader.result;
            // console.log(fileURL)
            let imgTag = `<img class="card-img-top" src="${fileURL}" alt="Card image cap">`;
            document.querySelector('.index1img4').innerHTML = imgTag;
          };
          fileReader.readAsDataURL(file4);
        }
      }


// index 02 section 

  // index 02 img 1
      let button0201 = document.getElementById('index2imgbutton1');
      let input0201 = document.getElementById('index2img1input');

      let file0201;



      button0201.onclick = () => {
        input0201.click();
      }

      // when browser
      input0201.addEventListener('change', function(){
        file0201 = this.files[0];
        displayFile0201();
      })


      function displayFile0201(){
        let fileType = file0201.type;
        // console.log(fileType)

        let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

        if(validExtensions.includes(fileType)){
          let fileReader = new FileReader();

          fileReader.onload = () => {
            let fileURL0201 = fileReader.result;
            // console.log(fileURL)
            let imgTag0201 = `<img class="card-img-top" src="${fileURL0201}" alt="Card image cap">`;
            document.querySelector('.index2img1').innerHTML = imgTag0201;
          };
          fileReader.readAsDataURL(file0201);
        }
      }



