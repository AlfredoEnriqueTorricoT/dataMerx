<?php
namespace App\cad\dal;

use PDO;

class Conexion
{
    private $server = "localhost";
    private $usr = "root";
    private $pass = "";
    private $db = "datamerx";
    private $connection;

    function getConnection()
    {
        if ($this->connection == null) {
            $this->connection = new PDO("mysql:host=$this->server;dbname=$this->db", $this->usr, $this->pass);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        }
        return $this->connection;
    }

    function query($csql)
    {
        $this->getConnection()->exec("set names utf8");
        return $this->getConnection()->query($csql);
    }

    function queryWithParams($csql, $paramArray)
    {
        $this->getConnection()->exec("set names utf8");
        $q = $this->getConnection()->prepare($csql);
        $q->execute($paramArray);
        return $q;
    }

    function getLastInsertedId()
    {
        return $this->getConnection()->lastInsertId();
    }

}