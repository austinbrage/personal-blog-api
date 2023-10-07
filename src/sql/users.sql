-- Get all user data from users table
    SELECT * FROM `users` 
    WHERE `id` = ?;

-- Post new user data in users table
    INSERT INTO `users` (`name`, `password`, `email`, `phone`, `author`) 
    VALUES (?, ?, ?, ?, ?);

-- Patch new user name in users table
    UPDATE `users` 
    SET `name` = ?
    WHERE `id` = ?;

-- Patch new user password in users table
    UPDATE `users` 
    SET `password` = ?
    WHERE `id` = ?;

-- Patch new user author in users table
    UPDATE `users` 
    SET `author` = ?
    WHERE `id` = ?;

-- Patch new user email in users table
    UPDATE `users` 
    SET `email` = ?
    WHERE `id` = ?;

-- Patch new user phone in users table
    UPDATE `users` 
    SET `phone` = ?
    WHERE `id` = ?;

-- Delete user in users table
    DELETE FROM `users` 
    WHERE `id` = ?;