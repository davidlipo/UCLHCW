-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 13, 2015 at 12:26 AM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `uclvr`
--
CREATE DATABASE IF NOT EXISTS `uclvr` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `uclvr`;

-- --------------------------------------------------------

--
-- Table structure for table `attempts`
--

CREATE TABLE IF NOT EXISTS `attempts` (
  `attemptID` int(4) NOT NULL AUTO_INCREMENT,
  `patientID` int(5) NOT NULL,
  `time` datetime NOT NULL,
  `levelLeft` int(3) NOT NULL,
  `levelRight` int(3) NOT NULL,
  PRIMARY KEY (`attemptID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `attempts`
--

INSERT INTO `attempts` (`attemptID`, `patientID`, `time`, `levelLeft`, `levelRight`) VALUES
(1, 1, '2015-02-16 00:00:00', 1, 1),
(2, 0, '2015-03-11 23:26:55', 1, 1),
(3, 9, '2015-03-11 23:31:15', 1, 1),
(4, 5, '2015-03-11 23:40:03', 1, 1),
(5, 4, '2015-03-11 23:40:22', 1, 1),
(6, 0, '2015-03-12 21:42:22', 1, 1),
(7, 0, '2015-03-12 23:33:42', 1, 1),
(8, 0, '2015-03-12 23:46:00', 1, 1),
(9, 0, '2015-03-12 23:46:07', 1, 1),
(10, 0, '2015-03-12 23:59:57', 1, 1),
(11, 0, '2015-03-13 00:21:19', 1, 1),
(12, 0, '2015-03-13 00:21:54', 1, 1),
(13, 0, '2015-03-13 00:22:07', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `patientstats`
--

CREATE TABLE IF NOT EXISTS `patientstats` (
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  `attemptID` int(4) NOT NULL,
  `type` varchar(10) NOT NULL,
  `laneNo` int(2) NOT NULL,
  `collected` int(1) NOT NULL,
  `timeTaken` float NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `patientstats`
--

INSERT INTO `patientstats` (`ID`, `attemptID`, `type`, `laneNo`, `collected`, `timeTaken`) VALUES
(1, 1, 'coin', 1, 1, 2),
(2, 1, 'coin', 2, 1, 4),
(3, 1, 'coin', -1, 0, 0),
(4, 1, 'coin', -2, 0, 0),
(5, 7, 'coin', -1, 1, 1.86916),
(6, 7, 'coin', 1, 1, 0.404292),
(7, 9, 'coin', 0, 1, 0.02),
(8, 10, 'coin', 0, 1, 0.02),
(9, 11, 'wall', -1, 1, 2.10696),
(10, 11, 'wall', 0, 1, 0.0173015),
(11, 11, 'coin', 1, 1, 1.27466),
(12, 11, 'coin', 0, 1, 0.0165661),
(13, 13, 'coin', 0, 1, 0.02),
(14, 13, 'coin', 1, 1, 3.56165);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
