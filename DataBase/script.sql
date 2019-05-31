USE [master]
GO
/****** Object:  Database [MVF]    Script Date: 31/5/2019 16:35:36 ******/
CREATE DATABASE [MVF]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MVF', FILENAME = N'I:\SQLData\MVF.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MVF_log', FILENAME = N'L:\SQLLog\MVF_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [MVF] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MVF].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MVF] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MVF] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MVF] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MVF] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MVF] SET ARITHABORT OFF 
GO
ALTER DATABASE [MVF] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MVF] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MVF] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MVF] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MVF] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MVF] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MVF] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MVF] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MVF] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MVF] SET  ENABLE_BROKER 
GO
ALTER DATABASE [MVF] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MVF] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MVF] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MVF] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MVF] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MVF] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MVF] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MVF] SET RECOVERY FULL 
GO
ALTER DATABASE [MVF] SET  MULTI_USER 
GO
ALTER DATABASE [MVF] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MVF] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MVF] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MVF] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MVF] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [MVF] SET QUERY_STORE = OFF
GO
USE [MVF]
GO
/****** Object:  User [DDS\Romang]    Script Date: 31/5/2019 16:35:36 ******/
CREATE USER [DDS\Romang] FOR LOGIN [DDS\Romang] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [DDS\gabalde]    Script Date: 31/5/2019 16:35:36 ******/
CREATE USER [DDS\gabalde] FOR LOGIN [DDS\gabalde] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [DDS\edalesio]    Script Date: 31/5/2019 16:35:36 ******/
CREATE USER [DDS\edalesio] FOR LOGIN [DDS\edalesio] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [DDS\BKPADMIN]    Script Date: 31/5/2019 16:35:36 ******/
CREATE USER [DDS\BKPADMIN] FOR LOGIN [DDS\BKPADMIN] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 31/5/2019 16:35:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientBranch]    Script Date: 31/5/2019 16:35:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientBranch](
	[ClientBranchID] [int] NOT NULL,
	[ClientBranchName] [nvarchar](50) NOT NULL,
	[WeatherID] [int] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[Country] [varchar](30) NOT NULL,
	[City] [varchar](30) NOT NULL,
	[ClientBranchDescription] [varchar](250) NULL,
	[Image] [varchar](max) NULL,
 CONSTRAINT [PK_ClientBranch] PRIMARY KEY CLUSTERED 
(
	[ClientBranchID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Weather]    Script Date: 31/5/2019 16:35:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Weather](
	[WeatherID] [int] NOT NULL,
	[Country] [nvarchar](30) NOT NULL,
	[Temperature] [numeric](4, 2) NOT NULL,
	[Humidity] [nvarchar](3) NOT NULL,
	[Clouds] [nvarchar](3) NOT NULL,
	[Pressure] [nvarchar](5) NOT NULL,
	[WindDirection] [nvarchar](5) NOT NULL,
	[WindSpeed] [numeric](4, 2) NOT NULL,
 CONSTRAINT [PK_Weather] PRIMARY KEY CLUSTERED 
(
	[WeatherID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ClientBranch]  WITH CHECK ADD  CONSTRAINT [FK_ClientBranch_Weather] FOREIGN KEY([WeatherID])
REFERENCES [dbo].[Weather] ([WeatherID])
GO
ALTER TABLE [dbo].[ClientBranch] CHECK CONSTRAINT [FK_ClientBranch_Weather]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador de la Sucursal del Cliente' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ClientBranch', @level2type=N'COLUMN',@level2name=N'ClientBranchID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombre de la Sucursal del Cliente' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ClientBranch', @level2type=N'COLUMN',@level2name=N'ClientBranchName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador del Clima' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ClientBranch', @level2type=N'COLUMN',@level2name=N'WeatherID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha Creación' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ClientBranch', @level2type=N'COLUMN',@level2name=N'CreatedAt'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha Actualización' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ClientBranch', @level2type=N'COLUMN',@level2name=N'UpdatedAt'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador del clima' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Weather', @level2type=N'COLUMN',@level2name=N'WeatherID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'País' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Weather', @level2type=N'COLUMN',@level2name=N'Country'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Temperatura' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Weather', @level2type=N'COLUMN',@level2name=N'Temperature'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Humedad' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Weather', @level2type=N'COLUMN',@level2name=N'Humidity'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nubes' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Weather', @level2type=N'COLUMN',@level2name=N'Clouds'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Presión Atmosferica' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Weather', @level2type=N'COLUMN',@level2name=N'Pressure'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Dirección del viento' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Weather', @level2type=N'COLUMN',@level2name=N'WindDirection'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Velocidad del viento' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Weather', @level2type=N'COLUMN',@level2name=N'WindSpeed'
GO
USE [master]
GO
ALTER DATABASE [MVF] SET  READ_WRITE 
GO
