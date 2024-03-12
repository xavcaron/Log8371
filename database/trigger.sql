SET search_path = gardenDB;

CREATE TABLE IF NOT EXISTS GardenLog (
    id              SERIAL      NOT NULL,
    seedID       	INTEGER     NOT NULL,
    parcelID        INTEGER     NOT NULL,
    stripNumber     INTEGER     NOT NULL,
    dateOfInsert    DATE        NOT NULL,
    PRIMARY KEY (id)
);

CREATE OR REPLACE FUNCTION add_to_log()
RETURNS trigger AS $$
	DECLARE garden INTEGER;
BEGIN
	SELECT gardenID
	INTO garden
	FROM gardenDB.Parcel 
	WHERE parcelID = new.parcelID;
	IF garden = 1 THEN
		INSERT INTO GardenLog(seedID, stripNumber, parcelID, dateOfInsert) VALUES (new.seedID, new.stripNumber, new.parcelID, current_date);
	END IF;
	RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE TRIGGER log_variety_insert AFTER INSERT
ON gardenDB.SeedStrip
FOR EACH ROW
EXECUTE FUNCTION add_to_log();


-- Values for testing, the third parcel is not in garden where ID = 1, so it should not show up in GardenLog

INSERT INTO gardenDB.SeedStrip(seedID, stripNumber, parcelID)
VALUES
    (7, 1, 1),
    (8, 1, 1),
	(2, 11, 6);

SELECT * FROM gardenDB.SeedStrip;
SELECT * FROM gardenDB.GardenLog;

