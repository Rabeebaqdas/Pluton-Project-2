create table User_Table (
Account_Address varchar(50) Primary KEY,
Account_Balance int
)

/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP 1000 [Account_Address]
      ,[Account_Balance]
  FROM [Pluton Task 2].[dbo].[User_Table]
  INSERT INTO User_Table VALUES('0xcA2Ba2ddecfBa372690871D5EE36b472496c4a9c',100)
  INSERT INTO User_Table VALUES('0xcA2Ba2ddecfBa372690871D5EE36b472496c4b9',150)
  INSERT INTO User_Table VALUES('0xcA2Ba2ddecfBa372690871D5EE36b472496c4r9d',200)
  INSERT INTO User_Table VALUES('0xcA2Ba2ddecfBa372690871D5EE36b472496c4y9f',500)
  SELECT * from User_Table

create table Transaction_Table(
Sender_Address varchar(50) not null ,
foreign key (Sender_Address) references User_Table(Account_Address),
Receiver_Address varchar(50) not null ,
Amount int not null,
Transaction_Status bit NOT NULL,
 Transaction_Date DATETIME
)

 SELECT * from Transaction_Table
 INSERT INTO Transaction_Table VALUES('0xcA2Ba2ddecfBa372690871D5EE36b472496c4a9c','0xcA2Ba2ddecfBa372690871D5EE36b472496c4b9',100,1,GETDATE())
  INSERT INTO Transaction_Table VALUES('0xcA2Ba2ddecfBa372690871D5EE36b472496c4y9f','0xcA2Ba2ddecfBa372690871D5EE36b472496c4b9',400,1,GETDATE())
   INSERT INTO Transaction_Table VALUES('0xcA2Ba2ddecfBa372690871D5EE36b472496c4a9c','0xcA2Ba2ddecfBa372690871D5EE36b472496c4a9q',600,0,GETDATE())
    INSERT INTO Transaction_Table VALUES('0xcA2Ba2ddecfBa372690871D5EE36b472496c4b9','0xcA2Ba2ddecfBa372690871D5EE36b472496c4a9c',10,1,GETDATE())

	UPDATE User_Table
SET Account_Balance = 900 Where Account_Address = '0xcA2Ba2ddecfBa372690871D5EE36b472496c4a9c'