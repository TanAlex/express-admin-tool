DROP  TABLE IF EXISTS `sec_users`;
CREATE TABLE `sec_users` (
  `user_id` int(10) unsigned NOT NULL auto_increment,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(20) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `social_id` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `roles` varchar(255) DEFAULT NULL, -- JSON string of roles, eg: {admin, editor, user}
  `actcode` varchar(255) DEFAULT NULL,
  `disabled` tinyint(1) NOT NULL default '0',
  `activated` tinyint(1) NOT NULL default '0',
  `register_date` datetime,
  INDEX (`username`),
  UNIQUE KEY  (`email`),
  PRIMARY KEY  (`user_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `sec_users` (`user_id`,`username`,`password`,`salt`,`phone`,`social_id`,`email`,`roles`,`actcode`,`disabled`,`activated`,`register_date`) VALUES (1,'ttan','189351fed18cf0615778a9026a5f8709a1c8ef4d694f4cff67188da6e14336934280d3ca8a1e25588c6308c15a7b79b2e4dd8b802c1c88d7a503007bfe4960e8','0dc718502c542417','2588053',NULL,'tantingli@gmail.com','["admin"]',NULL,0,1,now());





DROP  TABLE IF EXISTS `sec_roles`;
CREATE TABLE `sec_roles` (
  `role_id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  INDEX (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
