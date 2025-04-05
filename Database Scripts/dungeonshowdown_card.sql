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
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `card_id` int NOT NULL AUTO_INCREMENT,
  `card_type_id` int NOT NULL,
  `card_name` varchar(45) DEFAULT NULL,
  `card_max_health` int DEFAULT NULL,
  `card_current_health` int DEFAULT NULL,
  `card_energy` int DEFAULT NULL,
  `card_insight` int DEFAULT NULL,
  `card_damage` int DEFAULT NULL,
  `card_attack` decimal(11,0) DEFAULT NULL,
  `card_defense` int DEFAULT NULL,
  `card_image_path` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`card_id`),
  KEY `card_deck_card_type_id_FK_idx` (`card_type_id`),
  CONSTRAINT `card_deck_card_type_id_FK` FOREIGN KEY (`card_type_id`) REFERENCES `card_type` (`card_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES 
(1,1,'Max Health',2,0,0,0,0,0,0,NULL),
(2,2,'Healing',0,3,0,0,0,0,0,NULL),
(3,3,'Damage',0,0,0,0,1,0,0,NULL),
(4,4,'Rest',0,0,1,1,0,0,0,NULL),
(5,5,'Slime',0,-1,1,1,0,0,0,NULL),
(6,5,'Ghost',0,0,0,-1,1,0,0,NULL),
(7,5,'Bat',0,-2,2,1,0,0,0,NULL),
(8,6,'Heavy Attack',0,0,0,0,0,2,0,NULL),
(9,7,'Block 2',0,0,0,0,0,0,2,NULL),
(10,8,'Rage 1',0,0,-2,0,1,0,0,NULL);
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-04 22:10:37
