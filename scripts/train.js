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

function querySelectedTrains(){
    from = $("#fromStation").val();
    to = $("#toStation").val();
    rawtime = $("#timeSelect").val();
    time =  rawtime.substring(0,2) + rawtime.substring(3,5);

    $.ajax({
    type: "GET",
    url: "https://api.irail.be/connections/",
    data:{
        from: from,
        to: to,
        time: time,
        format: "json"
    },
    dataType: "json",
    success: printSelectedTrains,
    error: function(req, e, httpe){
        alert(e+"\n"+httpe);
    }
    });
}

function printSelectedTrains(query){
    //alert(typeof(query));
    connections = query["connection"];
    $("#trainSelectResult").html="";
    $("#trainSelectResult").append(
        $(document.createElement("table"))
        .addClass("selectedTrainResult")
    );
    for(i = 0;i<connections.length;i++){
        $(".selectedTrainResult").append(
            $(document.createElement("tr")).append(
                $(document.createElement("td")).html(
                    connections[i].departure.stationinfo.id
                )
            )
        );
    }
}
