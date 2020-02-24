CREATE TABLE books(
											isbn int,
											title varchar(250),
											author varchar(300),
											genre int,
											avg_rating float,
											price float,
											publisher varchar(300),
											year int,
											ebook int,
											audiobook int,
											blurb varchar (500),
											coverpage //need to figure out this part
											
											primary key(isbn)
											
										);
										
										
										
CREATE TABLE book_reviews(
	
	isbn int,
	username varchar(250),  ///
	review varchar (5000)
	
	);
	
CREATE TABLE book_websites(
	
	isbn int,
	website varchar(100)
	
	);
	
CREATE TABLE shelves(
	
	shelfid int,
	isbn int,
	status varchar(10),
	user_rating float
	
	);
	
	
	

											
											
									
											
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
