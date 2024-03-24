-- getAll
    SELECT `sections`.*, `styles`.* FROM `sections`
    INNER JOIN `styles` ON `sections`.`id` = `styles`.`section_id`
    WHERE `sections`.`article_id` = ?
    ORDER BY `sequence` ASC;

-- getImage
    SELECT `image` FROM `sections`
    WHERE `id` = ?;

-- getLastSequence
    SELECT `sequence` FROM `sections`
    WHERE `article_id` = ?
    ORDER BY `sequence` DESC LIMIT 1;

-- addNew
    INSERT INTO `sections` (`article_id`, `content`, `content_type`, `image`, `sequence`)
    VALUES (?, ?, ?, ?, ?);

-- changeContent
    UPDATE `sections`
    SET `content` = ?,
        `content_type` = ?,
        `image` = ?
    WHERE `id` = ?;

-- changeSequence
    UPDATE `sections`
    SET `sequence` = ?
    WHERE `id` = ?;

-- remove
    DELETE FROM `sections`
    WHERE `id` = ?;
    