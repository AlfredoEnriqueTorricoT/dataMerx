<?php
    include_once 'vendor\autoload.php';
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');


use \App\controller\ApiUsuario;
use \App\controller\ApiUser;
use \App\controller\ApiProyecto;
use \App\controller\ApiMarkModem;
use \App\controller\ApiPlatform;
use \App\controller\ApiSim;
use \App\controller\ApiDevice;
use \App\controller\ApiClient;
use \App\controller\ApiCar;

    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $controller = "user";
    $operacion = 'selectAll';
    
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $controller = $data->controller;
        $operacion = $data->operacion;
    }
   
    $objUser = new ApiUser();
    $objMarkModem = new ApiMarkModem();
    $objPlatform = new ApiPlatform();
    $objSim = new ApiSim();
    $objDevice = new ApiDevice();
    $objClient = new ApiClient();
    $objCar = new ApiCar();

switch ($controller) {
            case "user":
                switch ($operacion) {
                    case "selectAll":
                        $objUser::selectAll();
                        break;
                    case "selectById":
                        $objUser::selectById(1);
                        break;
                    case "insert":
                        $objUser::insert();
                        break;
                    case "update":
                        $objUser::update();
                        break;
                    case "login":
                        $objUser::login();
                        break;
                }
            break;
            case "markModem":
                switch ($operacion) {
                    case "selectAll":
                        $objMarkModem::selectAll();
                        break;
                }
            break;
            case "platform":
                switch ($operacion) {
                    case "selectAll":
                        $objPlatform::selectAll();
                        break;
                }
            break;
            case "sim":
                switch ($operacion) {
                    case "selectAll":
                        $objSim::selectAll();
                        break;
                    case "selectDisponible":
                        $objSim::selectSimDisponible();
                        break;
                    case "insert":
                        $objSim::insert();
                        break;
                    case "update":
                        $objSim::update();
                        break;
                }
            break;
            case "device":
                switch ($operacion) {
                    case "selectAll":
                        $objDevice::selectAll();
                        break;
                    case "selectDisponible":
                        $objDevice::selectAllDisponible();
                        break;
                    case "retirar":
                        $objDevice::retirarSim();
                        break;
                    case "insert":
                        $objDevice::insert();
                        break;
                    case "addDeviceToSim":
                        echo "index";
                        $objDevice::addSimToDevice();
                        break;
                    case "update":
                        $objDevice::update();
                        break;
                }
            break;
            case "client":
                switch ($operacion) {
                    case "selectAll":
                        $objClient::selectAll();
                        break;
                    case "insert":
                        $objClient::insert();
                        break;
                    case "update":
                        $objClient::update();
                        break;
        
                }
            break;
            case "car":
                switch ($operacion) {
                    case "selectAll":
                        $objCar::selectAll();
                        break;
                    case "insert":
                        $objCar::insert();
                        break;
                    case "update":
                        $objCar::update();
                        break;
        
                }
            break;
            case "imagen":
                switch ($operacion) {
                    case "selectAll":
                        $objImagen::selectAll();
                        break;
                    case "selectAllXTamano":
                        $tamaño = $_REQUEST['tamano'];
                        $objImagen::selectAllXtamano($tamaño);
                        break;
                }
            break;
          
        }

?>