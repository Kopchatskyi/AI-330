<?php
namespace App\Model;

use App\Service\Config;

class Car
{
    private ?int $id = null;
    private ?string $name = null;
    private ?int $year = null;
    private ?string $engine = null;
    private ?int $max_speed = null;
    private ?int $mileage = null;
    private ?string $image = null;

    public function getId(): ?int { return $this->id; }
    public function setId(?int $id): Car { $this->id = $id; return $this; }

    public function getName(): ?string { return $this->name; }
    public function setName(?string $name): Car { $this->name = $name; return $this; }

    public function getYear(): ?int { return $this->year; }
    public function setYear(?int $year): Car { $this->year = $year; return $this; }

    public function getEngine(): ?string { return $this->engine; }
    public function setEngine(?string $engine): Car { $this->engine = $engine; return $this; }

    public function getMaxSpeed(): ?int { return $this->max_speed; }
    public function setMaxSpeed(?int $max_speed): Car { $this->max_speed = $max_speed; return $this; }

    public function getMileage(): ?int { return $this->mileage; }
    public function setMileage(?int $mileage): Car { $this->mileage = $mileage; return $this; }

    public function getImage(): ?string { return $this->image; }
    public function setImage(?string $image): Car { $this->image = $image; return $this; }

    public static function fromArray($array): Car
    {
        $car = new self();
        $car->fill($array);
        return $car;
    }

    public function fill($array): Car
    {
        if (isset($array['id'])) $this->setId($array['id']);
        if (isset($array['name'])) $this->setName($array['name']);
        if (isset($array['year'])) $this->setYear($array['year']);
        if (isset($array['engine'])) $this->setEngine($array['engine']);
        if (isset($array['max_speed'])) $this->setMaxSpeed($array['max_speed']);
        if (isset($array['mileage'])) $this->setMileage($array['mileage']);
        if (isset($array['image'])) $this->setImage($array['image']);
        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM cars';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $cars = [];
        $carArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($carArray as $array) {
            $cars[] = self::fromArray($array);
        }
        return $cars;
    }

    public static function find($id): ?Car
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM cars WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $carArray = $statement->fetch(\PDO::FETCH_ASSOC);
        return $carArray ? self::fromArray($carArray) : null;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO cars (name, year, engine, max_speed, mileage, image) VALUES (:name, :year, :engine, :max_speed, :mileage, :image)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':name' => $this->getName(),
                ':year' => $this->getYear(),
                ':engine' => $this->getEngine(),
                ':max_speed' => $this->getMaxSpeed(),
                ':mileage' => $this->getMileage(),
                ':image' => $this->getImage(),
            ]);
            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE cars SET name = :name, year = :year, engine = :engine, max_speed = :max_speed, mileage = :mileage, image = :image WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':name' => $this->getName(),
                ':year' => $this->getYear(),
                ':engine' => $this->getEngine(),
                ':max_speed' => $this->getMaxSpeed(),
                ':mileage' => $this->getMileage(),
                ':image' => $this->getImage(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM cars WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([':id' => $this->getId()]);
        $this->setId(null);
    }
}
