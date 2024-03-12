-- 1) (2 points) Lister toutes les plantes qui sont actuellement dans les rangs d’un jardin
SELECT DISTINCT (binomialName, commonName, plantCategory, plantType, plantSubType, varietyID)
FROM gardenDB.SeedStrip NATURAL JOIN gardenDB.Seed NATURAL JOIN gardenDB.Plant;

-- 2) (2 points) Lister le nombre de rangs minimum et maximum sur les parcelles d’un jardin donné (choisissez-en dans vos données)
SELECT MAX(count.stripCount) AS maxStripCount, MIN(count.stripCount) AS minStripCount
FROM ( 
    SELECT ALL COUNT(stripNumber) as stripCount
    FROM gardenDB.Parcel NATURAL LEFT JOIN gardenDB.Strip
    WHERE gardenId = 2
    GROUP BY parcelID
    ) AS count;

-- 3) (2 points) Lister les détails des parcelles qui ont la variété de plante A et la variété de plante B
(SELECT parcelID, parcelCoordinates, parcelDimensions, gardenID
FROM gardenDB.Parcel NATURAL JOIN gardenDB.SeedStrip NATURAL JOIN gardenDB.Seed
WHERE varietyID = 1) 
INTERSECT
(SELECT parcelID, parcelCoordinates, parcelDimensions, gardenID
FROM gardenDB.Parcel NATURAL JOIN gardenDB.SeedStrip NATURAL JOIN gardenDB.Seed
WHERE varietyID = 2); 

-- 4) (2 points) Lister les détails des parcelles qui ont la variété de plante A ou la variété de plante B
(SELECT parcelID, parcelCoordinates, parcelDimensions, gardenID
FROM gardenDB.Parcel NATURAL JOIN gardenDB.SeedStrip NATURAL JOIN gardenDB.Seed
WHERE varietyID = 1) 
UNION
(SELECT parcelID, parcelCoordinates, parcelDimensions, gardenID
FROM gardenDB.Parcel NATURAL JOIN gardenDB.SeedStrip NATURAL JOIN gardenDB.Seed
WHERE varietyID = 3);

-- 5) (2 points) Lister les détails des parcelles qui ont la variété de plante A mais pas la variété de plante B
(SELECT parcelID, parcelCoordinates, parcelDimensions, gardenID
FROM gardenDB.Parcel NATURAL JOIN gardenDB.SeedStrip NATURAL JOIN gardenDB.Seed
WHERE varietyID = 3) 
EXCEPT
(SELECT parcelID, parcelCoordinates, parcelDimensions, gardenID
FROM gardenDB.Parcel NATURAL JOIN gardenDB.SeedStrip NATURAL JOIN gardenDB.Seed
WHERE varietyID = 2);

-- 6) (2 points) Lister tous les rangs d’un jardin donné avec leurs variétés de plantes s’ils sont cultivés. Dans le cas contraire, affichez null. 
SELECT Strips.parcelStripID, varietyID FROM 
( 
	SELECT (parcelID, stripNumber) as parcelStripID
	FROM gardenDB.Parcel NATURAL JOIN gardenDB.Strip 
	WHERE gardenID = 2 -- Paramètre que l'on peut changer selon le jardin donné 
) as Strips 
LEFT OUTER JOIN 
( 
    SELECT * FROM
	(SELECT DISTINCT varietyID, (parcelID, stripNumber) as parcelStripID 
    FROM gardenDB.SeedStrip NATURAL JOIN gardenDB.Seed) as Varieties 
    NATURAL JOIN gardenDB.Variety
) as SpecifiedVarieties
ON Strips.parcelStripID = SpecifiedVarieties.parcelStripID;

-- 7) (2 points) Quel est le nombre de jardins uniquement avec des semences biologiques? 
SELECT DISTINCT COUNT(g.gardenID) as nbOrganicGardens  
FROM gardenDB.Garden g 
WHERE g.gardenID NOT IN ( 
	SELECT p.gardenID 
	FROM gardenDB.Parcel p 
	WHERE EXISTS ( 
		SELECT * 
		FROM gardenDB.SeedStrip NATURAL JOIN gardenDB.Seed 
		WHERE parcelID = p.parcelID 
		AND isOrganic = false 
	)
) AND g.gardenID IN (   --sans cette 2e clause, les jardins vides sont comptés comme n'ayant que des semences biologiques
    SELECT DISTINCT p.gardenID
    FROM gardenDB.Parcel p
    WHERE p.ParcelID IN (
        SELECT DISTINCT parcelID
        FROM gardenDB.SeedStrip NATURAL JOIN gardenDB.Seed
    )
); 

-- 8) (2 points) Lister tous les jardins qui ont au moins un rang en jachère 
SELECT * FROM gardenDB.Garden NATURAL JOIN (
	SELECT DISTINCT gardenID FROM gardenDB.Parcel NATURAL JOIN (
		SELECT DISTINCT parcelID FROM gardenDB.FallowState WHERE (
			FallowEndDate IS NULL OR FallowEndDate > current_date
		)
	) as FallowParcels
) as FallowGardens;

-- 9) (2 points) Quelles sont les menaces auxquelles sont sensibles les plantes fougères? 
SELECT (threatDescription) FROM gardenDB.Threat NATURAL JOIN ( 
SELECT * FROM gardenDB.PlantThreat NATURAL JOIN ( 
	SELECT binomialName FROM gardenDB.Plant WHERE varietyID IN ( 
		SELECT varietyID FROM gardenDB.Variety WHERE varietyName = 'Fougere' 
		) 
	) as Fougeres 
) as MenacesFougeres;

-- 10) (2 points) Quelles sont les plantes de la variété tuberosum?
SELECT * FROM gardenDB.Plant WHERE varietyID IN ( 
	SELECT varietyID FROM gardenDB.Variety WHERE varietyName = 'Tuberosum'
);
