<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'autoload.php';

$config = new \App\Service\Config();
$templating = new \App\Service\Templating();
$router = new \App\Service\Router();

$action = $_REQUEST['action'] ?? null;

switch ($action) {
    case 'post-index':
    case null:
        $controller = new \App\Controller\PostController();
        $view = $controller->indexAction($templating, $router);
        break;
    case 'post-create':
        $controller = new \App\Controller\PostController();
        $view = $controller->createAction($_POST['post'] ?? null, $templating, $router);
        break;
    case 'post-edit':
        if (!$_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\PostController();
        $view = $controller->editAction($_REQUEST['id'], $_POST['post'] ?? null, $templating, $router);
        break;
    case 'post-show':
        if (!$_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\PostController();
        $view = $controller->showAction($_REQUEST['id'], $templating, $router);
        break;
    case 'post-delete':
        if (!$_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\PostController();
        $view = $controller->deleteAction($_REQUEST['id'], $router);
        break;

    // Car-related routes
    case 'car-index':
        $controller = new \App\Controller\CarController();
        $view = $controller->indexAction($templating, $router);
        break;

    case 'car-create':
        $controller = new \App\Controller\CarController();
        $view = $controller->createAction($_POST ?? null, $templating, $router);
        break;

    case 'car-edit':
        $controller = new \App\Controller\CarController();
        $view = $controller->editAction($_REQUEST['id'] ?? 0, $_POST ?? null, $templating, $router);
        break;

    case 'car-show':
        $controller = new \App\Controller\CarController();
        $view = $controller->showAction($_REQUEST['id'] ?? 0, $templating, $router);
        break;

    case 'car-delete':
        $controller = new \App\Controller\CarController();
        $view = $controller->deleteAction($_REQUEST['id'] ?? 0, $router);
        break;

    default:
        $view = 'Not found';
        break;
}

if ($view) {
    echo $view;
}
