<?php

if(isset($_POST["keyword"])) {
    $_POST["keyword"] = strtolower($_POST["keyword"]);
    $file = fopen('stations.json',"r") or die("Unable to read stations");
    $stations = json_decode(fread($file,filesize('stations.json')),true)["station"];
    /*$json = json_decode(fread($file,filesize('stations.json')),true);
    $stations = $json["station"];*/
    fclose($file);

    $result = array();
    foreach($stations as $station){
        if(preg_match("/".$_POST["keyword"]."/",strtolower($station["standardname"]))){
            $result[$station["id"]] = $station["standardname"];
        }
        if(count($result) > 4){
            break;
        }
    }

    if(!empty($result)) {
        echo '<ul id="station-list">';
        foreach($result as $id => $name) {
            echo '<li onClick="selectStation(\'';
            echo $name;
            echo '\');">';
            echo $name;
            echo '</li>';
        
        }
        echo "</ul>\n";
    }
}
?>