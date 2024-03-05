DROP DATABASE IF EXISTS `personal_blog_test`;

CREATE DATABASE `personal_blog_test`;

USE `personal_blog_test`;

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
  `image_url` TEXT DEFAULT NULL,
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
	`keyword` VARCHAR(255) UNIQUE
);

INSERT INTO `article_keywords` (`category`,`keyword`) VALUES
('General','Tech'), ('General','Web'), ('General','Mobile'),('General','FrontEnd'), ('General','BackEnd'),
('Languages','Javascript'), ('Languages','Typescript'), ('Languages','Python'), ('Languages','Java'), 
('Frontend','React'), ('Frontend','Next'), ('Frontend','Vue'), ('Frontend','Angular'), ('Frontend','Svelte'),
('Backend','Node'), ('Backend','Bun'), ('Backend','SpringBoot'), ('Backend','Flask'), 
('Devops','AWS'), ('Devops','Azure'), ('Devops','Google Cloud'), ('Devops','Docker'), ('Devops','Kubernetes');