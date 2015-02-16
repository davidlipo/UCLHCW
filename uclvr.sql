-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 16, 2015 at 05:07 PM
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
  `level` int(3) NOT NULL,
  PRIMARY KEY (`attemptID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `attempts`
--

INSERT INTO `attempts` (`attemptID`, `patientID`, `time`, `level`) VALUES
(1, 1, '2015-02-16 00:00:00', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `patientstats`
--

INSERT INTO `patientstats` (`ID`, `attemptID`, `type`, `laneNo`, `collected`, `timeTaken`) VALUES
(1, 1, 'coin', 1, 1, 2),
(2, 1, 'coin', 2, 1, 4),
(3, 1, 'coin', -1, 0, 0),
(4, 1, 'coin', -2, 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
