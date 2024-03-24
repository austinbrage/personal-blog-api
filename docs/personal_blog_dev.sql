DROP DATABASE IF EXISTS `personal_blog_dev`;

CREATE DATABASE `personal_blog_dev`;

USE `personal_blog_dev`;

CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(250) UNIQUE NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `email` VARCHAR(250) UNIQUE NOT NULL,
  `author` VARCHAR(250) UNIQUE NOT NULL,
  `external_id` VARCHAR(250) DEFAULT NULL,
  `auth_provider` VARCHAR(250) DEFAULT NULL,
  `api_key` VARCHAR(32) UNIQUE DEFAULT SUBSTRING(MD5(RAND()), 1, 32) 
);


CREATE TABLE `articles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL DEFAULT 'Unnamed article',
  `title` VARCHAR(200) NOT NULL DEFAULT 'Untittled article',
  `keywords` TEXT NOT NULL DEFAULT 'General, Tech',
  `description` TEXT NOT NULL DEFAULT 'Empty description',
  `image_type` VARCHAR(200) NOT NULL DEFAULT 'image_url',
  `image` TEXT DEFAULT NULL,
  `is_publish` BOOLEAN NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `user_id_name_unique` (`user_id`,`name`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `sections` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `article_id` INT NOT NULL,
  `sequence` INT NOT NULL DEFAULT 0,
  `content` TEXT NOT NULL,
  `image` TEXT DEFAULT NULL,
  `content_type` VARCHAR(200) NOT NULL DEFAULT 'paragraph',
  FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE CASCADE
);

CREATE TABLE `styles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `section_id` INT UNIQUE NOT NULL,
  `width` VARCHAR(50) NOT NULL DEFAULT '100%',
  `height` VARCHAR(50) NOT NULL DEFAULT '100%',
  `font_size` VARCHAR(50) NOT NULL DEFAULT '1rem',
  `font_weight` VARCHAR(50) NOT NULL DEFAULT '400',
  `font_family` VARCHAR(50) NOT NULL DEFAULT 'sans-serif',
  `line_height` VARCHAR(50) NOT NULL DEFAULT '1rem',
  `margin_top` VARCHAR(50) NOT NULL DEFAULT '0.25rem',
  `text_align` VARCHAR(50) NOT NULL DEFAULT 'left',
  `text_color` VARCHAR(50) NOT NULL DEFAULT 'white',
  `border_radius` VARCHAR(50) NOT NULL DEFAULT '0px',
  FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE
);

CREATE TABLE `article_keywords` (
	`id` INT AUTO_INCREMENT PRIMARY KEY,
	`category` VARCHAR(255),
	`keyword` VARCHAR(255),
	UNIQUE KEY `category_keyword` (`category`,`keyword`)
);

INSERT INTO `article_keywords` (`category`,`keyword`) VALUES
('General','Tech'), ('General','Web'), ('General','Mobile'),('General','FrontEnd'), ('General','BackEnd'),
('Languages','Javascript'), ('Languages','Typescript'), ('Languages','Python'), ('Languages','Java'), 
('Frontend','React'), ('Frontend','Next'), ('Frontend','Vue'), ('Frontend','Angular'), ('Frontend','Svelte'),
('Backend','Node'), ('Backend','Bun'), ('Backend','SpringBoot'), ('Backend','Flask'), 
('Devops','AWS'), ('Devops','Azure'), ('Devops','Google Cloud'), ('Devops','Docker'), ('Devops','Kubernetes');

INSERT INTO `users` (`name`, `password`, `email`, `author`) VALUES
('Usuario0', '$2a$10$JS3bJ7sGRCPOW2hi2jBCserm5vDYwxKtLHQJtJXJuhqHINw96IUGK', 'algo@gmail.com', 'Nombre0'),
('Usuario1', '$2a$10$dm3yz.bWif29TEqRnOm/Vu/TWbBCbN09BbHfoldm33BhGnQIh6hsW', 'algo1@gmail.com', 'Nombre1');

INSERT INTO `articles` (`user_id`, `name`, `is_publish`) VALUES
((SELECT `id` FROM `users` WHERE `name` = 'Usuario0'), 'My Article 1', 1),
((SELECT `id` FROM `users` WHERE `name` = 'Usuario0'), 'My Article 2', 0),
((SELECT `id` FROM `users` WHERE `name` = 'Usuario1'), 'My Article 1 (test account)', 0),
((SELECT `id` FROM `users` WHERE `name` = 'Usuario1'), 'My Article 2 (test account)', 1);

INSERT INTO `sections` (`article_id`, `content`, `content_type`) 
VALUES
(
    (
        SELECT `id` 
        FROM `articles` 
        WHERE `name` = 'My Article 1' 
        AND `user_id` = (
            SELECT `id` 
            FROM `users` 
            WHERE `name` = 'Usuario0'
        )
    ), 'Title (My Article 1)', 'title'
),
(
    (
        SELECT `id` 
        FROM `articles` 
        WHERE `name` = 'My Article 1' 
        AND `user_id` = (
            SELECT `id` 
            FROM `users` 
            WHERE `name` = 'Usuario0'
        )
    ), 'Subtitle (My Article 1)', 'subtitle'
),
(
    (
        SELECT `id` 
        FROM `articles` 
        WHERE `name` = 'My Article 2' 
        AND `user_id` = (
            SELECT `id` 
            FROM `users` 
            WHERE `name` = 'Usuario0'
        )
    ), 'Title (My Article 2)', 'title'
),
(
    (
        SELECT `id` 
        FROM `articles` 
        WHERE `name` = 'My Article 2' 
        AND `user_id` = (
            SELECT `id` 
            FROM `users` 
            WHERE `name` = 'Usuario0'
        )
    ), 'Subtitle (My Article 2)', 'subtitle'
);

INSERT INTO `styles` (`section_id`, `font_size`, `text_color`) 
VALUES
(
	(
        SELECT `id` 
        FROM `sections` 
        WHERE `content` = 'Title (My Article 1)' 
        AND `article_id` = (
            SELECT `id` 
            FROM `articles` 
            WHERE `name` = 'My Article 1' 
            AND `user_id` = (
                SELECT `id` 
                FROM `users` 
                WHERE `name` = 'Usuario0'
            )
        ) 
        ORDER BY `id` DESC 
        LIMIT 1
    ),'18px', 'red'
),
(
    (
        SELECT `id` 
        FROM `sections` 
        WHERE `content` = 'Subtitle (My Article 1)' 
        AND `article_id` = (
            SELECT `id` 
            FROM `articles` 
            WHERE `name` = 'My Article 1' 
            AND `user_id` = (
                SELECT `id` 
                FROM `users` 
                WHERE `name` = 'Usuario0'
            )
        ) 
        ORDER BY `id` DESC 
        LIMIT 1
    ), '20px', 'yellow'
),
(
    (
        SELECT `id` 
        FROM `sections` 
        WHERE `content` = 'Title (My Article 2)' 
        AND `article_id` = (
            SELECT `id` 
            FROM `articles` 
            WHERE `name` = 'My Article 2' 
            AND `user_id` = (
                SELECT `id` 
                FROM `users` 
                WHERE `name` = 'Usuario0'
            )
        ) 
        ORDER BY `id` DESC 
        LIMIT 1
    ), '20px', 'blue'
),
(
    (
        SELECT `id` 
        FROM `sections` 
        WHERE `content` = 'Subtitle (My Article 2)' 
        AND `article_id` = (
            SELECT `id` 
            FROM `articles` 
            WHERE `name` = 'My Article 2' 
            AND `user_id` = (
                SELECT `id` 
                FROM `users` 
                WHERE `name` = 'Usuario0'
            )
        ) 
        ORDER BY `id` DESC 
        LIMIT 1
    ), '18px', 'green'
);

SELECT * FROM `users`;
SELECT * FROM `articles`;
SELECT * FROM `sections`;
SELECT * FROM `styles`;