-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2025 at 12:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `voting`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'admin1', 'admin1@gmail.com', '$2y$10$1WYwjIS.zFePN84VZ99UO.hihKzrohyL2rZKO.bPvjX74eiDBEB5e', '2025-02-11 06:37:14'),
(4, 'admin', 'admin@gmail.com', '$2y$10$/XwzEioX47XHCqR7OX/MmuhKQShyzL9PRjAy.cYz64VwdE6oLalw2', '2025-02-20 12:08:21');

-- --------------------------------------------------------

--
-- Table structure for table `candidates`
--

CREATE TABLE `candidates` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `candidate_name` varchar(255) NOT NULL,
  `candidate_image` varchar(255) NOT NULL,
  `candidate_symbol_image` varchar(255) NOT NULL,
  `candidate_index` int(11) NOT NULL,
  `button_checked` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidates`
--

INSERT INTO `candidates` (`id`, `user_id`, `candidate_name`, `candidate_image`, `candidate_symbol_image`, `candidate_index`, `button_checked`) VALUES
(14, 26, 'sdzfs', 'candidate_1739966495933.jpg', 'symbol_1739966495572.jpg', 1, 0),
(15, 26, 'dscfsd', 'candidate_1739966503168.jpg', 'symbol_1739966503346.jpg', 3, 1),
(19, 3, 'Satyam', 'candidate_1740377193862.jpg', 'symbol_1740377193674.jpg', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sub_admins`
--

CREATE TABLE `sub_admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `election_symbol` varchar(255) DEFAULT NULL,
  `party_symbol` varchar(255) NOT NULL,
  `date` date DEFAULT NULL,
  `start_time` varchar(10) DEFAULT NULL,
  `end_time` varchar(10) DEFAULT NULL,
  `user_link` varchar(255) NOT NULL,
  `month_hindi` varchar(20) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_admins`
--

INSERT INTO `sub_admins` (`id`, `name`, `password`, `address`, `phone_number`, `election_symbol`, `party_symbol`, `date`, `start_time`, `end_time`, `user_link`, `month_hindi`, `year`, `status`) VALUES
(1, 'sdffffc', '12345', 'rfgvdf', '123456', 'uploads/1739877008_bjp-kamal-logo-front-website-800x800.jpg', 'edcsa', '2025-02-13', '04:31', '04:31', 'http://localhost:5173/sdffffc', 'फरवरी', 2025, 0),
(2, 'sdfcsd', '12345', 'sdcvfds', '432432423', 'uploads/1739879582_bjp-kamal-logo-front-website-800x800.jpg', 'dfgvfd', '2025-02-18', '05:22 AM', '05:23 AM', 'http://localhost:5173/sdfcsd', 'फरवरी', 2025, 0),
(3, 'Aman', '12345', 'doon', '123698745', 'uploads/1739880115_bjp-kamal-logo-front-website-800x800.jpg', 'कमल', '2025-02-19', '05:34', '05:31', 'http://localhost:5173/aman', 'फरवरी', 2025, 0),
(26, 'xdcvx4254', '32432', 'sdfgbsdf', '234234254', 'uploads/1739964351_bjp-kamal-logo-front-website-800x800.jpg', 'srtgr', '2025-02-13', '04:55 AM', '04:55 PM', 'http://localhost:5173/xdcvx4254', 'फरवरी', 2025, 0),
(27, 'dsc2424', 'dfdv', 'dsfvsd', '23432424', 'uploads/1740131524_bjp-kamal-logo-front-website-800x800.jpg', 'dfv', '2025-02-19', '03:24 AM', '07:22 PM', 'http://localhost:5173/dsc2424', 'फरवरी', 2025, 0);

-- --------------------------------------------------------

--
-- Table structure for table `userlogin`
--

CREATE TABLE `userlogin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userlogin`
--

INSERT INTO `userlogin` (`id`, `username`, `email`, `phone`, `password`, `created_at`) VALUES
(1, 'satyam', 'satyam@gmail.com', '', '$2y$10$1LhGHxVBP2uVPXlpxbaHyurMRPA.j4aoVuZx2jH/oqopZfkv/ehze', '2025-02-12 07:14:07'),
(2, 'Rohit', 'rohit@gmail.com', '', '$2y$10$SY/PgUX6ZAFeYcED3PEIHOd3DlHis2ZUyakmBXUdUZkXGsgvQuXSW', '2025-02-12 07:22:16'),
(3, 'Aman', 'aman@gmail.com', '', '$2y$10$hOZjPs60e9Ttr.2s5dR.NejLMN4E5ZB6wzF.1/b1of1T1wcMVUiYS', '2025-02-12 07:25:14'),
(4, 'Rahul chauhan', 'rahul@gmail.com', '324234324', '$2y$10$Vpf.VFNyJv/GjAtOrBD/4.gHEWuGjsB1cckVaqknz820WSTCtrkmm', '2025-02-12 07:33:32'),
(5, 'Amit chauhan', 'amit@gmail.com', '565464645555', '$2y$10$9ohofwXye9jZ0jaaXEd8Suo8.7JkZiaCycdI7VB64RMPqTpWvrkVS', '2025-02-12 07:35:03'),
(6, 'shivam singh', 'shivam@gmail.com', '9876567854', '$2y$10$y.P08UNIEx6Ak3s6YOUrT.HlAZyC.SmNpZsw1b7NdAMHWNDsu1QWO', '2025-02-15 05:48:22'),
(7, 'sarika testing', 'sarikabisht503@gmail.com', '09876567854', '$2y$10$QUJqVBUwxrxwa.9t6zwhQuitCUhTb4h6wL5PPgHqeLuKPsEdE8tfa', '2025-02-15 05:54:26'),
(8, 'sarika bisht', 'sarikabisht501@gmail.com', '09876567854', '$2y$10$AaXw78RLV6ONMPF4/mJWBeZ3PVRJsWh67qrJsrN/nbyG3AmVC48.G', '2025-02-15 09:06:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sub_admins`
--
ALTER TABLE `sub_admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userlogin`
--
ALTER TABLE `userlogin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `candidates`
--
ALTER TABLE `candidates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `sub_admins`
--
ALTER TABLE `sub_admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `userlogin`
--
ALTER TABLE `userlogin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `candidates`
--
ALTER TABLE `candidates`
  ADD CONSTRAINT `candidates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `sub_admins` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
