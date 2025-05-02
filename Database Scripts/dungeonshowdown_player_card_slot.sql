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
-- Table structure for table `player_card_slot`
--

DROP TABLE IF EXISTS `player_card_slot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_card_slot` (
  `player_card_slot_id` int NOT NULL AUTO_INCREMENT,
  `player_status_id` int DEFAULT NULL,
  `slot_id` int DEFAULT NULL,
  `card_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `showdown_turn` int DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`player_card_slot_id`),
  KEY `player_card_board_player_status_id_FK_idx` (`player_status_id`),
  KEY `player_card_board_board_status_id_FK_idx` (`slot_id`),
  KEY `player_card_board_card_id_FK_idx` (`card_id`),
  KEY `player_card_slot_room_id_FK_idx` (`room_id`),
  CONSTRAINT `player_card_slot_card_id_FK` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`),
  CONSTRAINT `player_card_slot_player_status_id_FK` FOREIGN KEY (`player_status_id`) REFERENCES `player_status` (`player_status_id`),
  CONSTRAINT `player_card_slot_room_id_FK` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `player_card_slot_slot_id_FK` FOREIGN KEY (`slot_id`) REFERENCES `slot` (`slot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_card_slot`
--

LOCK TABLES `player_card_slot` WRITE;
/*!40000 ALTER TABLE `player_card_slot` DISABLE KEYS */;
INSERT INTO `player_card_slot` VALUES (1,1,1,135,1,NULL,1),(2,1,4,17,1,NULL,1),(3,1,3,30,1,NULL,1),(4,2,4,136,1,NULL,1),(5,2,2,16,1,NULL,1),(6,2,4,30,1,NULL,1),(7,1,1,31,2,NULL,1),(8,1,2,17,2,NULL,1),(9,1,4,35,2,NULL,1),(10,2,1,256,2,NULL,1),(11,2,2,35,2,NULL,1),(12,2,4,30,2,NULL,1),(13,2,1,31,3,NULL,1),(14,2,2,170,3,NULL,1),(15,2,3,18,3,NULL,1),(16,1,1,47,3,NULL,1),(17,1,2,31,3,NULL,1),(18,1,3,332,3,NULL,1),(19,3,1,17,1,NULL,1),(20,3,4,251,1,NULL,1),(21,3,3,30,1,NULL,1),(22,4,4,245,1,NULL,1),(23,4,2,16,1,NULL,1),(24,4,3,30,1,NULL,1),(25,3,1,274,2,NULL,1),(26,3,4,47,2,NULL,1),(27,3,3,18,2,NULL,1),(28,4,1,17,2,NULL,1),(29,4,4,65,2,NULL,1),(30,4,3,38,2,NULL,1),(31,4,4,162,3,NULL,1),(32,4,2,38,3,NULL,1),(33,4,3,18,3,NULL,1),(34,3,4,162,3,NULL,1),(35,3,4,31,3,NULL,1),(36,3,3,18,3,NULL,1),(37,3,4,31,4,NULL,1),(38,3,2,36,4,NULL,0),(39,3,3,368,4,NULL,1),(40,4,1,19,4,NULL,1),(41,4,2,32,4,NULL,1),(42,4,4,191,4,NULL,0),(43,3,4,461,5,NULL,0),(44,3,2,37,5,NULL,1),(45,3,3,21,5,NULL,1),(46,4,4,41,5,NULL,0),(47,4,2,22,5,NULL,1),(48,4,3,121,5,NULL,0),(49,4,5,1,6,1,1),(50,4,6,3,6,1,1),(51,4,7,7,6,1,0),(52,4,8,15,6,1,1),(53,3,5,1,6,1,1),(54,3,6,4,6,1,1),(55,3,7,9,6,1,1),(56,3,8,11,6,1,1),(57,5,4,248,1,NULL,1),(58,5,2,17,1,NULL,1),(59,5,3,30,1,NULL,1),(60,6,4,135,1,NULL,1),(61,6,2,16,1,NULL,1),(62,6,3,30,1,NULL,1),(63,5,1,18,2,NULL,1),(64,5,2,31,2,NULL,1),(65,5,4,47,2,NULL,1),(66,6,1,30,2,NULL,1),(67,6,4,149,2,NULL,1),(68,6,3,35,2,NULL,1),(69,6,1,40,3,NULL,1),(70,6,4,332,3,NULL,0),(71,6,3,18,3,NULL,1),(72,5,4,332,3,NULL,1),(73,5,2,38,3,NULL,1),(74,5,3,19,3,NULL,1),(75,6,4,32,4,NULL,1),(76,6,2,19,4,NULL,1),(77,6,3,49,4,NULL,0),(78,5,1,31,4,NULL,1),(79,5,4,366,4,NULL,1),(80,5,3,35,4,NULL,1),(81,5,4,32,5,NULL,1),(82,5,2,23,5,NULL,1),(83,5,3,21,5,NULL,1),(84,6,1,435,5,NULL,0),(85,6,4,47,5,NULL,1),(86,6,3,32,5,NULL,1),(87,5,5,1,6,1,1),(88,5,9,3,6,1,1),(89,5,10,6,6,1,1),(90,5,8,14,6,1,1),(91,6,5,1,6,1,1),(92,6,9,4,6,1,0),(93,6,10,8,6,1,1),(94,6,8,15,6,1,1),(95,6,5,1,6,2,1),(96,6,9,5,6,2,1),(97,6,7,9,6,2,0),(98,6,10,12,6,2,0),(99,5,5,1,6,2,1),(100,5,9,3,6,2,1),(101,5,10,10,6,2,1),(102,5,8,13,6,2,1),(103,6,5,1,6,3,1),(104,6,6,5,6,3,1),(105,6,7,6,6,3,0),(106,6,8,11,6,3,0),(107,5,5,1,6,3,1),(108,5,6,2,6,3,0),(109,5,7,8,6,3,1),(110,5,8,15,6,3,1);
/*!40000 ALTER TABLE `player_card_slot` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-02 15:32:54
