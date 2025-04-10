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
-- Table structure for table `card_attribute`
--

DROP TABLE IF EXISTS `card_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_attribute` (
  `card_attribute_id` int NOT NULL AUTO_INCREMENT,
  `card_id` int DEFAULT NULL,
  `attribute_id` int DEFAULT NULL,
  `card_attribute_value` decimal(10,0) DEFAULT NULL,
  `IsPlayer` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`card_attribute_id`),
  KEY `card_attribute_card_id_FK_idx` (`card_id`),
  KEY `card_attribute_attribute_id_FK_idx` (`attribute_id`),
  CONSTRAINT `card_attribute_attribute_id_FK` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`attribute_id`),
  CONSTRAINT `card_attribute_card_id_FK` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_attribute`
--

LOCK TABLES `card_attribute` WRITE;
/*!40000 ALTER TABLE `card_attribute` DISABLE KEYS */;
INSERT INTO `card_attribute` VALUES 
(1,1,1,2,1),
(2,2,2,3,1),
(3,4,3,1,1),
(4,5,3,1,1),
(5,7,3,2,1),
(6,4,4,1,1),
(7,5,4,1,1),
(8,7,4,1,1),
(9,3,5,1,1),(10,6,5,1,1),(11,13,5,1,1),(12,14,5,2,1),(16,8,6,1,1),(17,9,6,2,1),(18,10,6,1,1),(19,11,7,2,1),(20,12,7,3,1),(22,6,4,-1,1),(23,11,4,-1,1),(24,12,4,-2,1),(25,9,3,-2,1),(26,10,3,-2,1),(27,13,3,-2,1),(28,14,3,-3,1),(32,5,2,-1,1),(33,7,2,-2,1);
/*!40000 ALTER TABLE `card_attribute` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-10 14:36:08
