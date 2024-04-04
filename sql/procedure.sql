select * from modems where platform_id = 10;
delete from platforms where id = 10;

delete from modem_duplicates;

SELECT * from modem_duplicates;


SELECT count(*) from modems where platform_id is null;


call InsertIfNotExists("123");

select * from modems where code like "0?-%";
update modems set platform_id = 4 where code like "0?-%";

update modems set imei = "353701097511865" where id = 58;



select * from platforms;
select * from modems where platform_id = 8;
select * from modems where id = 210;
select * from modems where imei like "%11865";

update modems set code = "01-78" where id = 528;



select * from modems where imei like "%7602%";

update modems set imei = "353701098876020", platform_id = 6 where id = 298;
delete from modems where id = 531;


SELECT a.imei, COUNT(*) as count
FROM (
    SELECT LEFT(imei, LENGTH(imei) - 1) AS imei
        FROM modems
        WHERE imei LIKE '%_'
) a 
GROUP BY a.imei
HAVING COUNT(*) > 1;

SELECT a.imei, COUNT(*) as count
FROM (
    SELECT concat(left(imei, 13), "%%", right(imei, 0)) AS imei FROM modems
) a 
GROUP BY a.imei
HAVING COUNT(*) > 1;


SELECT count(*) from modems;


select m.code, m.imei, mk.name as marca, p.id as p_id, p.name as plataforma from modems m
left join modems_marks mk on m.mark_id = mk.id
left join platforms p on m.platform_id = p.id;


delete from modems where imei = 524;

select id, code, imei, platform_id,created_at from modems where imei like "35370109705136";
select id, code, imei, platform_id,created_at from modems where imei like "35370109887702";
select id, code, imei, platform_id,created_at from modems where imei like "35370109887702";




select id, code, imei, platform_id,created_at from modems where imei = "356153592441189";
select id, code, imei, platform_id,created_at from modems where imei = "358899059787237";
select id, code, imei, platform_id,created_at from modems where imei = "358899059777816";
select id, code, imei, platform_id,created_at from modems where imei = "358899059796840";
select id, code, imei, platform_id,created_at from modems where imei = "358899059795339";
select id, code, imei, platform_id,created_at from modems where imei = "358899059787286";
select id, code, imei, platform_id,created_at from modems where imei = "358899059775273";
select id, code, imei, platform_id,created_at from modems where imei = "358899059794928";
select id, code, imei, platform_id,created_at from modems where imei = "358899059772148";
select id, code, imei, platform_id,created_at from modems where imei = "353701097510297";


delete from modems where id = 356;


SELECT id, code, imei, platform_id FROM modems WHERE platform_id is null;

SELECT id, code, imei, platform_id FROM modems WHERE code = "00-130";


SELECT *
FROM (SELECT * FROM modems WHERE platform_id = 4) AS subquery
WHERE imei NOT IN ("33","33");