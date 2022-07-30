-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2022 at 02:12 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_virtual_shop`
--
CREATE DATABASE IF NOT EXISTS `my_virtual_shop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `my_virtual_shop`;

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `charger`
--

CREATE TABLE `charger` (
  `product_id` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL,
  `fast_charger` varchar(10) NOT NULL,
  `no_of_usb_ports` int(11) NOT NULL,
  `connectivity` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `earphone`
--

CREATE TABLE `earphone` (
  `product_id` varchar(255) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `connectivity` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `featurephone`
--

CREATE TABLE `featurephone` (
  `feature_phone_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `standby_days` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `featurephoneconnectivity`
--

CREATE TABLE `featurephoneconnectivity` (
  `feature_phone_id` varchar(255) NOT NULL,
  `connectivity` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `description` varchar(255) NOT NULL,
  `published_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `shop_id` varchar(255) NOT NULL,
  `enabled_status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `productimage`
--

CREATE TABLE `productimage` (
  `product_id` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `image_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `secretcodeemail`
--

CREATE TABLE `secretcodeemail` (
  `email` varchar(255) NOT NULL,
  `code` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `secretcodephoneno`
--

CREATE TABLE `secretcodephoneno` (
  `phone_number` varchar(15) NOT NULL,
  `code` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `shop_id` varchar(255) NOT NULL,
  `shop_name` varchar(255) NOT NULL,
  `location` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `joined_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `enabled_status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `smartphone`
--

CREATE TABLE `smartphone` (
  `smart_phone_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `year` year(4) NOT NULL,
  `memory` varchar(10) NOT NULL,
  `storage` varchar(10) NOT NULL,
  `front_camera` varchar(10) NOT NULL,
  `rear_camera` varchar(10) NOT NULL,
  `battery_capacity` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `smartphonesensors`
--

CREATE TABLE `smartphonesensors` (
  `smart_phone_id` varchar(255) NOT NULL,
  `sensors` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `charger`
--
ALTER TABLE `charger`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `earphone`
--
ALTER TABLE `earphone`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `featurephone`
--
ALTER TABLE `featurephone`
  ADD PRIMARY KEY (`feature_phone_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `featurephoneconnectivity`
--
ALTER TABLE `featurephoneconnectivity`
  ADD PRIMARY KEY (`feature_phone_id`,`connectivity`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `productimage`
--
ALTER TABLE `productimage`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `secretcodeemail`
--
ALTER TABLE `secretcodeemail`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `secretcodephoneno`
--
ALTER TABLE `secretcodephoneno`
  ADD PRIMARY KEY (`phone_number`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`shop_id`),
  ADD UNIQUE KEY `phone_number` (`phone_number`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `smartphone`
--
ALTER TABLE `smartphone`
  ADD PRIMARY KEY (`smart_phone_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `smartphonesensors`
--
ALTER TABLE `smartphonesensors`
  ADD PRIMARY KEY (`smart_phone_id`,`sensors`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `charger`
--
ALTER TABLE `charger`
  ADD CONSTRAINT `Charger_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `earphone`
--
ALTER TABLE `earphone`
  ADD CONSTRAINT `Earphone_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `featurephone`
--
ALTER TABLE `featurephone`
  ADD CONSTRAINT `FeaturePhone_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `featurephoneconnectivity`
--
ALTER TABLE `featurephoneconnectivity`
  ADD CONSTRAINT `FeaturePhoneConnectivity_ibfk_1` FOREIGN KEY (`feature_phone_id`) REFERENCES `featurephone` (`feature_phone_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productimage`
--
ALTER TABLE `productimage`
  ADD CONSTRAINT `ProductImage_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `smartphone`
--
ALTER TABLE `smartphone`
  ADD CONSTRAINT `SmartPhone_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `smartphonesensors`
--
ALTER TABLE `smartphonesensors`
  ADD CONSTRAINT `SmartPhoneSensors_ibfk_1` FOREIGN KEY (`smart_phone_id`) REFERENCES `smartphone` (`smart_phone_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
