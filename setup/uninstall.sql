\connect mydb
DROP SCHEMA myschema CASCADE;
\connect postgres
DROP DATABASE mydb;
DROP USER "www-data";
