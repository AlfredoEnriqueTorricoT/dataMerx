alter table cars add column active bool;

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_car_insert;$$
CREATE PROCEDURE `sp_car_insert` (_name text, _placa text, _model text, _mark text, _date_start text, _clientid int)  
begin  
	insert into cars values(default, _name, _placa, _model, _mark,_date_start, null, _clientid, null,1);
    	select * from cars where id = last_insert_id();
end $$