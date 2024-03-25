// // Function to update image preview
// function previewImage(input) {
//     var preview = document.getElementById('previewImage');
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//                 reader.onload = function (e) {
//             preview.style.backgroundImage = 'url(' + e.target.result + ')';
//         };
//         reader.readAsDataURL(input.files[0]);
//     }
// }

// // Attach the previewImage function to the change event of the file input
// document.querySelector('input[name="logo"]').addEventListener('change', function () {
//     document.getElementById('logo-add-buttonasd').style.display = "none";
//     document.getElementById('previewImage').style.display = "block";
//     previewImage(this);
// });

// function photoadddivbt (){
//   // document.getElementById('storeinputlogo').click();
//   console.log(7)
// }





// Create Store input image 1
    let storebuttonimages1 = document.getElementById('storebuttonimages1');
    let storeinputimages1 = document.getElementById('storeinputimages1');

    let storefile1;

    storebuttonimages1.onclick = () => {
      storeinputimages1.click();
    }

    // when browser
    storeinputimages1.addEventListener('change', function(){
      storefile1 = this.files[0];
      displaystoreimages1();
    })

    function displaystoreimages1(){
      let createstorefileType1 = storefile1.type;
    //   console.log(fileType)

      let validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

      if(validExtensions.includes(createstorefileType1)){
        let createstorefileReader1 = new FileReader();

        createstorefileReader1.onload = () => {
          let createstorefileURL = createstorefileReader1.result;
          let createstoreimgTag1 = `<img src="${createstorefileURL}" alt="">`;
          document.getElementById('createstoreimg1').innerHTML = createstoreimgTag1;
          // document.querySelector('.upload-content').classList.add('.otherimgareasmall')
          // document.querySelector('.swiper-slide img').style.width = '300px'
          // document.querySelector('.upload-content .img-area').style.height = 'auto'
          // document.querySelector('.upload-content .img-area').style.border = 'none'
          // document.getElementById("input-btn").innerHTML = "Change file";
        };
        createstorefileReader1.readAsDataURL(storefile1);
      }
    }

// Create Store input image 2
    let storebuttonimages2 = document.getElementById('storebuttonimages2');
    let storeinputimages2 = document.getElementById('storeinputimages2');

    let storefile2;

    storebuttonimages2.onclick = () => {
      storeinputimages2.click();
    }

    // when browser
    storeinputimages2.addEventListener('change', function(){
      storefile2 = this.files[0];
      displaystoreimages2();
    })

    function displaystoreimages2(){
      let createstorefileType2 = storefile2.type;
    //   console.log(fileType)

      let validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

      if(validExtensions.includes(createstorefileType2)){
        let createstorefileReader2 = new FileReader();

        createstorefileReader2.onload = () => {
          let createstorefileURL2 = createstorefileReader2.result;
          let createstoreimgTag2 = `<img src="${createstorefileURL2}" alt="">`;
          document.getElementById('createstoreimg2').innerHTML = createstoreimgTag2;
          // document.querySelector('.upload-content').classList.add('.otherimgareasmall')
          // document.querySelector('.swiper-slide img').style.width = '300px'
          // document.querySelector('.upload-content .img-area').style.height = 'auto'
          // document.querySelector('.upload-content .img-area').style.border = 'none'
          // document.getElementById("input-btn").innerHTML = "Change file";
        };
        createstorefileReader2.readAsDataURL(storefile2);
      }
    }


// Create Store input image 3
    let storebuttonimages3 = document.getElementById('storebuttonimages3');
    let storeinputimages3 = document.getElementById('storeinputimages3');

    let storefile3;

    storebuttonimages3.onclick = () => {
      storeinputimages3.click();
    }

    // when browser
    storeinputimages3.addEventListener('change', function(){
      storefile3 = this.files[0];
      displaystoreimages3();
    })

    function displaystoreimages3(){
      let createstorefileType3 = storefile3.type;
    //   console.log(fileType)

      let validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

      if(validExtensions.includes(createstorefileType3)){
        let createstorefileReader3 = new FileReader();

        createstorefileReader3.onload = () => {
          let createstorefileURL3 = createstorefileReader3.result;
          let createstoreimgTag3 = `<img src="${createstorefileURL3}" alt="">`;
          document.getElementById('createstoreimg3').innerHTML = createstoreimgTag3;
          // document.querySelector('.upload-content').classList.add('.otherimgareasmall')
          // document.querySelector('.swiper-slide img').style.width = '300px'
          // document.querySelector('.upload-content .img-area').style.height = 'auto'
          // document.querySelector('.upload-content .img-area').style.border = 'none'
          // document.getElementById("input-btn").innerHTML = "Change file";
        };
        createstorefileReader3.readAsDataURL(storefile3);
      }
    }

// Create Store input image 4
    let storebuttonimages4 = document.getElementById('storebuttonimages4');
    let storeinputimages4 = document.getElementById('storeinputimages4');

    let storefile4;

    storebuttonimages4.onclick = () => {
      storeinputimages4.click();
    }

    // when browser
    storeinputimages4.addEventListener('change', function(){
      storefile4 = this.files[0];
      displaystoreimages4();
    })

    function displaystoreimages4(){
      let createstorefileType4 = storefile4.type;
    //   console.log(fileType)

      let validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

      if(validExtensions.includes(createstorefileType4)){
        let createstorefileReader4 = new FileReader();

        createstorefileReader4.onload = () => {
          let createstorefileURL4 = createstorefileReader4.result;
          let createstoreimgTag4 = `<img src="${createstorefileURL4}" alt="">`;
          document.getElementById('createstoreimg4').innerHTML = createstoreimgTag4;
          // document.querySelector('.upload-content').classList.add('.otherimgareasmall')
          // document.querySelector('.swiper-slide img').style.width = '300px'
          // document.querySelector('.upload-content .img-area').style.height = 'auto'
          // document.querySelector('.upload-content .img-area').style.border = 'none'
          // document.getElementById("input-btn").innerHTML = "Change file";
        };
        createstorefileReader4.readAsDataURL(storefile4);
      }
    }

// Create Store input image 2
    let storebuttonimages5 = document.getElementById('storebuttonimages5');
    let storeinputimages5 = document.getElementById('storeinputimages5');

    let storefile5;

    storebuttonimages5.onclick = () => {
      storeinputimages5.click();
    }

    // when browser
    storeinputimages5.addEventListener('change', function(){
      storefile5 = this.files[0];
      displaystoreimages5();
    })

    function displaystoreimages5(){
      let createstorefileType5 = storefile5.type;
    //   console.log(fileType)

      let validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

      if(validExtensions.includes(createstorefileType5)){
        let createstorefileReader5 = new FileReader();

        createstorefileReader5.onload = () => {
          let createstorefileURL5 = createstorefileReader5.result;
          let createstoreimgTag5 = `<img src="${createstorefileURL5}" alt="">`;
          document.getElementById('createstoreimg5').innerHTML = createstoreimgTag5;
          // document.querySelector('.upload-content').classList.add('.otherimgareasmall')
          // document.querySelector('.swiper-slide img').style.width = '300px'
          // document.querySelector('.upload-content .img-area').style.height = 'auto'
          // document.querySelector('.upload-content .img-area').style.border = 'none'
          // document.getElementById("input-btn").innerHTML = "Change file";
        };
        createstorefileReader5.readAsDataURL(storefile5);
      }
    }


// Create Store input image 6
    let storebuttonimages6 = document.getElementById('storebuttonimages6');
    let storeinputimages6 = document.getElementById('storeinputimages6');

    let storefile6;

    storebuttonimages6.onclick = () => {
      storeinputimages6.click();
    }

    // when browser
    storeinputimages6.addEventListener('change', function(){
      storefile6= this.files[0];
      displaystoreimages6();
    })

    function displaystoreimages6(){
      let createstorefileType6 = storefile6.type;
    //   console.log(fileType)

      let validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

      if(validExtensions.includes(createstorefileType6)){
        let createstorefileReader6 = new FileReader();

        createstorefileReader6.onload = () => {
          let createstorefileURL6 = createstorefileReader6.result;
          let createstoreimgTag6 = `<img src="${createstorefileURL6}" alt="">`;
          document.getElementById('createstoreimg6').innerHTML = createstoreimgTag6;
          // document.querySelector('.upload-content').classList.add('.otherimgareasmall')
          // document.querySelector('.swiper-slide img').style.width = '300px'
          // document.querySelector('.upload-content .img-area').style.height = 'auto'
          // document.querySelector('.upload-content .img-area').style.border = 'none'
          // document.getElementById("input-btn").innerHTML = "Change file";
        };
        createstorefileReader6.readAsDataURL(storefile6);
      }
    }

// Create Store input image 6
    let storebuttonimages7 = document.getElementById('storebuttonimages7');
    let storeinputimages7 = document.getElementById('storeinputimages7');

    let storefile7;

    storebuttonimages7.onclick = () => {
      storeinputimages7.click();
    }

    // when browser
    storeinputimages7.addEventListener('change', function(){
      storefile7 = this.files[0];
      displaystoreimages7();
    })

    function displaystoreimages7(){
      let createstorefileType7 = storefile7.type;
    //   console.log(fileType)

      let validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

      if(validExtensions.includes(createstorefileType7)){
        let createstorefileReader7 = new FileReader();

        createstorefileReader7.onload = () => {
          let createstorefileURL7 = createstorefileReader7.result;
          let createstoreimgTag7 = `<img src="${createstorefileURL7}" alt="">`;
          document.getElementById('createstoreimg7').innerHTML = createstoreimgTag7;
          // document.querySelector('.upload-content').classList.add('.otherimgareasmall')
          // document.querySelector('.swiper-slide img').style.width = '300px'
          // document.querySelector('.upload-content .img-area').style.height = 'auto'
          // document.querySelector('.upload-content .img-area').style.border = 'none'
          // document.getElementById("input-btn").innerHTML = "Change file";
        };
        createstorefileReader7.readAsDataURL(storefile7);
      }
    }
