<?php
// https://github.com/artf/grapesjs/issues/2763
if (isset($_GET['id']) && $_GET['id'] != "") {
    $con = mysqli_connect("localhost", "root", "123456", "demo");
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        die();
    }
    $id = $_GET['id'];
    $result = mysqli_query($con, "SELECT * FROM `pages` WHERE  id=$id");
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_array($result);
        $assets = $row['assets'];
        $components = $row['components'];
        $css = $row['css'];
        $html = $row['html'];
        $styles = $row['styles'];
        response($id, $assets, $components, $css, $html, $styles);
        mysqli_close($con);
    }
}

function response($id, $assets, $components, $css, $html, $styles)
{
    header("Content-Type:application/json");
    $response['id'] = $id;
    $response['gjs-assets'] = $assets;
    $response['gjs-components'] = $components;
    $response['gjs-css'] = $css;
    $response['gjs-html'] = $html;
    $response['gjs-styles'] = $styles;

    $json_response = json_encode($response);
    echo $json_response;
}
