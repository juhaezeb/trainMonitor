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

    /*DEBUG*/
    from="Antwerpen-Berchem";
    to="Gent-Sint-Pieters";
    time="1600";

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

function secondsToHm(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? ("0"+h).slice(-2) : "00";
    var mDisplay = m > 0 ? ("0"+m).slice(-2) : "00";
    /*var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";*/
    return hDisplay +":"+ mDisplay; 
}

function printSelectedTrains(query){
    //alert(typeof(query));
    connections = query["connection"];
    $("table.selectedTrainResult tbody").empty();
    $("#trainSelectResult").show();
    for(i = 0;i<connections.length;i++){
        departDate = new Date(connections[i].departure.time*1000);
        arriveDate = new Date(connections[i].arrival.time*1000);
        $(".selectedTrainResult").append(
            $(document.createElement("tr")).append(
                [
                    $(document.createElement("td")).html(
                        connections[i].departure.stationinfo.standardname
                        + "<br>" +
                        departDate.getHours()+":"+departDate.getMinutes()
                    ),
                    $(document.createElement("td")).html(
                        connections[i].arrival.stationinfo.standardname
                        + "<br>" +
                        arriveDate.getHours()+":"+('0'+arriveDate.getMinutes()).slice(-2)
                    ),
                    $(document.createElement("td")).html(
                        secondsToHm(connections[i].duration)
                    ).css('text-align','center'),
                    $(document.createElement("td")).html(
                        connections[i].departure.vehicle.split(".").slice(-1)
                    )
                ]
            ).addClass("trainEntry")
            .click(function(){
                    trainIDs.push(connections[i].departure.vehicle);
                    fillSidePanel();
                }
            )
        );
    }
}
