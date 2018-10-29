<?php

namespace Printful\Models;

class Quiz
{
    private $db;
    protected $quiz;

    public function __construct(\PDO $db)
    {
        $this->db = $db;
    }

    public function getQuizList(): array
    {
        $sql = "SELECT id, title FROM quiz";
        $sth = $this->db->prepare($sql);
        $sth->execute();
        return $sth->fetchAll(\PDO::FETCH_ASSOC) ?: [];
    }

    public function getQuizQuestions(int $quizId): array
    {
        $sql = "SELECT id, title FROM quiz_question WHERE quiz_id = :quiz_id";
        $sth = $this->db->prepare($sql);
        $sth->bindParam(':quiz_id', $quizId, \PDO::PARAM_INT);
        $sth->execute();

        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
        // get each question options
        foreach($result as $key => $value) {
            $result[$key]['options'] = $this->getQuizQuestionOptions($value['id']);
        }

        return $result ?: [];
    }

    private function getQuizQuestionOptions(int $quizQuestionId): array
    {
        $sql = "SELECT 
                id, 
                quiz_question_id,
                answer,
                option_order
            FROM 
                quiz_question_option 
            WHERE 
                quiz_question_id = :quiz_question_id";
        $sth = $this->db->prepare($sql);
        $sth->bindParam(':quiz_question_id', $quizQuestionId, \PDO::PARAM_INT);
        $sth->execute();
        return $sth->fetchAll(\PDO::FETCH_ASSOC) ?: [];
    }
}