-- getAll
    SELECT * FROM `users` 
    WHERE `id` = ?;

-- getIdPassword
    SELECT `id`, `password` FROM `users` 
    WHERE `name` = ?;

-- addNew
    INSERT INTO `users` (`name`, `password`, `email`, `phone`, `author`) 
    VALUES (?, ?, ?, ?, ?);

-- changeName
    UPDATE `users` 
    SET `name` = ?
    WHERE `id` = ?;

-- changePassword
    UPDATE `users` 
    SET `password` = ?
    WHERE `id` = ?;

-- changeAuthor
    UPDATE `users` 
    SET `author` = ?
    WHERE `id` = ?;

-- changeEmail
    UPDATE `users` 
    SET `email` = ?
    WHERE `id` = ?;

-- changePhone
    UPDATE `users` 
    SET `phone` = ?
    WHERE `id` = ?;

-- remove
    DELETE FROM `users` 
    WHERE `id` = ?;
    