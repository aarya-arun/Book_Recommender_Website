CREATE TABLE books(
											isbn int,
											title varchar(250),
											author varchar(300),
											genre varchar(30),
											avg_rating float,
											price float,
											publisher varchar(300),
											year int,
											ebook int,
											audiobook int,
											blurb varchar (500),
											coverpage need to figure out this part--
											
											primary key(isbn),
											
											
											
										);
										
										
										
CREATE TABLE book_reviews(
	
	isbn int,
	username varchar(250),
	review varchar (5000)
	
	);
	
CREATE TABLE book_websites(
	
	isbn int,
	website varchar(100)
	
	);
	
CREATE TABLE shelves(
	
	shelfid int,
	isbn int,
	status varchar(20),
	user_rating float
	
	);
	
	
CONSTRAINTS--

alter table books add constraint authorbook unique (author, title);

alter table book_reviews add constraint crossref1 foreign key (username) references user(username) on delete cascade on update cascade;

alter table book_reviews add constraint crossref2 foreign key (isbn) references books(isbn) on delete cascade on update cascade;

alter table book_websites add constraint crossref3 foreign key (isbn) references books(isbn) on delete cascade on update cascade;

alter table shelves add constraint crossref4 foriegn key (isbn) references books(isbn) on delete cascade on update cascade;
