-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 18, 2018 at 02:14 PM
-- Server version: 5.7.19
-- PHP Version: 7.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zf2`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
CREATE TABLE IF NOT EXISTS `album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `artist` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`id`, `title`, `artist`) VALUES
(1, 'Blog #1', 'Welcome to my first blog post'),
(2, 'Blog #2', 'Welcome to my second blog post'),
(3, 'Blog #3', 'Welcome to my third blog post'),
(4, 'Blog #4', 'Welcome to my fourth blog post'),
(5, 'Blog #5', 'Welcome to my fifth blog post');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `text`) VALUES
(1, 'Blog #1', 'Welcome to my first blog post'),
(2, 'Blog #2', 'Welcome ssto my second blog post'),
(3, 'Blog #3', 'Welcome to my third blog post'),
(4, 'Blog #4', 'Welcome to my fourth blog post'),
(5, 'Blog #5', 'Welcome to my fifth blog post');

-- --------------------------------------------------------

--
-- Table structure for table `user_booking`
--

DROP TABLE IF EXISTS `user_booking`;
CREATE TABLE IF NOT EXISTS `user_booking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL,
  `reason` text NOT NULL,
  `bookingdate` date DEFAULT NULL,
  `is_deleted` int(1) NOT NULL DEFAULT '0' COMMENT '1: deleted, 0: default',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_booking`
--

INSERT INTO `user_booking` (`id`, `username`, `reason`, `bookingdate`, `is_deleted`) VALUES
(14, 'asdasd', 'asdasd', '2018-08-01', 1),
(15, 'asdasd', 'asdasd', '2018-08-17', 1),
(20, 'asasd', 'asdasd', '2018-08-18', 0),
(24, '6', '5', '2018-08-09', 0),
(25, '6', '5', '2018-08-09', 0),
(26, 'dasd', 'as', '2018-08-04', 0),
(27, 'dasd', 'as', '2018-08-04', 0),
(28, 'dasd', 'as', '2018-08-04', 0),
(29, 'dasdasd', 'asasd', '2018-08-08', 0),
(30, 'dasdasd', 'asasd', '2018-08-08', 0),
(31, 'dasd', 'as', '2018-08-12', 0),
(32, 'dasd', 'as', '2018-08-12', 0),
(33, 'dasd', 'as', '2018-08-12', 0),
(34, 'dasd', 'as', '2018-08-12', 0),
(35, 'dasd', 'as', '2018-08-12', 0),
(36, 'dasd', 'as', '2018-08-12', 0),
(37, 'dasd', 'as', '2018-08-12', 0),
(38, 'dasd', 'as', '2018-08-12', 0),
(39, 'dasd', 'as', '2018-08-12', 0),
(40, 'dasd', 'as', '2018-08-12', 0),
(41, 'dasd', 'as', '2018-08-12', 0),
(42, 'dasd', 'as', '2018-08-12', 0),
(43, 'dasd', 'as', '2018-08-12', 0),
(44, 'dasd', 'as', '2018-08-12', 0),
(45, 'dasd', 'as', '2018-08-12', 0),
(46, 'dasd', 'as', '2018-08-12', 0),
(47, 'dasd', 'as', '2018-08-13', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
