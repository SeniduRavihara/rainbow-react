/*

*/
let names = [
  'Vaddukoddai',
  'Badulla',
  'Matara',
  'Puttalam',
  'Chavakachcheri',
  'Kattankudy',
    'Matale',
  'Dambulla',
  'Kalutara',
  'Mannar',
  'Panadura',
  'Beruwala',
    'Ja-Ela',
  'Point Pedro',
  'Kelaniya',
  'Peliyagoda',
  'Kurunegala',
  'Wattala',
  'Gampola',
  'Nuwara Eliya',
  'Valvettithurai',
  'Chilaw',
  'Eravur',
  'Avissawella',
    'Weligama',
  'Ambalangoda',
  'Ampara',
  'Kegalle',
  'Hatton',
  'Nawalapitiya',
    'Balangoda',
  'Hambantota',
  'Tangalle',
  'Monaragala',
  'Gampaha',
  'Horana',
    'Wattegama',
  'Minuwangoda',
  'Bandarawela',
  'Kuliyapitiya',
  'Haputale',
    'Akmeemana',
  'Ambalanthota',
  'Alayadiwembu',
  'Ambalangoda',
  'Akurana',
  'Ambagamuwa',


  


];
//Sort names in ascending order
let sortedNames = names.sort();

//reference
let input = document.getElementById("location-searchbarid");

//Execute function on keyup
input.addEventListener("keyup", (e) => {
  //loop through above array
  //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
  removeElements();
  for (let i of sortedNames) {
    //convert input to lowercase and compare with each string

    if (
      i.toLowerCase().startsWith(input.value.toLowerCase()) &&
      input.value != ""
    ) {
      //create li element
      let listItem = document.createElement("li");
      //One common class name
      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.setAttribute("onclick", "displayNames('" + i + "')");
      //Display matched part in bold
      let word = "<b>" + i.substr(0, input.value.length) + "</b>";
      word += i.substr(input.value.length);
      //display the value in array
      listItem.innerHTML = word;
      document.querySelector(".list").appendChild(listItem);
    }
  }
});

function displayNames(value) {
  input.value = value;
  removeElements();
}
function removeElements() {
  //clear all the item
  let items = document.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
  });
}


// Speech Search Items
click_to_record.addEventListener('click',function(){
    var speech = true;

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

        document.getElementById("item-searchbarsda").value = transcript;
        console.log(transcript);
    });
    
    if (speech == true) {
        recognition.start();
    }
})


// close location
var locationCloseIcon = document.getElementById('close-icon-loactionada');
var locationList = document.getElementById('locationList');
locationCloseIcon.addEventListener('click', function(){
  removeElements()
  console.log('not remove')
})

