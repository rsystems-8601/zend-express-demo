-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 24, 2018 at 03:07 PM
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
  `end_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` int(1) NOT NULL DEFAULT '0' COMMENT '1: deleted, 0: default',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `username`, `reason`, `booking_date`, `end_time`, `is_deleted`) VALUES
(1, 'sasadd', 'asasdd', '2018-08-16 00:00:00', '2018-08-22 12:27:29', 1),
(2, 'Anil', 'asdss', '2018-08-12 00:00:00', '2018-08-22 12:27:29', 1),
(3, 'asdas', 'dasdasd', '2018-08-03 00:00:00', '2018-08-22 12:27:29', 1),
(4, 'Anil', 'asdss', '2018-08-12 00:00:00', '2018-08-22 12:27:29', 1),
(5, 'asdasd', 'asdasd', '2018-08-08 00:00:00', '2018-08-22 12:27:29', 1),
(6, 'asdf', 'asdfasdf', '2018-08-16 00:00:00', '2018-08-22 12:27:29', 1),
(7, 'safasdf asdfasdfasdf', 'asdf asdfsadf', '2018-08-24 00:00:00', '2018-08-22 12:27:29', 1),
(8, 'sdf', 'sdfsdf', '2018-08-02 04:05:00', '2018-08-22 12:27:29', 1),
(9, 'asd', 'asdas', '2018-08-02 05:06:00', '2018-08-22 12:27:29', 1),
(10, 'aaaaa', 'aaa', '2018-08-02 00:00:00', '2018-08-22 12:27:29', 1),
(11, 'David Williamss', 'Knee transplant inquiry', '2018-01-31 01:01:00', '2018-08-22 12:27:29', 1),
(12, 'Kavin Smith12', 'Parkinsons related inquiry.', '2018-01-01 01:01:00', '2018-08-22 12:27:29', 0),
(13, 'Laura', 'Facial surgery', '2018-08-24 01:01:00', '2018-08-22 12:27:29', 0),
(14, 'asdasd', 'asdasd', '2018-08-01 05:06:00', '2018-08-22 12:27:29', 1),
(15, 'asdasd', 'asdasd', '2018-08-17 01:00:00', '2018-08-22 12:27:29', 1),
(16, 'asdasd', 'asdasd', '2018-08-01 05:06:00', '2018-08-22 12:27:29', 1),
(17, 'asdasd', 'asdasd', '2018-08-01 05:06:00', '2018-08-22 12:27:29', 1),
(18, 'Vimaldeep Singh Lamba', 'e12e2112e', '2018-08-09 01:59:00', '2018-08-22 12:27:29', 1),
(19, 'Vimaldeep Singh Lamba3', 'test', '2018-08-03 12:59:00', '2018-08-22 12:27:29', 1),
(20, 'John Thomas', 'Headache', '2018-01-01 01:00:00', '2018-08-22 12:27:29', 1),
(21, 'Ajai', 'For eye test', '2021-08-20 17:31:00', '2018-08-22 12:27:29', 1),
(22, 'Ajai', 'dfg', '2018-08-10 12:17:00', '2018-08-22 12:27:29', 1),
(23, 'www', 'wwww', '2018-08-24 16:10:00', '2018-08-24 16:25:00', 1),
(24, 'asd', 'asd', '2018-08-24 14:58:00', '2018-08-24 15:13:00', 1),
(25, 'Lukeman', 'fantatsic', '2018-08-26 02:58:00', '2018-08-24 15:13:00', 1),
(26, 'asdasd', 'asdasd', '2018-08-24 16:48:00', '2018-08-24 17:03:00', 1),
(27, 'asd', 'asd', '2018-08-24 17:01:00', '2018-08-24 17:16:00', 1),
(28, 'aaaa', 'gdfgdfg', '2018-08-24 05:40:00', '2018-08-24 17:55:00', 0),
(29, 'sssw', 'ss', '2018-08-24 06:03:00', '2018-08-24 18:18:00', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
