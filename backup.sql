-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: latihan_blog
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('02c4eca3-f63d-4830-b375-662e349d760c','748e5a1f05cacff8c8b704c5ed92581f931760e49a4ce2b53c1e88c9b79cbe6a','2024-10-10 01:16:47.539','20241010011646_third_migrate_add_3models_cat_post_comment',NULL,NULL,'2024-10-10 01:16:47.132',1),('0c348899-21d8-4051-b7ae-12f5003b777d','9ce01510caaac27666403e186028c14f8c587455211eccbfdf071a6fa7e62e0f','2024-10-10 00:26:55.046','20241010002654_first_migrate',NULL,NULL,'2024-10-10 00:26:54.888',1),('49b3677e-f6be-4e45-8763-54bad9d4190d','40572b5616524450b413829a7f37f1cd060d6e2e5cc782013cc014f33a16fe9e','2024-10-10 00:47:04.276','20241010004704_second_migarte_add_created_at_and_updated_at_to_all_model',NULL,NULL,'2024-10-10 00:47:04.254',1),('77758e25-d6e5-48cc-a4a8-0e24335e7333','b13c2425ee00cb3bb8ef3b5143e332c8d4fd26bb179b552b85ed9fcfbdc38176','2024-10-12 12:56:39.249','20241012125639_add_status_column_to_model_post',NULL,NULL,'2024-10-12 12:56:39.239',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_id_key` (`id`),
  UNIQUE KEY `Category_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'pahlawan','2024-10-12 14:19:20.707','2024-10-12 14:19:20.707'),(2,'Pemimpin','2024-10-12 14:19:35.012','2024-10-12 14:19:35.012'),(3,'Pejuang','2024-10-12 14:19:42.247','2024-10-12 14:19:42.247'),(4,'Makan-makan','2024-10-12 14:19:50.853','2024-10-12 14:19:50.853');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(191) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Comment_id_key` (`id`),
  KEY `Comment_post_id_fkey` (`post_id`),
  KEY `Comment_user_id_fkey` (`user_id`),
  CONSTRAINT `Comment_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `content` varchar(191) NOT NULL,
  `category_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Post_id_key` (`id`),
  UNIQUE KEY `Post_title_key` (`title`),
  KEY `Post_category_id_fkey` (`category_id`),
  KEY `Post_user_id_fkey` (`user_id`),
  CONSTRAINT `Post_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Perjuangan tidak sia-sia by Emol polium','Perjuangan ini tidak akan pernah sia-sia, walaupun akan dilupai sama sekali oleh semua orang, tetapi itu tidak masalah sama sekali, karena tujuan yang kita perjuangkan adalah tujuan yang muli',1,1,'2024-10-12 14:24:09.221','2024-10-12 14:35:49.928',0),(3,'Pahlawan sejati','Perjuangan Pahlawan sejati ini tidak akan pernah sia-sia, walaupun akan dilupai sama sekali oleh semua orang, tetapi itu tidak masalah sama sekali, karena tujuan yang kita perjuangkan adalah ',2,6,'2024-10-12 14:54:45.374','2024-10-12 14:54:45.374',0);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Role_id_key` (`id`),
  UNIQUE KEY `Role_title_key` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin','2024-10-10 01:06:51.337','2024-10-10 01:06:51.337'),(2,'member','2024-10-10 01:07:04.620','2024-10-10 01:07:04.620');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_id_key` (`id`),
  UNIQUE KEY `User_username_key` (`username`),
  UNIQUE KEY `User_email_key` (`email`),
  KEY `User_role_id_fkey` (`role_id`),
  CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'hipo','hipo@tech.id','$2b$10$BSrkZKtknj6J2nbOyeZD5eAM3y81EYEZLa99diYe9aSMio2xxQbxu',NULL,2,'2024-10-10 01:08:17.978','2024-10-10 01:08:17.978'),(5,'minda','fucek@fc.com','$2b$10$.QHpFKFGwqf6d1b54qYJ4.72ANAWZalmQeKpTy3angMRByWBlt5xe',NULL,2,'2024-10-11 10:37:58.876','2024-10-11 10:37:58.876'),(6,'memed','memed@gmail.com','$2b$10$5sizXqhjawxUxvzgya6K8O.7XwOdhps08CJxhXwvFHZBP7ARGbHhW',NULL,2,'2024-10-11 10:43:11.571','2024-10-11 10:43:11.571'),(10,'admin','admin@adm.in','$2b$10$4lvqMznNSCZZ1ONVXiFQMu76wN6HgFvCfOOA6M60dky./wrcQznRa',NULL,1,'2024-10-11 10:49:08.801','2024-10-11 10:49:08.801'),(11,'admin2','admin2@adm.in','$2b$10$0o5vwNRz8w5w3PWSn3NFoeQ6lSQTLrk0OS7ojxMBc8UGrJOXpVtB2',NULL,2,'2024-10-11 10:50:17.921','2024-10-11 10:50:17.921'),(12,'admin3','admin3@adm.in','$2b$10$VG2jtvmCes3d/qOtqO9L5uPJm6X9zoF/UwymVY9xZDEbRKv1RqMIq',NULL,2,'2024-10-11 10:50:41.921','2024-10-11 10:50:41.921'),(13,'firu designer','firudesigner@gmail.com','$2b$10$4XrcWdHzb74DXVz8bo5JHOG4ifO3ByfML9rzvHR4ICa1Le6jUhaMy',NULL,2,'2024-10-11 14:21:48.882','2024-10-11 14:21:48.882'),(14,'medi','medirudiantoni2@gmail.com','$2b$10$eTIwbBChr5lT6lVM.SuVVeRmutl9q0XW00Rf8txMtHAp/aqqh749i',NULL,2,'2024-10-12 12:43:18.537','2024-10-12 12:43:18.537');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-13 12:44:15
