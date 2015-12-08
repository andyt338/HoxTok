CREATE USER "www-data" WITH PASSWORD 'newpasswd';
CREATE DATABASE mydb WITH OWNER "www-data";
GRANT ALL PRIVILEGES ON DATABASE mydb to "www-data";
\connect mydb;
CREATE SCHEMA myschema AUTHORIZATION "www-data";
CREATE TABLE myschema.customers(
	email   		char(512)     	NOT NULL,
	created_at	    timestamp     	NOT NULL,
	useragent 		varchar(1024)   NOT NULL);
ALTER TABLE myschema.customers OWNER TO "www-data";