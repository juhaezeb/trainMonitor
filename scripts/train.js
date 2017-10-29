function getTrains(){
    setOverlay(true);
}

function setOverlay(bool){
    if(bool){
        document.getElementById("overlay").style.display = "block";
        document.getElementById("overlay-window").style.display = "block";
    } else {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("overlay-window").style.display = "none";
    }
}