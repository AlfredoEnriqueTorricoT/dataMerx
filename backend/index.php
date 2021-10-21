<?php
    include_once 'vendor\autoload.php';
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

    include_once "./src/controller/ApiUser.php";
    include_once "./src/controller/ApiMarkModem.php";
    include_once "./src/controller/ApiPlatform.php";
    include_once "./src/controller/ApiSim.php";
    include_once "./src/controller/ApiDevice.php";
    include_once "./src/controller/ApiClient.php";
    include_once "./src/controller/ApiCar.php";
    include_once "./src/controller/ApiEvent.php";
    include_once "./src/controller/ApiTypeEvent.php";

    use \App\controller\ApiUsuario;
    use \API\ApiUser;
    use \API\ApiMarkModem;
    use \API\ApiPlatform;
    use \API\ApiSim;
    use \API\ApiDevice;
    use \API\ApiClient;
    use \API\ApiCar;
    use \API\ApiEvent;
    use \API\ApiTypeEvent;

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
    $objEvent = new ApiEvent();
    $objTypeEvent = new ApiTypeEvent();

    
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
                    case "selectById":
                        $objSim::selectById();
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
                    case "selectById":
                        $objDevice::selectById();
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
                    case "selectById":
                        $objCar::selectById();
                        break;
                    case "insert":
                        $objCar::insert();
                        break;
                    case "addDeviceToCar":
                        $objCar::addDeviceToCar();
                        break;
                    case "update":
                        $objCar::update();
                        break;
                    case "retirar":
                        $objCar::retirarCar();
                        break;
                }
            break;
            case "event":
                switch ($operacion) {
                    case "selectAll":
                        $objEvent::selectAll();
                        break;
                    case "selectAllByElement":
                        $objEvent::selectAllByElement();
                        break;
                    case "insert":
                        $objEvent::insert();
                        break;
                    case "update":
                        $objEvent::update();
                        break;
                }
            break;
            case "typeEvent":
                switch ($operacion) {
                    case "selectAll":
                        $objTypeEvent::selectAll();
                        break;
                }
            break;
          
        }

?>