create database MVF
go
USE  MVF
go
CREATE TABLE [dbo].[Weather](
	[WeatherID] [int] IDENTITY(1,1) NOT NULL,
	[Country] [nvarchar](30) NOT NULL,
	[Summary] [nvarchar](50) NULL,
	[Name] [nvarchar](50) NULL,
	[Code] [int] NULL,
	[Latitude] [nvarchar](10)  NULL,
	[Longitude] [nvarchar](10)  NULL,
	[Temperature] [nvarchar](10)  NULL,
	[Temp_Min] [nvarchar](10)  NULL,
	[Temp_Max] [nvarchar](10)  NULL,
	[Humidity] [nvarchar](3)  NULL,
	[Clouds] [nvarchar](3)  NULL,
	[Pressure] [nvarchar](5)  NULL,
	[WindDirection] [nvarchar](5)  NULL,
	[WindSpeed] [numeric](4, 2)  NULL
PRIMARY KEY CLUSTERED 
(
	[WeatherID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[ClientBranch](
	[ClientBranchID] [int] IDENTITY(1,1) NOT NULL,
	[ClientBranchName] [nvarchar](50) NOT NULL,
	[WeatherID] [int] NOT NULL,
	[Country] [varchar](30) NOT NULL,
	[City] [varchar](30) NOT NULL,
	[Address] [nvarchar](70) NOT NULL,
	[ClientBranchDescription] [varchar](250) NULL,
	[Image] [varchar](max) NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL
PRIMARY KEY CLUSTERED 
(
	[ClientBranchID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[ClientBranch]  WITH CHECK ADD FOREIGN KEY([WeatherID])
REFERENCES [dbo].[Weather] ([WeatherID])
GO