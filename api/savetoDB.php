<?php

// Getting the contents from request
    $json = file_get_contents('php://input');

    // decode the recieved JSON and store it inside $object variable
    $object = json_decode($json, true);

    $visitedPlace = $object['visitedPlaces'];

    // return our Data
    echo json_encode($object)


?>