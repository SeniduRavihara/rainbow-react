var advertisediv1 = document.getElementById("advertise-div1");
var advertisediv2 = document.getElementById("advertise-div2");
var advertisediv3 = document.getElementById("advertise-div3");
var advertisediv4 = document.getElementById("advertise-div4");

function advsetwo() {
    advertisediv1.style.width = "350px";
    advertisediv2.style.width = "750px";
    advertisediv3.style.width = "350px";
}

function advseone() {
    advertisediv1.style.width = "750px";
    advertisediv2.style.width = "350px";
    advertisediv3.style.width = "350px";
}

function advsethree() {
    advertisediv1.style.width = "350px";
    advertisediv3.style.width = "750px";
    advertisediv2.style.width = "350px";
    advertisediv4.style.width = "350px";
}

function advsefour() {
    advertisediv1.style.width = "350px";
    advertisediv3.style.width = "350px";
    advertisediv2.style.width = "350px";
    advertisediv4.style.width = "750px";
}

var searchbarInput = document.querySelector('.item-searchbar');
var locationInput = document.querySelector('.location-search');
var iconbtseachbar = document.getElementById("icon-bt-seachbar");
var closeiconsearchbar = document.getElementById("close-icon-searchbar");
var closeiconloactionada = document.getElementById("close-icon-loactionada");

// Add event listeners
searchbarInput.addEventListener('input', keypressSearchBar);
searchbarInput.addEventListener('input', keyRemoveSearchBar);

locationInput.addEventListener('input', keypressLocationBar);
locationInput.addEventListener('input', keyRemoveLocationBar);

// Event handler functions for search bar
function keypressSearchBar() {
    if (window.innerWidth <= 1500) {
        iconbtseachbar.style.marginLeft = "210px";
        closeiconsearchbar.style.display = "block";
    } else {
        iconbtseachbar.style.marginLeft = "345px";
        closeiconsearchbar.style.display = "block";
    }
}

function keyRemoveSearchBar() {
    var inputValue = searchbarInput.value;
    if (inputValue === "") {
        if (window.innerWidth <= 1500) {
            iconbtseachbar.style.marginLeft = "249px";
            closeiconsearchbar.style.display = "none";
        } else {
            iconbtseachbar.style.marginLeft = "384px";
            closeiconsearchbar.style.display = "none";
        }
    }
}

function closeiconsearchbarclick() {
    document.getElementById("item-searchbarsda").value = "";
    if (window.innerWidth <= 1500) {
        iconbtseachbar.style.marginLeft = "249px";
        closeiconsearchbar.style.display = "none";
    } else {
        iconbtseachbar.style.marginLeft = "384px";
        closeiconsearchbar.style.display = "none";
    }
    document.getElementById("item-searchbarsda").focus();
}

// Event handler functions for location input
function closeiconloactionadaclick() {
    closeiconloactionada.style.display = "none";
    document.getElementById("location-searchbarid").value = "";
    document.getElementById("location-searchbarid").focus();
}

function keypressLocationBar() {
    closeiconloactionada.style.display = "block";
}

function keyRemoveLocationBar() {
    var inputValue = locationInput.value;
    if (inputValue === "") {
        closeiconloactionada.style.display = "none";
    }
}
