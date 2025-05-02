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
-- Table structure for table `player_status`
--

DROP TABLE IF EXISTS `player_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_status` (
  `player_status_id` int NOT NULL AUTO_INCREMENT,
  `match_id` int NOT NULL,
  `player_id` int NOT NULL,
  `max_health` int DEFAULT '20',
  `current_health` int DEFAULT '20',
  `energy` int DEFAULT '10',
  `insight` int DEFAULT '10',
  `damage` int DEFAULT '1',
  `state_id` int DEFAULT '1',
  `showdown_initiative` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`player_status_id`),
  KEY `player_status_match_id_FK_idx` (`match_id`),
  KEY `player_status_player_id_FK_idx` (`player_id`),
  KEY `player_status_state_id_FK_idx` (`state_id`),
  CONSTRAINT `player_status_match_id_FK` FOREIGN KEY (`match_id`) REFERENCES `game_match` (`match_id`),
  CONSTRAINT `player_status_player_id_FK` FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`),
  CONSTRAINT `player_status_state_id_FK` FOREIGN KEY (`state_id`) REFERENCES `game_state` (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_status`
--

LOCK TABLES `player_status` WRITE;
/*!40000 ALTER TABLE `player_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `player_status` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-02  0:56:35
