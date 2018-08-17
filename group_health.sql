-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 17, 2018 at 09:06 AM
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
-- Database: `group_health`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL,
  `reason` text NOT NULL,
  `booking_date` datetime NOT NULL,
  `is_deleted` int(1) NOT NULL DEFAULT '0' COMMENT '1: deleted, 0: default',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `username`, `reason`, `booking_date`, `is_deleted`) VALUES
(1, 'sasadd', 'asasdd', '2018-08-16 00:00:00', 1),
(2, 'Anil', 'asdss', '2018-08-12 00:00:00', 1),
(3, 'asdas', 'dasdasd', '2018-08-03 00:00:00', 1),
(4, 'Anil', 'asdss', '2018-08-12 00:00:00', 1),
(5, 'asdasd', 'asdasd', '2018-08-08 00:00:00', 1),
(6, 'asdf', 'asdfasdf', '2018-08-16 00:00:00', 1),
(7, 'safasdf asdfasdfasdf', 'asdf asdfsadf', '2018-08-24 00:00:00', 1),
(8, 'sdf', 'sdfsdf', '2018-08-02 04:05:00', 0),
(9, 'asd', 'asdas', '2018-08-01 00:00:00', 0),
(10, 'aaaaa', 'aaa', '2018-08-02 00:00:00', 0),
(11, '64654', 'asdasd', '2018-08-02 10:45:00', 0),
(12, 'www', 'asdasd', '2018-08-07 04:05:00', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
