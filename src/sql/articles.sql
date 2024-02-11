-- getKeywords
    SELECT * FROM `article_keywords` 
    ORDER BY `id`;

-- getAll
    SELECT * FROM `articles`
    WHERE `user_id` = ?
    ORDER BY `id` DESC;

-- getId
    SELECT `id` FROM `articles`
    WHERE `user_id` = ? AND `name` = ?;

-- getByKeyword
    SELECT * FROM `articles`
    WHERE `user_id` = ? AND `is_publish` = true AND placeholder
    ORDER BY `id` DESC LIMIT ? OFFSET ?;

-- getAllByKeyword
    SELECT * FROM `articles`
    WHERE `is_publish` = true AND placeholder
    ORDER BY `id` DESC LIMIT ? OFFSET ?;

-- getEverything
    SELECT * FROM `articles`
    WHERE `is_publish` = true
    ORDER BY `id` DESC LIMIT ? OFFSET ?;

-- addNew
    INSERT INTO `articles` (`user_id`, `name`, `title`, `image`, `keywords`, `description`)
    VALUES (?, ? ,?, ?, ?, ?);

-- changeData
    UPDATE `articles`
    SET `name` = ?,
        `title` = ?,
        `image` = ?,
        `keywords` = ?,
        `description` = ?
    WHERE `id` = ?;

-- changePublishment
    UPDATE `articles`
    SET `is_publish` = ?
    WHERE `id` = ?;

-- remove
    DELETE FROM `articles`
    WHERE `id` = ?;
    