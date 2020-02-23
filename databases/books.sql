CREATE TABLE books(
											isbn int,
											title varchar(250),
											author varchar(300),
											genre int,
											avgrating float,
											price float,
											publisher varchar(300),
											year int,
											ebook int,
											audiobook int,
											blurb varchar (500),
											coverpage //need to figure out this part
											
											primary key(isbn)
											
										);
											
											
CREATE TABLE user(

											username varchar(250),
											emailid varchar(250),
											password varchar(40),
											shelfid int,
											avgrating int,
											
											
											
											
									);
									

CREATE TABLE tenfavbooks (

														username varchar(250),
														isbn int,
														
														
													);
													
													
CREATE TABLE top5genres (

														username varchar (250),
														genreid int
									






											Users:
Username
Password
Avg rating
Shelves
Top 10 fav books
Top 5 genres --
Top 5 favourite authors---
Friends---
Reviews---

											
											
											
											
											Title
Author
ISBN
Genre
Avg Rating
Price
Publisher
Paperback/Hardcover
Year of publishing
e-Book availability/audio book
Websites on which they're available---
Rating and reviews
Blurb
Status -> reading/read/want to read
Cover->front and back
						-want to read
						-read
						-reading 
