-- Get all article sections from sections and style tables
    SELECT `sections`.*, `styles`.* FROM `sections`
    INNER JOIN `styles` ON `sections`.`id` = `styles`.`section_id`
    WHERE `sections`.`article_id` = ?;

-- Post new article section in sections table
    INSERT INTO `sections` (`article_id`, `content`)
    VALUES (?, ?);

-- Patch new article section in sections table
    UPDATE `sections`
    SET `content` = ?
    WHERE `id` = ?;

-- Delete article section in sections table
    DELETE FROM `sections`
    WHERE `id` = ?