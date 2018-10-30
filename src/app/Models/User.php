<?php 

namespace Printful\Models;

class User
{
    private $db;
    protected $user;
    protected $quizType;

    public function __construct(\PDO $db)
    {
        $this->db = $db;
    }

    public function setUser(string $user): void
    {
        $this->user = $user;
    }

    public function setQuizType(int $quizType): void
    {
        $this->quizType = $quizType;
    }

    /**
     * get user information
     * @return array
     */
    public function getUser(): array
    {
        $sql = "SELECT  id,
                        username 
                FROM user 
                WHERE username = :username 
                LIMIT 1";
        $sth = $this->db->prepare($sql);
        $sth->bindParam(':username', $this->user, \PDO::PARAM_STR);
        $sth->execute();
        return $sth->fetch(\PDO::FETCH_ASSOC) ?: [];
    }
}