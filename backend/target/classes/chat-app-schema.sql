-- -----------------------------------------------------
-- Schema ChatApp
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `chatapp`;

CREATE SCHEMA `chatapp`;
USE `chatapp` ;


-- -----------------------------------------------------
-- Table `chatapp`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chatapp`.`user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(50) NOT NULL unique,
  `email` VARCHAR(50) NOT NULL unique,
  `profile_pic_url` VARCHAR(512),
  `password` char(68) NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(1024),
  #`friend_request_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
  
  #KEY `fk_friend_request` (`friend_request_id`),
  #CONSTRAINT `fk_friend_request` FOREIGN KEY (friend_request_id) REFERENCES `friend_request` (`id`)
) 
ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- passwords are encrypted using BCrypt
--
-- generation tool is available at: https://www.bcryptcalculator.com/
-- $2a$10$aMD25iNwLVcO.ESl7NKCWesPoXljsAddjnltWKRTJ/fUVdPeXhExO
-- In this example, the default password for every user is 123lol


INSERT INTO user(user_name, email, profile_pic_url , password, first_name, last_name, description) 
	VALUES('podro', 'podro@kek.com', 'https://bordalo.observador.pt/500x,q85/https://s3.observador.pt/wp-content/uploads/2019/03/13083706/mazda3_hb_polymetal_action-14_770x433_acf_cropped.jpg' ,'$2a$10$aMD25iNwLVcO.ESl7NKCWesPoXljsAddjnltWKRTJ/fUVdPeXhExO', 'podro', 'podra', 'blah blah blah fictitious user yada yada');
INSERT INTO user(user_name, email, profile_pic_url , password, first_name, last_name, description)  
	VALUES('bbyoda', 'bbyoda@kek.com', 'https://sm.ign.com/t/ign_pt/news/b/baby-yoda-/baby-yoda-sipping-soup-is-twitters-new-meme-able-moment_q3c4.h720.jpg' , '$2a$10$aMD25iNwLVcO.ESl7NKCWesPoXljsAddjnltWKRTJ/fUVdPeXhExO', 'baby', 'yoda', 'me baby yoda can be touched not by you');
INSERT INTO user(user_name, email, profile_pic_url , password, first_name, last_name, description) 
	VALUES('codsux', 'codsux@kek.com', 'https://external-preview.redd.it/2rf07STaikt8u9PcC_EaK9L-dk-6SIHxNok6ZNw37Q8.jpg?auto=webp&s=ab04bd1126b57fba43c47827ea2a95552189c35d' ,'$2a$10$aMD25iNwLVcO.ESl7NKCWesPoXljsAddjnltWKRTJ/fUVdPeXhExO', 'codsux', 'nobueno', 'go play a gud game');


-- -----------------------------------------------------
-- Table `chatapp`.`friend_request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chatapp`.`friend_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` DATETIME,
  `is_accepted` bool,
  `requester_id` int(11) NOT NULL,
  `requested_to_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  
  KEY `fk_user_requester` (`requester_id`),
  CONSTRAINT `fk_user_requester` FOREIGN KEY  (requester_id) REFERENCES `user` (`id`),
  KEY `fk_user_requested_to` (`requested_to_id`),
  CONSTRAINT `fk_user_requested_to` FOREIGN KEY  (requested_to_id) REFERENCES `user` (`id`)
) 
ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


INSERT INTO friend_request(date, is_accepted, requester_id, requested_to_id) 
	VALUES('2019-09-01 13:11:56', false, 1, 2);
INSERT INTO friend_request(date, is_accepted, requester_id, requested_to_id) 
	VALUES('2018-09-01 15:11:56', true, 2, 3);


CREATE TABLE IF NOT EXISTS `chatapp`.`post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_post` DATETIME,
  `content` VARCHAR(512) NULL DEFAULT NULL,
  `poster_id` int(11) NOT NULL,
  `parent_post_id` int(11),
  #`child_post_id` int(11) NOT NULL,
  
  PRIMARY KEY (`id`),
  
  KEY `fk_poster` (`poster_id`),
  CONSTRAINT `fk_poster` FOREIGN KEY (poster_id) REFERENCES `user` (`id`),
  KEY `fk_parent_post` (`parent_post_id`),
  CONSTRAINT `fk_parent_post` FOREIGN KEY (parent_post_id) REFERENCES `post` (`id`)
  #KEY `fk_child_post` (`child_post_id`),
  #CONSTRAINT `fk_child_post` FOREIGN KEY (child_post_id) REFERENCES `post` (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

INSERT INTO post(date_post, content, poster_id, parent_post_id) 
	VALUES('2020-11-01 11:30:45', 'TEST TEST TEST KEK TEST TEST TEST', 1 , null);
INSERT INTO post(date_post, content, poster_id, parent_post_id) 
	VALUES('2020-11-01 11:30:45', 'TEST2TEST2TEST2 LOLOLOLOLOLOLOLOL', 1 , null);
INSERT INTO post(date_post, content, poster_id, parent_post_id) 
	VALUES('2020-11-01 23:11:56', 'TEST2 TEST2 TEST2 BUR TEST2 TEST2 TEST2', 1 , 1);
INSERT INTO post(date_post, content, poster_id, parent_post_id) 
	VALUES('2020-11-02 05:11:56', 'TEST2 CHILD', 1 , 2);
INSERT INTO post(date_post, content, poster_id, parent_post_id) 
	VALUES('2019-03-01 11:11:56', 'testesttest test test test ', 2 ,  null);

CREATE TABLE `chatapp`.`roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45),
  
  PRIMARY KEY (`id`),
  
  UNIQUE KEY `TITLE_UNIQUE` (`name`)
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');


CREATE TABLE `chatapp`.`user_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  
  PRIMARY KEY (`user_id`,`role_id`),
  
  KEY `FK_USER_idx` (`user_id`),
  
  CONSTRAINT `FK_ROLE` FOREIGN KEY (`role_id`) 
  REFERENCES `roles` (`id`) 
  ON DELETE NO ACTION ON UPDATE NO ACTION,
  
  CONSTRAINT `FK_USER_m2m` FOREIGN KEY (`user_id`) 
  REFERENCES `user` (`id`) 
  ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
 
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO user_roles(user_id, role_id) VALUES(1, 1);
INSERT INTO user_roles(user_id, role_id) VALUES(2, 1);
INSERT INTO user_roles(user_id, role_id) VALUES(3, 1);
INSERT INTO user_roles(user_id, role_id) VALUES(3, 2);
INSERT INTO user_roles(user_id, role_id) VALUES(2, 3);



