CREATE TABLE user(

											username varchar(250),
											email_id varchar(250),
											password varchar(40),
											age int,
											shelf_id int,
											avg_rating int,
											
											primary key (username),
                                                                                        unique(email_id),
                                                                                        unique(shelf_id)
											
											
									);
									
									
CREATE TABLE user_ratings(
	isbn int,
	rating int
	);
									

CREATE TABLE tenfavbooks (

		username varchar(250),
		isbn int,
														
														
		);
													
													
CREATE TABLE topfivegenres (

			username varchar (250),
			genre varchar(30)
                            
                         );
                         
                         
CREATE TABLE topfiveauthors (

			username varchar (250),
			author varchar(300)
                            
                         );
			 
                         
 
 CREATE TABLE friends(
 
                  username varchar(250),
                  friend varchar(250),
                  similarity_index float,
                  
                  
                  );
		  
		  
CREATE TABLE have_read (
	username varchar(250),
	isbn int
	);
	
CREATE TABLE want_to_read (
	username varchar(250),
	isbn int
	);
                  
                 
									
CONSTRAINTS--

alter table tenfavbooks add constraint crossref1 foreign key (isbn) references books(isbn) on delete cascade on update cascade;

alter table tenfavbooks add constraint crossref2 foreign key (username) references users(username) on delete cascade on update cascade;

alter table topfiveauthors add constraint crossref3 foreign key(username) references users(username) on delete cascade on update cascade;

alter table friends add constraint crossref4 foreign key(username) references users(username) on delete cascade on update cascade;

alter table friends add constraint crossref5 foreign key(friend) references users(username) on delete cascade on update cascade;
											
											
		
