alter table devices drop column name;

alter table cars add column name text after id;


DELIMITER $$
DROP PROCEDURE IF EXISTS sp_car_insert;$$
CREATE PROCEDURE `sp_car_insert` (_name text, _placa text, _model text, _mark text, _date_start text, _clientid int)  
begin  
	insert into cars values(default, _name, _placa, _model, _mark,_date_start, null, _clientid, null);
    	select * from cars where id = last_insert_id();
end $$

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_car_update;$$
CREATE PROCEDURE `sp_car_update` (_id int,_name text, _placa text, _model text, _mark text, _date_start text, _date_end text, _clientid int)  
begin  
	update cars set name=_name, placa= _placa, model= _model, mark= _mark, date_start= _date_start, date_end= _date_end, clientid= _clientid 
    where id = _id;
    	select * from cars where id = _id;
end $$



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_device_insert;$$
CREATE PROCEDURE `sp_device_insert` (IN _imei varchar(15),
      IN _code varchar(15), IN _reception date, IN _active boolean, IN _markId varchar(7), IN _platformId varchar(10))  
begin  
	insert into devices values(default, _imei, _code, _reception, _active,null, _markId, _platformId);
    	select * from devices where id = last_insert_id();
end $$

DROP PROCEDURE IF EXISTS sp_device_update;$$
CREATE PROCEDURE `sp_device_update` (IN _id int, IN _imei varchar(15), 
      IN _code varchar(15), IN _reception date, IN _active boolean, IN _markId varchar(7), IN _platformId varchar(10))  
begin
	update devices set imei = _imei, code=_code, reception = _reception, active= _active, markId=_markId, platformId = _platformId where id =_id;
  
  select * from devices where id = _id;
end $$