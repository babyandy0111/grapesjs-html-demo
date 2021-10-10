CREATE TABLE IF NOT EXISTS `grapes_template` (
    `id` int(20) NOT NULL AUTO_INCREMENT,
    `assets` TEXT NOT NULL DEFAULT '[]',
    `components` TEXT NOT NULL DEFAULT '[]',
    `css` TEXT NOT NULL DEFAULT ' ',
    `html` TEXT NOT NULL DEFAULT ' ',
    `styles` TEXT NOT NULL DEFAULT '[]',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ;
