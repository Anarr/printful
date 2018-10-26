<?php

namespace Prinful\Controllers;

class Controllers
{
    protected $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

}