-- Get list of user article names from articles table
    SELECT * FROM `articles`
    Where `user_id` = ?;

-- Get id of article with user and article name from articles table
    SELECT `id` FROM `articles`
    Where `user_id` = ? AND `name` = ?;

-- Post new article name in articles table
    INSERT INTO `articles` (`user_id`, `name`)
    VALUES (?, ?);

-- Patch new article name in articles table
    UPDATE `articles`
    SET `name` = ?
    WHERE `id` = ?;

-- Patch new article publish state in articles table
    UPDATE `articles`
    SET `is_publish` = ?
    WHERE `id` = ?;

-- Delete article from articles table
    DELETE FROM `articles`
    WHERE `id` = ?;