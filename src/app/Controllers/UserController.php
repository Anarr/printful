<?php 

namespace Printful\Controllers;

use Printful\Models\User as User;


class UserController
{
    private $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    /**
     * @return array
     */
    public function getUser(string $username): array
    {
        $username = filter_var($username, FILTER_SANITIZE_STRING);
        $this->model->setUser($username);
        return $this->model->getUser();
    }
}