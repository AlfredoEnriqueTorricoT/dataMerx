alter table cars add column active bool;

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_car_insert;$$
CREATE PROCEDURE `sp_car_insert` (_name text, _placa text, _model text, _mark text, _date_start text, _clientid int)  
begin  
	insert into cars values(default, _name, _placa, _model, _mark,_date_start, null, _clientid, null,1);
    	select * from cars where id = last_insert_id();
end $$

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_car_update;$$
CREATE PROCEDURE `sp_car_update` (_id int,_name text, _placa text, _model text, _mark text, _date_start text, _date_end text, _clientid int, _active bool)  
begin  
	update cars set name=_name, placa= _placa, model= _model, mark= _mark, date_start= _date_start, date_end= _date_end, clientid= _clientid, active = _active
    where id = _id;
    	select * from cars where id = _id;
end $$