-- getAll
    SELECT * FROM `articles`
    WHERE `user_id` = ?;

-- getId
    SELECT `id` FROM `articles`
    WHERE `user_id` = ? AND `name` = ?

-- addNew
    INSERT INTO `articles` (`user_id`, `name`)
    VALUES (?, ?);

-- changeName
    UPDATE `articles`
    SET `name` = ?
    WHERE `id` = ?;

-- changeDescription
    UPDATE `articles`
    SET `description` = ?
    WHERE `id` = ?;

-- changePublishment
    UPDATE `articles`
    SET `is_publish` = ?
    WHERE `id` = ?;

-- remove
    DELETE FROM `articles`
    WHERE `id` = ?;
    