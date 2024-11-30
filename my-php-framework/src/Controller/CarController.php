<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Car;
use App\Service\Router;
use App\Service\Templating;

class CarController
{
    //strona poczatkowa CARS
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $cars = Car::findAll();

        $html = $templating->render('car/index.html.php', [
            'cars' => $cars,
            'router' => $router,
        ]);

        return $html;
    }

    // create new car
    public function createAction(?array $requestPost, Templating $templating, Router $router): ?string
    {
        $actionUrl = '/car/create';
        if ($requestPost) {
            // Tworzenie nowego samochodu
            $car = Car::fromArray($requestPost['car']);
            $car->save();

            $path = $router->generatePath('car-index');
            $router->redirect($path);
            return null;
        } else {

            $car = new Car();
        }

        $html = $templating->render('car/create.html.php', [
            'car' => $car,
            'actionUrl' => $actionUrl,
            'router' => $router,
        ]);
        return $html;
    }

    // Edytowanie istniejącego samochodu
    public function editAction(int $carId, ?array $requestPost, Templating $templating, Router $router): ?string
    {
        $car = Car::find($carId);
        if (!$car) {
            throw new NotFoundException("Brak samochodu o id $carId");
        }
        $actionUrl = '/car/edit?id=' . $carId;
        if ($requestPost) {
            // new data
            $car->fill($requestPost['car']);
            $car->save();

            //go ti lista Cars
            $path = $router->generatePath('car-index');
            $router->redirect($path);
            return null;
        }
        $html = $templating->render('car/edit.html.php', [
            'car' => $car,
            'actionUrl' => $actionUrl,
            'router' => $router,
        ]);
        return $html;
    }


    //details of Car
    public function showAction(int $carId, Templating $templating, Router $router): ?string
    {
        $car = Car::find($carId);
        if (!$car) {
            throw new NotFoundException("Brak samochodu o id $carId");
        }

        $html = $templating->render('car/show.html.php', [
            'car' => $car,
            'router' => $router,
        ]);
        return $html;
    }

    //delete car
    public function deleteAction(int $carId, Router $router): ?string
    {
        $car = Car::find($carId);
        if (!$car) {
            throw new NotFoundException("Brak samochodu o id $carId");
        }

        $car->delete();
        $path = $router->generatePath('car-index');
        $router->redirect($path);
        return null;
    }
}
