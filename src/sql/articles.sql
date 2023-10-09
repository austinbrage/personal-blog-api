-- getAll
    SELECT * FROM `articles`
    Where `user_id` = ?;

-- addNew
    INSERT INTO `articles` (`user_id`, `name`)
    VALUES (?, ?);

-- changeName
    UPDATE `articles`
    SET `name` = ?
    WHERE `id` = ?;

-- changePublishment
    UPDATE `articles`
    SET `is_publish` = ?
    WHERE `id` = ?;

-- remove
    DELETE FROM `articles`
    WHERE `id` = ?;
    