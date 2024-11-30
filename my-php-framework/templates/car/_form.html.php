<?php
/** @var $car ?\App\Model\Car */
?>

<div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="car[name]" value="<?= $car ? $car->getName() : '' ?>" required>
</div>

<div class="form-group">
    <label for="year">Year</label>
    <input type="number" id="year" name="car[year]" value="<?= $car ? $car->getYear() : '' ?>" min="1886" max="<?= date('Y') ?>" required>
</div>

<div class="form-group">
    <label for="engine">Engine</label>
    <input type="text" id="engine" name="car[engine]" value="<?= $car ? $car->getEngine() : '' ?>" required>
</div>

<div class="form-group">
    <label for="max_speed">Max Speed (km/h)</label>
    <input type="number" id="max_speed" name="car[max_speed]" value="<?= $car ? $car->getMaxSpeed() : '' ?>" required>
</div>

<div class="form-group">
    <label for="mileage">Mileage (km)</label>
    <input type="number" id="mileage" name="car[mileage]" value="<?= $car ? $car->getMileage() : '' ?>" required>
</div>

<div class="form-group">
    <label for="image">Image (optional)</label>
    <input type="file" id="image" name="image" accept="image/*">
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
