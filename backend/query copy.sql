php artisan key:generate
composer require spatie/laravel-permission
php artisan passport:install
php artisan migrate:refresh --seed

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
  markId varchar(7) not null,
  platformId varchar(10),
  foreign key (markId) references markModem(id),
  foreign key (platformId) references platform(id)
);

create table device_sim(
  id int not null primary key auto_increment,
  deviceid int not null,
  simid int not null,
  date_start date,
  date_end date,
  userid int not null,
  foreign key (deviceid) references devices(id),
  foreign key (simid) references sims(id),
  foreign key (userid) references users(id)
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
  foreign key (clientid) references clients(id)
);


create table car_device(
  id int primary key auto_increment,
  carid int not null,
  date_start date not null,
  date_end date,
  deviceid int not null,
  userid int not null,
  foreign key (carid) references cars(id),
  foreign key (deviceid) references devices(id),
  foreign key (userid) references users(id)
);

create table typeEvents(
  id int primary key auto_increment,
  name varchar(12),
  img text
);

create table events(
  id int primary key auto_increment,
  element varchar(12),
  detail text not null,
  tabla varchar(12) not null,
  rowid  int not null,
  date_start date,
  userid int not null,
  typeid int not null,
  foreign key (userid) references users(id),
  foreign key (typeid) references typeEvents(id)
);

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

-- 07-08-2021
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
	insert into devices values(default, _imei, _name, _code, _reception, _active, _markId, _platformId);
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
  DROP PROCEDURE IF EXISTS sp_deviceSim_insert;$$
  CREATE PROCEDURE `sp_deviceSim_insert` (_deviceid int, _simid int, _userid int, _date_start text)  
  begin  
    declare idDeviceSim int;
    update device_sim set date_end = now() where deviceid = _deviceid and date_end is null;
    insert into device_sim values(default, _deviceid, _simid, _date_start,null, _userid);

    set idDeviceSim = last_insert_id();
    insert into events values(default,"device","Se colocó un nuevo sim al dispositivo.","device_sim",last_insert_id(), now(), _userid,1);


    select * from device_sim where id = idDeviceSim;
  end $$

  DELIMITER $$
  DROP PROCEDURE IF EXISTS sp_cardevice_insert;$$
  CREATE PROCEDURE `sp_cardevice_insert` (_deviceid int, _carid int, _userid int, _date_start text)  
  begin  
    declare idCardDevice int;
    update car_device set date_end = now() where carid = _carid and date_end is null;
    insert into car_device values(default, _carid, _date_start, null, _deviceid, _userid);

    set idCardDevice = last_insert_id();
    insert into events values(default,"car","Se colocó un nuevo modem al vehículo.","car_device",last_insert_id(), now(), _userid,1);


    select * from car_device where id = idCardDevice;
  end $$

    DELIMITER $$
    DROP PROCEDURE IF EXISTS sp_deviceSim_retirar;$$
    CREATE PROCEDURE `sp_deviceSim_retirar` (_deviceid int, _userid int)  
    begin  
      declare _idDeviceSim  int;
      select id into _idDeviceSim from device_sim where deviceid = _deviceid and date_end is null;
      update device_sim set date_end = now() where id = _idDeviceSim;

      insert into events values(default,"device","Se retiro el sim.","device_sim",_idDeviceSim, now(), _userid,1);
      select * from device_sim where id = _idDeviceSim;
    end $$

  DELIMITER $$
  DROP PROCEDURE IF EXISTS sp_carDevice_retirar;$$
  CREATE PROCEDURE `sp_carDevice_retirar` (_carid int, _userid int)  
  begin
    declare _idCardDevice  int;
    select id into _idCardDevice from car_device where carid = _carid and date_end is null;

    update car_device set date_end = now() where id = _idCardDevice;

    insert into events values(default,"car","Se retiro el dispositivo.","car_device",_idCardDevice, now(), _userid,1);
    select * from car_device where id = _idCardDevice;
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
	insert into cars values(default, _placa, _model, _mark,_date_start, null, _clientid );
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








if _devicesimid <> 0 then
    update device_sim set date_end = now() where id = _devicesimid;
  end if;

call sp_user_insert("Alfred","Torrci","a@gmail.com", "123456", true);
call sp_user_update(8,"Ana","Torrci","a@gmail.com", "123456", true);
call sp_sims_insert("44564651","76053528","2021-08-07","22");

call sp_deviceSim_insert(1,3,6);





select ds.date_start, d.code, d.name, d.imei as deviceImei, markId, platformId, 
        s.cod, s.number, s.imei as simImei from device_sim ds
join devices d on d.id = ds.deviceid
join sims s on s.id = ds.simid
where date_end is  null;


select c.*, concat(cl.name, " ",cl.last_name, " ", cl.mother_last_name, " (",cl.empresa, ")") as clientName from cars c
join clients cl on c.clientid = cl.id;



