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

    /**
     * retrieve quiz list
     * @return array
     */
    public function getQuizList(): array
    {
        $sql = "SELECT id, 
                        title 
                FROM quiz";

        $sth = $this->db->prepare($sql);
        $sth->execute();
        return $sth->fetchAll(\PDO::FETCH_ASSOC) ?: [];
    }

    /**
     * retrieve each quiz questions
     * @param int $quizId
     * @return array
     */
    public function getQuizQuestions(int $quizId): array
    {
        $sql = "SELECT id, 
                        title 
                FROM quiz_question 
                WHERE quiz_id = :quiz_id";

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

    /**
     * get quiz question options
     * @param int $quizQuestionId
     * @return array 
     */
    private function getQuizQuestionOptions(int $quizQuestionId): array
    {
        $sql = "SELECT  id, 
                        quiz_question_id, 
                        answer, 
                        option_order 
                FROM    quiz_question_option 
                WHERE   quiz_question_id = :quiz_question_id";

        $sth = $this->db->prepare($sql);
        $sth->bindParam(':quiz_question_id', $quizQuestionId, \PDO::PARAM_INT);
        $sth->execute();
        return $sth->fetchAll(\PDO::FETCH_ASSOC) ?: [];
    }

    /**
     * retrieve quiz true answers
     * @param int $quizId
     * @return array
     */
    public function getQuizAnswers(int $quizId): array
    {
        $sql = "SELECT  id, 
                        answer 
                FROM   `quiz_question` 
                WHERE   quiz_id = :quiz_id";

        $sth = $this->db->prepare($sql);
        $sth->bindParam(':quiz_id', $quizId, \PDO::PARAM_INT);
        $sth->execute();

        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
        return $result ?: [];
    }


    /**
     * add quiz result for current user
     * @param int $userId
     * @param array $answers
     * @return array
     */
    public function addQuizResults(int $userId, array $quizResult): array
    {
        $sql = "INSERT INTO user_quiz_result 
                            (user_id, 
                            quiz_id, 
                            correct_answer, 
                            wrong_answer) 
                VALUES      (?, 
                            ?, 
                            ?, 
                            ?)";

        $sth = $this->db->prepare($sql);
        $sth->bindParam(1, $userId);
        $sth->bindParam(2, $quizResult['quiz_id']);
        $sth->bindParam(3, $quizResult['correct_answer']);
        $sth->bindParam(4, $quizResult['wrong_answer']);
        $sth->execute();
        
        return $quizResult;
    }

    /**
     * return user quiz result
     * @param int $userId
     * @param int $quizId
     * @return array
     */
    public function getUserQuizResult(int $userId, int $quizId): array
    {
        $sql = "SELECT  correct_answer, 
                        wrong_answer 
                FROM   `user_quiz_result` 
                WHERE   quiz_id = :quiz_id 
                        AND user_id = :user_id 
                ORDER  BY id DESC 
                LIMIT  1";

        $sth = $this->db->prepare($sql);
        $sth->bindParam(':quiz_id', $quizId, \PDO::PARAM_INT);
        $sth->bindParam(':user_id', $userId, \PDO::PARAM_INT);
        $sth->execute();

        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
        return $result ?: [];
    }

}