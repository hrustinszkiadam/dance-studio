-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 27. 12:34
-- Kiszolgáló verziója: 10.4.22-MariaDB
-- PHP verzió: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `dancestudio`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `courses`
--

CREATE TABLE `courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `length` int(11) NOT NULL,
  `instructor` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `courses`
--

INSERT INTO `courses` (`id`, `name`, `type`, `length`, `instructor`, `created_at`, `updated_at`) VALUES
(1, 'Waltz', 'partner', 96, 'Princess Maggio', '2022-04-27 08:17:52', '2022-04-27 08:17:52'),
(2, 'Zumba', 'group', 36, 'Tabitha Lubowitz', '2022-04-27 08:17:52', '2022-04-27 08:17:52'),
(3, 'Cuban salsa', 'partner', 79, 'Dr. Terrence Toy', '2022-04-27 08:17:52', '2022-04-27 08:17:52'),
(4, 'Step dance', 'solo', 67, 'Prof. Van Dibbert Jr.', '2022-04-27 08:17:52', '2022-04-27 08:17:52'),
(5, 'West Coast Swing', 'partner', 46, 'Dr. Gregoria Gulgowski III', '2022-04-27 08:17:52', '2022-04-27 08:17:52'),
(6, 'Bachata', 'partner', 68, 'Ervin Morar', '2022-04-27 08:17:52', '2022-04-27 08:17:52'),
(7, 'Argentine tango', 'partner', 76, 'Gabe Nolan DVM', '2022-04-27 08:17:52', '2022-04-27 08:17:52'),
(8, 'Ballet', 'group', 63, 'Domenick Anderson', '2022-04-27 08:17:52', '2022-04-27 08:17:52'),
(9, 'Pole dance', 'solo', 108, 'Taurean Barrows', '2022-04-27 08:17:52', '2022-04-27 08:17:52'),
(10, 'Rumba', 'partner', 51, 'Toney Thompson', '2022-04-27 08:17:52', '2022-04-27 08:17:52');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
