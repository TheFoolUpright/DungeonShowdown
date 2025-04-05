CREATE DATABASE  IF NOT EXISTS `dungeonshowdown` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dungeonshowdown`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: dungeonshowdown
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `card_room`
--

DROP TABLE IF EXISTS `card_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_room` (
  `cards_room_id` int NOT NULL AUTO_INCREMENT,
  `card_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  PRIMARY KEY (`cards_room_id`),
  KEY `card_per_room_card_id_FK_idx` (`card_id`),
  KEY `card_per_room_room_id_FK_idx` (`room_id`),
  CONSTRAINT `card_per_room_card_id_FK` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`),
  CONSTRAINT `card_per_room_room_id_FK` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_room`
--
ALTER TABLE `card_room` AUTO_INCREMENT = 1;


LOCK TABLES `card_room` WRITE;
/*!40000 ALTER TABLE `card_room` DISABLE KEYS */;
INSERT INTO `card_room` (card_id, room_id) VALUES 
(1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1),
(7,1),

(1,2),
(2,2),
(3,2),
(4,2),
(5,2),
(6,2),
(7,2),

(1,3),
(2,3),
(3,3),
(4,3),
(5,3),
(6,3),
(7,3),

(1,4),
(2,4),
(3,4),
(4,4),
(5,4),
(6,4),
(7,4),

(1,5),
(2,5),
(3,5),
(4,5),
(5,5),
(6,5),
(7,5),

(8,6),
(9,6),
(10,6);
/*!40000 ALTER TABLE `card_room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-04 22:10:36
