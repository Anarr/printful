-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: localhost    Database: printful
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `quiz_question_option`
--

DROP TABLE IF EXISTS `quiz_question_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `quiz_question_option` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quiz_question_id` bigint(20) NOT NULL,
  `answer` text COLLATE utf8_unicode_ci NOT NULL,
  `option_order` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`quiz_question_id`),
  KEY `fk_quiz_question_idx` (`quiz_question_id`),
  CONSTRAINT `fk_quiz_question` FOREIGN KEY (`quiz_question_id`) REFERENCES `quiz_question` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_question_option`
--

LOCK TABLES `quiz_question_option` WRITE;
/*!40000 ALTER TABLE `quiz_question_option` DISABLE KEYS */;
INSERT INTO `quiz_question_option` VALUES (1,1,'1997',1,'2018-10-28 18:30:05','2018-10-28 18:30:05'),(2,1,'2001',2,'2018-10-28 18:30:05','2018-10-28 18:32:15'),(3,1,'1998',3,'2018-10-28 18:30:05','2018-10-28 18:32:15'),(4,1,'1999',4,'2018-10-28 18:30:05','2018-10-28 18:32:15'),(5,2,'la',1,'2018-10-28 18:30:05','2018-10-28 18:30:05'),(6,2,'lv',2,'2018-10-28 18:30:05','2018-10-28 18:32:15'),(7,2,'lu',3,'2018-10-28 18:30:05','2018-10-28 18:32:15'),(8,3,'Rasmus Lerdorf',1,'2018-10-28 18:30:05','2018-10-28 18:30:05'),(9,3,'James Gosling',2,'2018-10-28 18:30:05','2018-10-28 18:32:15'),(10,3,'guido van rossum',3,'2018-10-28 18:30:05','2018-10-28 18:32:15'),(11,8,'12',1,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(12,8,'11',2,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(13,8,'8',3,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(14,9,'Two movies',1,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(15,9,'Three movies',2,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(16,9,'Six movies',3,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(17,9,'Ten movies',4,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(18,10,'Number 742',1,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(19,10,'Number 543',2,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(20,11,'15',1,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(21,11,'17',2,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(22,11,'31',3,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(23,11,'22',4,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(24,12,'4',1,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(25,12,'13',2,'2018-10-29 23:24:35','2018-10-29 23:24:35'),(26,12,'12',3,'2018-10-29 23:24:35','2018-10-29 23:51:56');
/*!40000 ALTER TABLE `quiz_question_option` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-30  4:18:43
