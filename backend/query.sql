php artisan key:generate
composer require spatie/laravel-permission
php artisan passport:install
php artisan migrate:refresh --seed

create dataBase dataMerx;

create table users(
  id int not null primary key auto_increment,
  name varchar(20) not null,
  lastName varchar(30),
  email varchar(30),
  password varchar(50),
  state boolean not null default 1
);

create table markModem(
  id varchar(7) not null primary key
);

create table platform(
  id varchar(10) not null primary key
);

create table sims(
  id int not null primary key auto_increment,
  imei varchar(22) not null,
  number varchar(8) not null,
  f_reception date not null,
  cod int not null,
  active boolean
);

create table devices(
  id int not null primary key auto_increment,
  imei varchar(15) not null,
  name varchar(10) not null,
  code varchar(15) not null,
  reception date not null,
  active boolean,
  simid int,
  markId varchar(7) not null,
  platformId varchar(10),
  foreign key (simid) references sims(id),
  foreign key (markId) references markModem(id),
  foreign key (platformId) references platform(id)
);



create table clients(
  id int primary key auto_increment,
  name varchar(20) not null,
  last_name varchar(15) not null,
  mother_last_name varchar(15) not null,
  telefono varchar(10) not null,
  empresa varchar(10) not null
);

create table cars(
  id int primary key auto_increment,
  placa varchar(8),
  model varchar(8),
  mark varchar(15),
  date_start date not null,
  date_end date,
  clientid int,
  deviceid int,
  foreign key (clientid) references clients(id),
  foreign key (deviceid) references devices(id)
);



create table typeEvents(
  id int primary key auto_increment,
  name varchar(12),
  img text
);

create table events(
  id int primary key auto_increment,
  tableAffected varchar(12),
  rowAffected varchar(12),
  detail text not null,
  tableNewValue varchar(12) null,
  rowidNewValue  int null,
  date_start date,
  userid int not null,
  typeid int not null,
  foreign key (userid) references users(id),
  foreign key (typeid) references typeEvents(id)
);

insert into markModem values("GT06N");
insert into markModem values("X-3");

insert into platform values("30-Marzo");
insert into platform values("Mmedrano");
insert into platform values("Plan-3000");
insert into platform values("Vol-25");

insert into typeEvents values(default, "Info", null);
insert into typeEvents values(default, "Warning", null);

drop table typeEvents;
drop table events;

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_user_insert;$$
CREATE PROCEDURE `sp_user_insert` (IN _name varchar(20), IN _lastName varchar(30), 
      IN _email varchar(30), IN _password varchar(50), IN _state boolean)  
begin  
	insert into users values(default,_name , _lastName, _email, sha1(_password), _state);
    	select * from users where id = last_insert_id();
end $$


DROP PROCEDURE IF EXISTS sp_user_update;$$
CREATE PROCEDURE `sp_user_update` (IN _id int, IN _name varchar(20), IN _lastName varchar(30), 
      IN _email varchar(30), IN _password varchar(50), IN _state boolean)  
begin
	update users set name = _name,lastName=_lastName, email=_email, state=_state where id =_id;
  if _password <> "" then
    update users set password = sha1(_password)  where id =_id;
  end if;
  select * from users where id = _id;
end $$

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_sims_insert;$$
CREATE PROCEDURE `sp_sims_insert` (_imei text, _number text, _f_reception date, _cod int)  
begin  

  
	insert into sims values(default,_imei , _number, _f_reception, _cod, true);
    	select * from sims where id = last_insert_id();
end $$
DELIMITER $$
DROP PROCEDURE IF EXISTS sp_sim_update;$$
CREATE PROCEDURE `sp_sim_update` (IN _id int, _imei text, _number text, _f_reception date, _cod int, _active boolean)  
begin
	update sims set imei = _imei, number=_number, f_reception=_f_reception, cod = _cod, active = _active where id =_id;
  
  select * from sims where id = _id;
end $$

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_device_insert;$$
CREATE PROCEDURE `sp_device_insert` (IN _imei varchar(15), IN _name varchar(10), 
      IN _code varchar(15), IN _reception date, IN _active boolean, IN _markId varchar(7), IN _platformId varchar(10))  
begin  
	insert into devices values(default, _imei, _name, _code, _reception, _active,null, _markId, _platformId);
    	select * from devices where id = last_insert_id();
end $$

DROP PROCEDURE IF EXISTS sp_device_update;$$
CREATE PROCEDURE `sp_device_update` (IN _id int, IN _imei varchar(15), IN _name varchar(10), 
      IN _code varchar(15), IN _reception date, IN _active boolean, IN _markId varchar(7), IN _platformId varchar(10))  
begin
	update devices set imei = _imei, name=_name, code=_code, reception = _reception, active= _active, markId=_markId, platformId = _platformId where id =_id;
  
  select * from devices where id = _id;
end $$



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_client_insert;$$
CREATE PROCEDURE `sp_client_insert` (_name text, _lastName text, _mother_last_name text, _telefono text, _empresa text)  
begin  
	insert into clients values(default, _name, _lastName, _mother_last_name,_telefono, _empresa);
    	select * from clients where id = last_insert_id();
end $$

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_client_update;$$
CREATE PROCEDURE `sp_client_update` (_id int, _name text, _lastName text, _mother_last_name text, _telefono text, _empresa text)  
begin  
	
  update clients set name= _name, last_name= _lastName, mother_last_name= _mother_last_name, telefono= _telefono, empresa= _empresa 
      where id = _id;
    	select * from clients where id = _id;
end $$


DELIMITER $$
DROP PROCEDURE IF EXISTS sp_car_insert;$$
CREATE PROCEDURE `sp_car_insert` (_placa text, _model text, _mark text, _date_start text, _clientid int)  
begin  
	insert into cars values(default, _placa, _model, _mark,_date_start, null, _clientid, null);
    	select * from cars where id = last_insert_id();
end $$

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_car_update;$$
CREATE PROCEDURE `sp_car_update` (_id int, _placa text, _model text, _mark text, _date_start text, _date_end text, _clientid int)  
begin  
	update cars set placa= _placa, model= _model, mark= _mark, date_start= _date_start, date_end= _date_end, clientid= _clientid 
    where id = _id;
    	select * from cars where id = _id;
end $$


DELIMITER $$
DROP PROCEDURE IF EXISTS sp_device_retirarSim;$$
CREATE PROCEDURE `sp_device_retirarSim` (_id int, _userid int)  
begin  
  declare _idSim  int;
  select  simid into  _idSim from devices where id = _id;
  update devices set simid = null where id = _id;

  insert into events values(default,"device", _id,"Se retiro el sim.","sim",null, now(), _userid,1);
  select * from devices where id = _id;
end $$

-- 21-09-30
DELIMITER $$
DROP PROCEDURE IF EXISTS sp_addSimToDevice;$$
CREATE PROCEDURE `sp_addSimToDevice` (_id int, _simId int, _userid int)
begin  
	update devices set simid = _simId where id = _id;

  insert into events values(default,"device", _id,"Se agrego el sim.","sim",_simId, now(), _userid,1);
    	
  select * from devices where id = _id;
end $$

-- 21-10-02
DELIMITER $$
DROP PROCEDURE IF EXISTS sp_addDeviceToCar;$$
CREATE PROCEDURE `sp_addDeviceToCar` (_id int, _deiviceId int, _userid int)
begin  
	update cars set deviceid = _deiviceId where id = _id;

  insert into events values(default,"car", _id,"Se agrego el dispositivo.","device",_deiviceId, now(), _userid,1);
    	
  select * from cars where id = _id;
end $$


DELIMITER $$
DROP PROCEDURE IF EXISTS sp_event_insert;$$
CREATE PROCEDURE `sp_event_insert` ( _tableAffected text, _rowAffected int, _detail text, _now text, _userid text, _typeevent int)
begin  

  insert into events values(default,_tableAffected, _rowAffected,_detail,null,null, _now, _userid, _typeevent);    	
  select * from events where id = last_insert_id();
end $$

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_event_update;$$
CREATE PROCEDURE `sp_event_update` (_id int, _tableAffected text, _rowAffected int, _detail text, _now text, _userid text, _typeid int)
begin  

  update  events set tableAffected =_tableAffected, rowAffected =_rowAffected, detail=_detail, date_start =_now, userid =_userid, typeid =_typeid where id = _id;    	
  select * from events where id = _id;
end $$






if _devicesimid <> 0 then
    update device_sim set date_end = now() where id = _devicesimid;
  end if;

call sp_user_insert("Alfred","Torrci","a@gmail.com", "123456", true);
call sp_user_update(8,"Ana","Torrci","a@gmail.com", "123456", true);
call sp_sims_insert("44564651","76053528","2021-08-07","22");

call sp_deviceSim_insert(1,3,6);





--sim disponibles
select s.* from(select * from devices where simid is not null) sd
right join sims s on sd.simid = s.id
where sd.simid is null;

--device disponibles
select d.* from(select * from cars where deviceid is not null) dc
right join devices d on dc.deviceid = d.id
where dc.deviceid is null;


select c.*, concat(cl.name, " ",cl.last_name, " ", cl.mother_last_name, " (",cl.empresa, ")") as clientName, d.code, d.name from cars c
    join clients cl on c.clientid = cl.id
    left join devices d on c.deviceid = d.id;



alter table events change rowidNewValue rowNewValue int;
alter table events change tablaNewValue tableNewValue int;


    alter table tablaNewValue rename to 