CREATE TABLE users(

											username varchar(250),
											email_id varchar(250),
											password varchar(40),
											age int,
											shelf_id int,
											
											
											primary key (username),
                                                                                        unique(email_id),
                                                                                        unique(shelf_id)
											
											
									);
									
									
CREATE TABLE user_ratings(
	username varchar(250),
	isbn int,
	rating int
	);
									

CREATE TABLE topfifteenbooks (

		username varchar(250),
		isbn int,
														
														
		);
													
													
CREATE TABLE topfivegenres (

			username varchar (250),
			genre varchar(30)
                            
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

alter table topfifteenbooks add constraint crossref1 foreign key (isbn) references books(isbn) on delete cascade on update cascade;

alter table topfifteenbooks add constraint crossref2 foreign key (username) references users(username) on delete cascade on update cascade;

alter table topfivegenres add constraint crossref3 foreign key(username) references users(username) on delete cascade on update cascade;

alter table topfivegenres add constraint crossref4 foreign key (username) references users(username) on delete cascade on update cascade;

alter table friends add constraint crossref5 foreign key(username) references users(username) on delete cascade on update cascade;

alter table friends add constraint crossref6 foreign key(friend) references users(username) on delete cascade on update cascade;

alter table user_ratings add constraint crossref7 foreign key (isbn) references books(isbn) on delete cascade on update cascade;

alter table user_ratings add constraint crossref8 foreign key(username) references users(username) on delete cascade on update cascade;
											
alter table want_to_read add constraint crossref9 foreign key (isbn) references books(isbn) on delete cascade on update cascade;

alter table want_to_read add constraint crossref10 foreign key(username) references users(username) on delete cascade on update cascade;
																					
alter table have_read add constraint crossref11 foreign key (isbn) references books(isbn) on delete cascade on update cascade;

alter table have_red add constraint crossref12 foreign key(username) references users(username) on delete cascade on update cascade;
													
