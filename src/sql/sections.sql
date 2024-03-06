-- getAll
    SELECT `sections`.*, `styles`.* FROM `sections`
    INNER JOIN `styles` ON `sections`.`id` = `styles`.`section_id`
    WHERE `sections`.`article_id` = ?;

-- getLastSequence
    SELECT `sequence` FROM `sections`
    WHERE `article_id` = ?
    ORDER BY `sequence` DESC LIMIT 1;

-- addNew
    INSERT INTO `sections` (`article_id`, `content`, `content_type`, `image_url`, `sequence`)
    VALUES (?, ?, ?, ?, ?);

-- changeContent
    UPDATE `sections`
    SET `content` = ?,
        `content_type` = ?,
        `image_url` = ?
    WHERE `id` = ?;

-- remove
    DELETE FROM `sections`
    WHERE `id` = ?;
    