DELIMITER $$
DROP PROCEDURE IF EXISTS sp_carDevice_retirar;$$
CREATE PROCEDURE `sp_carDevice_retirar` (_id int, _userid int)  
begin  
  declare _idDevice  int;
  select  deviceid into  _idDevice from cars where id = _id;
  update cars set deviceid = null where id = _id;

  insert into events values(default,"car", _id,"Se retiro el dispositivo.","device",_idDevice, now(), _userid,1);
  select * from cars where id = _id;
end $$


call sp_carDevice_retirar(1,1);