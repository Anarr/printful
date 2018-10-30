# printful
Php developer technical task

# Used native codes for both frontend and backend side

for run application enter src/ directory and run php -S localhost:8000

Mysql dump files stored under src/Dump20181030 directory

Test users list:
  Anar,
  Julia,
  Helen,
  Shamil,
  Martin
Available quiz types are:
  1) Informatics; (under this type 3 questions)
  2) Film; (under this type 5 questions)
Each question have dynmic options count, such as the first question has 3 options, the second two 4 options, the third question 6 options etc.


Result page display  total questions count for selected quiz and user out of answers count

# All quiz types and its questions answer stored link below: 

https://pastebin.com/PvbdB8Rj


# Adding new quiz and question


1) Insert new quiz into <<quiz>> table. required params is title
2) For insertation of new question each quiz add <<quiz_question>> quiz_id, title, and correct answer order (1,2,3,4, etc)
3) For insertation of new question options add <<quiz_question_option>> table quiz_question_id, answer (just answer title which seems to users) option_order (1,2,3,4,etc). option order displays ordering for user in quiz page.
4) User quiz results stored <<user_quiz_result>> table 


