CREATE DATABASE  IF NOT EXISTS `dungeonshowdown`;
USE `dungeonshowdown`;


--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
CREATE TABLE `player` (
  `player_id` int NOT NULL AUTO_INCREMENT,
  `player_username` varchar(250) NOT NULL,
  `player_email` varchar(250) NOT NULL,
  `player_password` varchar(250) NOT NULL,
  `player_color` varchar(45) DEFAULT '#a2293e',
  `is_waiting_for_match` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`player_id`),
  UNIQUE KEY `PlayerID_UNIQUE` (`player_id`),
  UNIQUE KEY `PlayerUsername_UNIQUE` (`player_username`)
);

--
-- Table structure for table `game_state`
--

DROP TABLE IF EXISTS `game_state`;
CREATE TABLE `game_state` (
  `state_id` int NOT NULL AUTO_INCREMENT,
  `state_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`state_id`)
);

--
-- Table structure for table `game_phase`
--

DROP TABLE IF EXISTS `game_phase`;
CREATE TABLE `game_phase` (
  `phase_id` int NOT NULL AUTO_INCREMENT,
  `phase_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`phase_id`)
);

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_name` varchar(45) DEFAULT NULL,
  `phase_id` int DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `room_phase_id_fk_idx` (`phase_id`),
  CONSTRAINT `room_phase_id_fk` FOREIGN KEY (`phase_id`) REFERENCES `game_phase` (`phase_id`)
);

--
-- Table structure for table `slot`
--

DROP TABLE IF EXISTS `slot`;
CREATE TABLE `slot` (
  `slot_id` int NOT NULL AUTO_INCREMENT,
  `slot_position_name` varchar(250) DEFAULT NULL,
  `phase_id` int DEFAULT NULL,
  PRIMARY KEY (`slot_id`),
  KEY `slot_phase_id_FK_idx` (`phase_id`),
  CONSTRAINT `slot_phase_id_FK` FOREIGN KEY (`phase_id`) REFERENCES `game_phase` (`phase_id`)
);

--
-- Table structure for table `card_type`
--

DROP TABLE IF EXISTS `card_type`;
CREATE TABLE `card_type` (
  `card_type_id` int NOT NULL,
  `card_type_name` varchar(250) DEFAULT NULL,
  `phase_id` int DEFAULT NULL,
  PRIMARY KEY (`card_type_id`),
  KEY `card_type_phase_id_FK_idx` (`phase_id`),
  CONSTRAINT `card_type_phase_id_FK` FOREIGN KEY (`phase_id`) REFERENCES `game_phase` (`phase_id`)
);

--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
CREATE TABLE `card` (
  `card_id` int NOT NULL AUTO_INCREMENT,
  `card_type_id` int NOT NULL,
  `card_name` varchar(45) DEFAULT NULL,
  `card_max_health` int DEFAULT NULL,
  `card_current_health` int DEFAULT NULL,
  `card_energy` int DEFAULT NULL,
  `card_insight` int DEFAULT NULL,
  `card_damage` int DEFAULT NULL,
  `card_attack` decimal(11,1) DEFAULT NULL,
  `card_defense` int DEFAULT NULL,
  `card_image_path` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`card_id`),
  KEY `card_deck_card_type_id_FK_idx` (`card_type_id`),
  CONSTRAINT `card_deck_card_type_id_FK` FOREIGN KEY (`card_type_id`) REFERENCES `card_type` (`card_type_id`)
);

--
-- Table structure for table `card_room`
--

DROP TABLE IF EXISTS `card_room`;
CREATE TABLE `card_room` (
  `cards_room_id` int NOT NULL AUTO_INCREMENT,
  `card_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  PRIMARY KEY (`cards_room_id`),
  KEY `card_per_room_card_id_FK_idx` (`card_id`),
  KEY `card_per_room_room_id_FK_idx` (`room_id`),
  CONSTRAINT `card_per_room_card_id_FK` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`),
  CONSTRAINT `card_per_room_room_id_FK` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
);

--
-- Table structure for table `game_match`
--

DROP TABLE IF EXISTS `game_match`;
CREATE TABLE `game_match` (
  `match_id` int NOT NULL AUTO_INCREMENT,
  `player_1_id` int DEFAULT NULL,
  `player_2_id` int DEFAULT NULL,
  `is_match_finished` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`match_id`),
  KEY `PlayerID1_idx` (`player_1_id`,`player_2_id`),
  KEY `match_player_2_id_FK_idx` (`player_2_id`),
  CONSTRAINT `match_player_1_id_FK` FOREIGN KEY (`player_1_id`) REFERENCES `player` (`player_id`),
  CONSTRAINT `match_player_2_id_FK` FOREIGN KEY (`player_2_id`) REFERENCES `player` (`player_id`)
);

--
-- Table structure for table `player_status`
--

DROP TABLE IF EXISTS `player_status`;
CREATE TABLE `player_status` (
  `player_status_id` int NOT NULL AUTO_INCREMENT,
  `match_id` int NOT NULL,
  `player_id` int NOT NULL,
  `max_health` int DEFAULT '30',
  `current_health` int DEFAULT '30',
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
);

--
-- Table structure for table `player_card_slot`
--

DROP TABLE IF EXISTS `player_card_slot`;
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
);