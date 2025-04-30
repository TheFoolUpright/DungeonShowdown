-- Reset everything
SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE player_card_slot;
TRUNCATE TABLE player_status;
TRUNCATE TABLE game_match;
UPDATE player SET is_waiting_for_match = 0;
SET FOREIGN_KEY_CHECKS = 1;
SET SQL_SAFE_UPDATES = 1;