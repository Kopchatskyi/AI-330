<?php

/** @var \App\Model\Car $car */
/** @var \App\Service\Router $router */

$title = "{$car->getName()} ({$car->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= htmlspecialchars($car->getName()) ?></h1>
    <article>
        <ul>
            <li><strong>Rok:</strong> <?= htmlspecialchars($car->getYear()) ?></li>
            <li><strong>Silnik:</strong> <?= htmlspecialchars($car->getEngine()) ?></li>
            <li><strong>Maksymalna Prędkość:</strong> <?= htmlspecialchars($car->getMaxSpeed()) ?> km/h</li>
            <li><strong>Przebieg:</strong> <?= htmlspecialchars($car->getMileage()) ?> km</li>
            <?php if ($car->getImage()): ?>
                <li><strong>Zdjęcie:</strong><br>
                    <img src="/<?= htmlspecialchars($car->getImage()) ?>" alt="Zdjęcie samochodu" style="max-width: 400px;">
                </li>
            <?php else: ?>
                <li><strong>Zdjęcie:</strong> Brak zdjęcia</li>
            <?php endif; ?>
        </ul>
    </article>

    <ul class="action-list">
        <li><a href="<?= $router->generatePath('car-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('car-edit', ['id' => $car->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
