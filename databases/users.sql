CREATE TABLE users(username varchar(250),email_id varchar(250),password1 varchar(40),age int,shelf_id int,primary key (username),unique(email_id), unique(shelf_id));
									
									
CREATE TABLE user_ratings(username varchar(250),isbn varchar(20),rating int );
									

CREATE TABLE topfifteenbooks (username varchar(250),isbn varchar(20));
													
													
CREATE TABLE topfivegenres (username varchar (250),genre varchar(30));
                         
 
 CREATE TABLE friends( username varchar(250),friend varchar(250), similarity_index float);
		  
		  
CREATE TABLE have_read (username varchar(250),isbn varchar(20));
	
	
CREATE TABLE want_to_read (username varchar(250),isbn varchar(20));
                  
                 
									
CONSTRAINTS--

alter table topfifteenbooks add constraint crossref1 foreign key (isbn) references books(isbn) on delete cascade on update cascade;

alter table topfifteenbooks add constraint crossref2 foreign key (username) references users(username) on delete cascade on update cascade;

alter table topfivegenres add constraint crossref3 foreign key (username) references users(username) on delete cascade on update cascade;

alter table friends add constraint crossref4 foreign key(username) references users(username) on delete cascade on update cascade;

alter table friends add constraint crossref5 foreign key(friend) references users(username) on delete cascade on update cascade;

alter table user_ratings add constraint crossref6 foreign key (isbn) references books(isbn) on delete cascade on update cascade;

alter table user_ratings add constraint crossref7 foreign key(username) references users(username) on delete cascade on update cascade;
											
alter table want_to_read add constraint crossref8 foreign key (isbn) references books(isbn) on delete cascade on update cascade;

alter table want_to_read add constraint crossref9 foreign key(username) references users(username) on delete cascade on update cascade;
																					
alter table have_read add constraint crossref10 foreign key (isbn) references books(isbn) on delete cascade on update cascade;

alter table have_read add constraint crossref11 foreign key(username) references users(username) on delete cascade on update cascade;
													
