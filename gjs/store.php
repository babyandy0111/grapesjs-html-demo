<?php
header("Content-Type:application/json");
$con = mysqli_connect("localhost", "root", "123456", "demo");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    die();
}
$data = json_decode(file_get_contents("php://input"));
$assets = $data['gjs-assets'];
$components = $data['gjs-components'];
$css = $data['gjs-css'];
$html = $data['gjs-html'];
$styles = $data['gjs-style'];
if (isset($_POST['id']) && $_POST['id'] != "") {
    $result = mysqli_query($con, "UPDATE `pages`SET assets=$assets, components=$components, css=$css, html=$html, styles=$styles WHERE id=$id");
    mysqli_close($con);
} else {
    $result = mysqli_query($con, "INSERT INTO `pages` (assets, components, css, html, styles) VALUES ($assets, $components, $css, $html, $styles");
    mysqli_close($con);
}
response($id, $assets, $components, $css, $html, $styles);

function response($id, $assets, $components, $css, $html, $styles)
{
    $response['id'] = $id;
    $response['gjs-assets'] = $assets;
    $response['gjs-components'] = $components;
    $response['gjs-css'] = $css;
    $response['gjs-html'] = $html;
    $response['gjs-styles'] = $styles;

    $json_response = json_encode($response);
    echo $json_response;
}
