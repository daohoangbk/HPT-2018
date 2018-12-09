-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 09, 2018 at 10:38 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hpt20182`
--

-- --------------------------------------------------------

--
-- Table structure for table `bidding`
--

CREATE TABLE `bidding` (
  `id` int(11) NOT NULL,
  `bidder` varchar(255) NOT NULL,
  `bid` double NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bidding`
--

INSERT INTO `bidding` (`id`, `bidder`, `bid`, `product_id`) VALUES
(3, '0xf17f52151EbEF6C7334FAD080c5704D77216b732', 6, 43);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `price` double NOT NULL,
  `created_date` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `image`, `name`, `description`, `price`, `created_date`) VALUES
(18, 'localhost/hpt/assets/IMG20181010234703.jpg', 'Đào hoàng', 'asdfe', 2, 1544297272),
(19, 'http://localhost/hpt/assets/1544327833', 'fsfa', 'efsfas d', 2, 1544327834),
(20, 'http://localhost/hpt/assets/1544329494', 'Đào hoàng', 'fefsf', 4, 1544329494),
(21, 'http://localhost/hpt/assets/1544329524', 'safe', 'sfeasf', 2, 1544329524),
(22, 'http://localhost/hpt/assets/1544330085', 'Đào hoàng', 'sdfs', 3, 1544330085),
(23, 'http://localhost/hpt/assets/1544330312', 'fsfef', 'wrwerw', 5, 1544330312),
(24, 'http://localhost/hpt/assets/1544330381', 'asfe', 'fsfefsf', 4, 1544330381),
(25, 'http://localhost/hpt/assets/1544334587', 'fsdfefsdf', 'aewfasd fasd ', 5, 1544334587),
(26, 'http://localhost/hpt/assets/1544334657', 'asdfe', 'fesdfsadf', 5, 1544334657),
(27, 'http://localhost/hpt/assets/1544334668', 'asdfe', 'fesdfsadf', 5, 1544334668),
(28, 'http://localhost/hpt/assets/1544334714', 'sdafasf', '5ewrqv', 5, 1544334714),
(29, 'http://localhost/hpt/assets/1544334722', 'sdafasf', '5ewrqv', 5, 1544334722),
(30, 'http://localhost/hpt/assets/1544335197', 'sdafasf', '5ewrqv', 5, 1544335197),
(31, 'http://localhost/hpt/assets/1544335211', 'sdafasf', '5ewrqv', 5, 1544335211),
(32, 'http://localhost/hpt/assets/1544335878', 'dfeadsf', 'werwerwerwe', 3, 1544335878),
(33, 'http://localhost/hpt/assets/1544335884', 'dfeadsf', 'werwerwerwe', 5, 1544335884),
(34, 'http://localhost/hpt/assets/1544336389', 'fefsadf', 'fasdf', 5, 1544336389),
(35, 'http://localhost/hpt/assets/1544336709', 'asfefas', 'dfaefasf', 5, 1544336709),
(36, 'http://localhost/hpt/assets/1544336987', 'asfe', 'afasdf asf asdfa sdf asdf\nasdf\n asd\nf\n asd\n f\nasdf', 5, 1544336987),
(37, 'http://localhost/hpt/assets/1544338104', 'asfe', 'adsf', 5, 1544338104),
(38, 'http://localhost/hpt/assets/1544338537', 'asfasdf', 'fasdff', 6, 1544338537),
(39, 'http://localhost/hpt/assets/1544338663', 'asdfasdf', 'asfasdfs', 6, 1544338663),
(40, 'http://localhost/hpt/assets/1544341283', 'ugjhghgg', 'ugyugjhg', 5, 1544341283),
(41, 'http://localhost/hpt/assets/1544341827', 'ff sadf s', 'fasdfsadf', 5, 1544341827),
(42, 'http://localhost/hpt/assets/1544343149', 'fasdf', 'as ff\na df\nad\nf asf', 5, 1544343149),
(43, 'http://192.168.1.28/hpt/assets/1544345841', 'asdfasdf', '23safsa', 5, 1544345841);

--
-- Triggers `product`
--
DELIMITER $$
CREATE TRIGGER `auto_created_date_product` BEFORE INSERT ON `product` FOR EACH ROW BEGIN
 SET NEW.created_date = UNIX_TIMESTAMP();
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bidding`
--
ALTER TABLE `bidding`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bidding`
--
ALTER TABLE `bidding`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
