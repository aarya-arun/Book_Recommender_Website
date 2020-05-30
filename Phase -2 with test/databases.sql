




mysql -u root

create database test;

use test;

create user 'aarya'@'localhost' identified by 'aarya123';

grant all privileges on *.* to 'aarya'@'localhost';

flush privileges;


CREATE TABLE books(	
  isbn varchar(20),
  authors varchar(200),
  original_publication_year int,
  original_title varchar (500),
  language_code varchar(5),
  average_rating float,
  ratings_count int,
  text_reviews_count int,
  image_url varchar(500),
  small_image_url varchar(500),
  authorsmatch varchar(200),
  titlesmatch varchar(500),
  book_desc varchar(5000),
  genres varchar(50),
  genresmatch varchar(50),
  primary key(isbn)
);


load data local infield 'Desktop/booksfinal.csv' into table books fields terminated by ',' enclosed by '"' lines terminated by '\n' ignore 1 rows;


CREATE TABLE users(username varchar(250),email_id varchar(250),password1 varchar(40),age int,shelf_id int,primary key (username),unique(email_id), unique(shelf_id));

CREATE TABLE topfifteenbooks (username varchar(250),isbn varchar(20));
													
CREATE TABLE topfivegenres (username varchar (250),genre varchar(30));


create table bookrecs( username varchar(250), isbn varchar(20), image_url varchar(500));

alter table bookrecs add constraint c1 foreign key(username) references users(username) on delete cascade on update cascade;

alter table bookrecs add constraint c2 foreign key(isbn) references books(isbn) on delete cascade on update cascade;


create table genrerecs( username varchar(250), isbn varchar(20), image_url varchar(500));

alter table genrerecs add constraint c4 foreign key(username) references users(username) on delete cascade on update cascade;

alter table genrerecs add constraint c5 foreign key(isbn) references books(isbn) on delete cascade on update cascade;



create table popular(isbn varchar(20), image_url varchar(500));


alter table popular add constraint c10 foreign key(isbn) references books(isbn) on delete cascade on update cascade;


CREATE TABLE shelfid( shelfidstart int);


CREATE TABLE have_read (username varchar(250),isbn varchar(20));
	
	
CREATE TABLE want_to_read (username varchar(250),isbn varchar(20));


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
													










