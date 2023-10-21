-- getAll
    SELECT `id`, `name`, `email`, `author`, `api_key` FROM `users` 
    WHERE `id` = ?;

-- getIdPassword
    SELECT `id`, `password` FROM `users`
    WHERE `name` = ?;

-- getName
    SELECT `name` FROM `users` 
    WHERE `name` = ?;

-- getEmail
    SELECT `email` FROM `users` 
    WHERE `email` = ?;

-- addNew
    INSERT INTO `users` (`name`, `password`, `email`, `author`) 
    VALUES (?, ?, ?, ?);

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

-- remove
    DELETE FROM `users` 
    WHERE `id` = ?;
    
-- cleanUp
    DELETE FROM `users`;
    