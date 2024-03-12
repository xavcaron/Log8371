SET search_path = gardenDB;



INSERT INTO gardenDB.Garden (gardenName, gardenSurfaceArea, soilType, maxAuthorizedHeight, isVegetableGarden, isOrchardGarden, isOrnamentalGarden)
VALUES
    ('Jardin de roses', 200, NULL, NULL, FALSE, FALSE, TRUE),
    ('Jardin Latulippe', 50, NULL, NULL, FALSE, FALSE, TRUE),
    ('La cour des Vachon', 10, NULL, NULL, FALSE, FALSE, TRUE),
    ('Jardin Botanique de Poly', 69, 'Argileux', NULL, TRUE, FALSE, FALSE),
    ('Jardin de Crazy Dave', 42, 'Rocailleux', 10.25, TRUE, TRUE, FALSE),
    ('Les champ champetre', 125, NULL, 10.25, FALSE, TRUE, FALSE),
    ('Jardin Fleurs et Fruits', 500, NULL, 15.00, FALSE, TRUE, FALSE),  
    ('Serre Aux Bleuets', 300, 'Tourbeuse', NULL, TRUE, FALSE, FALSE),  
    ('Pommiers de Samuel Poirier', 500, NULL, 15.00, FALSE, TRUE, FALSE);

-- DELETE FROM gardenDB.Garden; -- DONT FORGET TO REMOVE
SELECT * FROM gardenDB.Garden;

INSERT INTO gardenDB.Parcel(parcelCoordinates, parcelDimensions, gardenId)
VALUES
    ('-46N, 32W', '10m x 20m', 1),
    ('-46N, 33W', '20m x 20m', 1),
    ('52N, 12W', '10m x 20m', 2),
    ('52N, 11W', '10m x 5m', 2),
    ('52N, 13W', '10m x 5m', 2),
    ('25N, -30W', '4m x 6m', 3),
    ('25N, -30W', '5m x 6m', 3),
    ('25N, -31W', '4m x 6m', 3);

-- DELETE FROM gardenDB.Parcel; -- DONT FORGET TO REMOVE
SELECT * FROM gardenDB.Parcel;

INSERT INTO gardenDB.Strip(StripNumber, geographicCoordinates, parcelID)
VALUES
    (1, '-46N, 32W', 1),
    (2, '-46N, 32W', 1),
    (1, '52N, 12W', 2),
    (2, '54N, 14W', 2),
    (3, '56N, 16W', 2),
    (1, '27N, -31W', 3),
    (2, '28N, -37W', 3),
    (3, '29N, -39W', 3),
    (4, '21N, -31W', 4),
    (5, '23N, -37W', 4),
    (6, '25N, -39W', 5),
    (7, '28N, -37W', 5),
    (8, '29N, -39W', 3),
    (9, '21N, -31W', 3),
    (10, '23N, -37W', 4),
    (11, '25N, -39W', 6);

-- DELETE FROM gardenDB.Strip; -- DONT FORGET TO REMOVE
SELECT * FROM gardenDB.Strip;

INSERT INTO gardenDB.FallowState(fallowStartDate, fallowEndDate, stripNumber, parcelID)
VALUES
    ('2022-04-06', '2022-05-06', 1, 1),
    ('2021-04-06', '2021-07-28', 1, 1),
    ('2022-04-06', '2022-12-31', 1, 1),
    ('2022-04-11', '2022-08-11', 2, 2),
    ('2021-04-06', '2021-07-28', 1, 2),
    ('2022-04-06', '2022-12-31', 1, 3),
    ('2022-04-06', '2023-04-06', 1, 3),
    ('2020-03-06', '2020-04-06', 11, 6),
    ('2022-04-15', NULL, 6, 5);

-- DELETE FROM gardenDB.FallowState;

SELECT * FROM gardenDB.FallowState;

    
INSERT INTO gardenDB.Variety(varietyName, marketDate,
    sowingDescription,
    plantingDescription,
    careDescription,
    gatheringDescription,
    plantingPeriodStart,
    plantingPeriodEnd,
    gatheringPeriodStart,
    gatheringPeriodEnd,
    generalComment)
VALUES
    ('A', '2009-08-05',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare massa eget egestas purus viverra accumsan.',
    'Quis auctor elit sed vulputate mi. Quisque id diam vel quam elementum. Vivamus at augue eget arcu dictum varius duis at. Maecenas ultricies mi eget mauris. ',
    'Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Et tortor at risus viverra adipiscing at in tellus integer.',
    'Mi sit amet mauris commodo. Lacinia quis vel eros donec.',
    'September',
    'September',
    'September',
    'September',
    'At tellus at urna condimentum. Cursus risus at ultrices mi. Consectetur adipiscing elit ut aliquam purus.'
    ),
    ('B', '2021-12-05',
    'Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin.',
    'Volutpat maecenas volutpat blandit aliquam etiam erat velit. Ut sem nulla pharetra diam sit amet nisl suscipit. Nam libero justo laoreet sit amet.',
    'Malesuada fames ac turpis egestas. Euismod elementum nisi quis eleifend quam adipiscing.',
    'Ultricies integer quis auctor elit sed vulputate. Rutrum tellus pellentesque eu tincidunt tortor aliquam. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Eu consequat ac felis donec et odio. ',
    'October',
    'October',
    'October',
    'October',
    'Tempus urna et pharetra pharetra massa massa ultricies. Luctus accumsan tortor posuere ac ut consequat. Ut ornare lectus sit amet est placerat in egestas. '
    ),
    ('C', '1975-05-21',
    'Enim sed faucibus turpis in eu. Tellus molestie nunc non blandit. Fames ac turpis egestas sed tempus urna et pharetra pharetra.',
    'Lobortis mattis aliquam faucibus purus in massa.',
    'Aliquet lectus proin nibh nisl condimentum id venenatis a condimentum.',
    'Laoreet suspendisse interdum consectetur libero id. Convallis posuere morbi leo urna molestie at elementum eu facilisis. Egestas dui id ornare arcu odio ut sem nulla.',
    'December',
    'December',
    'December',
    'December',
    'Nibh nisl condimentum id venenatis a. Massa sed elementum tempus egestas sed. Viverra suspendisse potenti nullam ac tortor vitae. Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Duis ultricies lacus sed turpis tincidunt. '
    ),
    ('Pomme Multicolore', '1969-05-21',
    'Odio euismod lacinia at quis. Amet nisl purus in mollis nunc sed id semper risus.',
    'Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Risus commodo viverra maecenas accumsan lacus vel.',
    'Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Suscipit tellus mauris a diam maecenas sed enim ut sem. Nunc id cursus metus aliquam eleifend mi in.',
    NULL,
    NULL,
    NULL, 
    'January',
    'January',
    NULL
    ),
    ('Pois Magique', '1979-05-25',
    NULL,
    'Lobortis mattis aliquam faucibus purus in massa.',
    'Aliquet lectus proin nibh nisl condimentum id venenatis a condimentum.',
    NULL,
    'Febuary',
    'Febuary',
    NULL,
    NULL,
    'Nibh nisl condimentum id venenatis a. Massa sed elementum tempus egestas sed. Viverra suspendisse potenti nullam ac tortor vitae. Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Duis ultricies lacus sed turpis tincidunt. '
    ),
    ('D', '1989-05-25',
    NULL,
    'Lobortis mattis aliquam faucibus purus in massa.',
    'Aliquet lectus proin nibh nisl condimentum id venenatis a condimentum.',
    NULL,
    'March',
    'March',
    NULL,
    NULL,
    'Nibh nisl condimentum id venenatis a. Massa sed elementum tempus egestas sed. Viverra suspendisse potenti nullam ac tortor vitae. Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Duis ultricies lacus sed turpis tincidunt. '
    ),
    ('E', '1989-05-25',
    NULL,
    'Lobortis mattis aliquam faucibus purus in massa.',
    'Aliquet lectus proin nibh nisl condimentum id venenatis a condimentum.',
    NULL,
    'April',
    'April',
    NULL,
    NULL,
    'Nibh nisl condimentum id venenatis a. Massa sed elementum tempus egestas sed. Viverra suspendisse potenti nullam ac tortor vitae. Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Duis ultricies lacus sed turpis tincidunt. '
    ),
    ('Fougere', '1949-01-22',
    NULL,
    'Lobortis mattis aliquam faucibus purus in massa.',
    'Aliquet lectus proin nibh nisl condimentum id venenatis a condimentum.',
    NULL,
    'June',
    'June',
    NULL,
    NULL,
    'Nibh nisl condimentum id venenatis a. Massa sed elementum tempus egestas sed. Viverra suspendisse potenti nullam ac tortor vitae. Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Duis ultricies lacus sed turpis tincidunt. '
    ),
    ('Tuberosum', '1911-07-01',
    NULL,
    'Lobortis mattis aliquam faucibus purus in massa.',
    'Aliquet lectus proin nibh nisl condimentum id venenatis a condimentum.',
    NULL,
    'August',
    'August',
    NULL,
    NULL,
    'Nibh nisl condimentum id venenatis a. Massa sed elementum tempus egestas sed. Viverra suspendisse potenti nullam ac tortor vitae. Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Duis ultricies lacus sed turpis tincidunt. '
    );

SELECT * FROM gardenDB.Variety;

INSERT INTO gardenDB.Plant(binomialName, commonName, plantCategory, plantType, plantSubType, varietyID)
VALUES
('Agapanthus africanus', 'African lily', 'fleur', 'anuelle', 'fleur random', 1),
('Agrimonia eupatoria', 'Agrimony', 'fleur', 'vivace', 'fleur random', 1),
('Alopecurus borealis', 'Alpine foxtail', 'fleur', 'anuelle', 'fleur random', 1),
('Berberis julianae', 'Beberis', 'racine', 'legume', 'comestible', 2),
('Brassica oleracea', 'Brussels sprout', 'racine', 'legume', 'non-comestible', 2),
('Tamarix tetranda', 'Tamarisk', 'racine', 'champignon', 'comestible', 3),
('Juncus triglumis', 'Three flowered rush', 'champignon', 'legume', 'non-comestible', 3),
('Pommus Magicus', 'Super Pomme', 'fruit', 'magique', 'comestible', 4),
('Magicus Grenpeas', 'Magic Green Peas', 'legumes', 'magique', 'non-comestible', 5),
('Randomus D', 'Random D plant', 'legumes', 'magique', 'non-comestible', 6),
('Randomus E', 'Random E plant', 'legumes', 'magique', 'non-comestible', 7),
('Primerus Tuberosumus', 'Tuberosum 1', 'legumes', 'pomme de terre', 'comestible', 9),
('Secondus Tuberosumus', 'Tuberosum 2', 'legumes', 'patate', 'comestible', 9),
('Fougere Blebneain', 'Fougere 1', 'herbe', 'truc', 'binouche', 8),
('Fougere Yoehiuvan', 'Fougere 2', 'herbe', 'truc', 'binouche', 8);

SELECT * FROM gardenDB.Plant;


INSERT INTO gardenDB.Impact(isBeneficial, impactDescription, firstAffectedPlant, secondAffectedPlant)
VALUES
    (true, 'poussen plus vites si plantees sur le meme rang', 'Agapanthus africanus','Agrimonia eupatoria'),
    (true, 'poussen plus vites si plantees sur le meme rang', 'Juncus triglumis','Alopecurus borealis'),
    (true, 'sont heureuse ensemble', 'Brassica oleracea','Alopecurus borealis'),
    (false, 'lune arrache les racines de lautre', 'Tamarix tetranda','Berberis julianae'),
    (false, 'lune arrache les racines de lautre', 'Brassica oleracea','Berberis julianae');

SELECT * FROM gardenDB.Impact;

INSERT INTO gardenDB.Threat(threatDescription, possibleSolutions)
VALUES 
    ('Attaque de pucerons', 'arroser de pesticides'), 
    ('Attaque de caribou', 'entourer dune cloture electrique'),
    ('Se fait manger par les chevreuil', 'engager un chasseur'),
    ('asseche rapidmeent au soleil', 'recouvrir dune toile qui limite lensoleillement');

SELECT * FROM gardenDB.Threat;


INSERT INTO gardenDB.PlantThreat(binomialName, threatID)
VALUES
    ('Agapanthus africanus', 1), 
    ('Berberis julianae', 1), 
    ('Brassica oleracea', 1), 
    ('Agapanthus africanus', 2), 
    ('Alopecurus borealis', 2), 
    ('Agapanthus africanus', 3), 
    ('Juncus triglumis', 3), 
    ('Fougere Blebneain', 1), 
    ('Fougere Yoehiuvan', 2), 
    ('Berberis julianae', 4);
SELECT * FROM gardenDB.PlantThreat;

INSERT INTO gardenDB.SoilType(soilTypeName)
VALUES
    ('humifere'),
    ('rocailleux'),
    ('argileux'),
    ('limoneux'),
    ('sableux');

SELECT * FROM gardenDB.SoilType;

INSERT INTO gardenDB.varietysoiltype(soilTypeID, varietyID, adaptationDescription)
VALUES
    (1, 1, 'Recommandé'),
    (1, 2, 'Idéal'),
    (2, 1, 'Non-recommandé'),
    (2, 2, 'Recommandé'),
    (3, 1, 'Ne poussera pas'),
    (3, 2, 'À éviter si possible');

SELECT * FROM gardenDB.varietysoiltype;

INSERT INTO gardenDB.SeedMaker(seedMakerName, websiteURL)
VALUES
    ('MegaSemence2000', 'www.megasemence2000.com'),
    ('ultraPlante', 'www.ultraPlante.com'),
    ('GardenPower', 'www.gardenPower.io'),
    ('SeedPower', 'www.idk.com');

SELECT * FROM gardenDB.SeedMaker;

INSERT INTO gardenDB.Seed(varietyID, seedMakerID, isOrganic)
VALUES
    (1, 1, true),
    (2, 2, true),
    (3, 4, true),
    (2, 4, true), 
    (1, 4, true),
    (3, 1, true),
    (2, 1, true),
    (2, 1, false);
SELECT * FROM gardenDB.Seed;

INSERT INTO gardenDB.SeedStrip(parcelID, stripNumber, seedID)
VALUES
    (1, 1, 1),
    (1, 2, 1), 
    (1, 2, 2),
    (2, 1, 1),
    (2, 3, 2),
    (3, 3, 3),
    (3, 3, 5),
    (3, 3, 6),
    (4, 4, 4), 
    (4, 5, 5),
    (5, 6, 6),
    (5, 6, 7),
    (6, 11, 8);

-- DELETE FROM gardenDB.SeedStrip;
SELECT * FROM gardenDB.SeedStrip;




