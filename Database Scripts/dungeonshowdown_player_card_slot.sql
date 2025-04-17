CREATE DATABASE  IF NOT EXISTS `dungeonshowdown` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dungeonshowdown`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dungeonshowdown
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
  CONSTRAINT `player_card_board_card_id_FK` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`),
  CONSTRAINT `player_card_board_player_status_id_FK` FOREIGN KEY (`player_status_id`) REFERENCES `player_status` (`player_status_id`),
  CONSTRAINT `player_card_slot_room_id_FK` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `player_card_slot_slot_id_FK` FOREIGN KEY (`slot_id`) REFERENCES `slot` (`slot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_card_slot`
--

LOCK TABLES `player_card_slot` WRITE;
/*!40000 ALTER TABLE `player_card_slot` DISABLE KEYS */;
INSERT INTO `player_card_slot` VALUES (10,1,1,3,1,NULL,NULL),(11,1,2,1,1,NULL,NULL),(12,1,4,6,1,NULL,NULL),(13,2,1,2,1,NULL,NULL),(14,2,4,4,1,NULL,NULL),(15,2,3,6,1,NULL,NULL),(16,2,1,5,2,NULL,NULL),(17,2,4,3,2,NULL,NULL),(18,2,4,7,2,NULL,NULL),(19,2,1,2,3,NULL,NULL),(20,2,4,1,3,NULL,NULL),(21,2,3,6,3,NULL,NULL),(22,2,1,5,4,NULL,NULL),(23,2,4,3,4,NULL,NULL),(24,2,3,1,4,NULL,NULL),(25,2,1,5,5,NULL,NULL),(26,2,2,4,5,NULL,NULL),(27,2,4,7,5,NULL,NULL),(28,2,5,8,6,1,NULL),(29,2,6,10,6,1,NULL),(30,2,9,12,6,1,NULL),(31,2,10,13,6,1,NULL),(32,1,1,6,2,NULL,NULL),(33,1,2,3,2,NULL,NULL),(34,1,3,1,2,NULL,NULL);
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

-- Dump completed on 2025-04-17 17:43:49
