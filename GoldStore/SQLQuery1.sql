select * from Products as p
Join ProductSize as s on p.Id = s.ProductId1
where p.JewelryType = 'bracelete'

insert into ProductSize(ProductId1, Size, Quantity) values(10, 'S', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(10, 'M', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(10, 'L', 10)

insert into ProductSize(ProductId1, Size, Quantity) values(11, 'S', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(11, 'M', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(11, 'L', 10)

insert into ProductSize(ProductId1, Size, Quantity) values(12, 'S', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(12, 'M', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(12, 'L', 10)

insert into ProductSize(ProductId1, Size, Quantity) values(13, 'S', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(13, 'M', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(13, 'L', 10)

insert into ProductSize(ProductId1, Size, Quantity) values(14, 'S', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(14, 'M', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(14, 'L', 10)

insert into ProductSize(ProductId1, Size, Quantity) values(15, 'S', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(15, 'M', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(15, 'L', 10)

insert into ProductSize(ProductId1, Size, Quantity) values(16, 'S', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(16, 'M', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(16, 'L', 10)

insert into ProductSize(ProductId1, Size, Quantity) values(17, 'S', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(17, 'M', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(17, 'L', 10)

insert into ProductSize(ProductId1, Size, Quantity) values(18, 'S', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(18, 'M', 15)
insert into ProductSize(ProductId1, Size, Quantity) values(18, 'L', 10)



UPDATE Products
SET Description = 'The Maison’s Cuban Chain bracelet makes a strong style statement with its bold, modern design. Forged from 18-karat yellow gold, the substantial links are meticulously set with fiery white diamonds. Refined Monogram openwork and engraved House emblems make this a luxurious signature piece. The invisible clasp blends into the bracelet, for a sleek, seamless effect.'
WHERE Id = 10

select * from AspNetUsers

