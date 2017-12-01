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
  INDEX (`username`),
  UNIQUE KEY  (`email`),
  PRIMARY KEY  (`user_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;




DROP  TABLE IF EXISTS `sec_roles`;
CREATE TABLE `sec_roles` (
  `role_id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  INDEX (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
