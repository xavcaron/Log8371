SET search_path = gardenDB;

DROP SCHEMA IF EXISTS gardenDB CASCADE;
CREATE SCHEMA gardenDB;

CREATE TABLE IF NOT EXISTS Garden(
    gardenId            SERIAL          NOT NULL,
    gardenName          VARCHAR(50)     NOT NULL,
    gardenSurfaceArea   INTEGER         NOT NULL,
    soilType            VARCHAR(10), --could reference soil type
    maxAuthorizedHeight NUMERIC(4,2),
    isVegetableGarden   BOOLEAN         NOT NULL DEFAULT FALSE,
    isOrchardGarden     BOOLEAN         NOT NULL DEFAULT FALSE, 
    isOrnamentalGarden  BOOLEAN         NOT NULL DEFAULT TRUE, -- only one that defaults to true, since garden has mandatory heritage and ornamental garden has no extra attribute
    PRIMARY KEY (gardenId),
    CONSTRAINT ifIsVeggieGarden
        CHECK ( (isVegetableGarden AND (soilType IS NOT NULL)) OR ((NOT isVegetableGarden) AND (soilType IS NULL))),
    CONSTRAINT ifIsOrchardGarden
        CHECK ( (isOrchardGarden AND (maxAuthorizedHeight IS NOT NULL)) OR ((NOT isOrchardGarden) AND (maxAuthorizedHeight IS NULL))),
    CONSTRAINT ifIsOrnamentalGarden
        CHECK ( isOrnamentalGarden AND (NOT isOrchardGarden) AND (NOT isVegetableGarden) OR (NOT isOrnamentalGarden)),
    CONSTRAINT isOfAType
        CHECK ( isVegetableGarden OR isOrchardGarden OR isOrnamentalGarden)
);

CREATE TABLE IF NOT EXISTS Parcel(
    parcelID            SERIAL          NOT NULL,
    parcelCoordinates   VARCHAR(30)     NOT NULL,
    parcelDimensions    VARCHAR(10)     NOT NULL,
    gardenId            INTEGER         NOT NULL,
    PRIMARY KEY(parcelID),
    FOREIGN KEY (gardenId) REFERENCES Garden(gardenId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Strip(
    stripNumber             INTEGER           NOT NULL,
    geographicCoordinates   VARCHAR(30)       NOT NULL,
    parcelID                INTEGER           NOT NULL,
    PRIMARY KEY (parcelID, stripNumber),
    FOREIGN KEY (parcelID) REFERENCES Parcel(parcelID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS FallowState(
    fallowID            SERIAL          NOT NULL,
    fallowStartDate     DATE            NOT NULL,
    fallowEndDate       DATE,
    stripNumber         INTEGER         NOT NULL,
    parcelID            INTEGER         NOT NULL,
    PRIMARY KEY (fallowID),
    FOREIGN KEY (stripNumber, parcelID) REFERENCES Strip(stripNumber, parcelID) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT isValidPeriod
        CHECK ((fallowStartDate < fallowEndDate) AND 
               ((fallowEndDate - fallowStartDate) <= 365)
        )
);

CREATE TABLE IF NOT EXISTS Variety(
    varietyID               SERIAL          NOT NULL,
    varietyName             VARCHAR(50)     NOT NULL,
    marketDate              DATE,
    sowingDescription       TEXT,
    plantingDescription     TEXT,
    careDescription         TEXT,
    gatheringDescription    TEXT,
    plantingPeriodStart     VARCHAR(15),
    plantingPeriodEnd       VARCHAR(15),
    gatheringPeriodStart    VARCHAR(15),
    gatheringPeriodEnd      VARCHAR(15),
    generalComment          TEXT,
    PRIMARY KEY (varietyID)
);

CREATE TABLE IF NOT EXISTS Plant(
    binomialName        VARCHAR(50)     NOT NULL,
    commonName          VARCHAR(50)     NOT NULL,
    plantCategory       VARCHAR(30)     NOT NULL,
    plantType           VARCHAR(30)     NOT NULL,
    plantSubType        VARCHAR(30)     NOT NULL,
    varietyID           INTEGER         NOT NULL,
    PRIMARY KEY (binomialName),
    FOREIGN KEY (varietyID) REFERENCES Variety(varietyID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Impact(
    impactID            SERIAL          NOT NULL,
    isBeneficial        BOOLEAN         NOT NULL DEFAULT TRUE,
    impactDescription   TEXT,
    firstAffectedPlant  VARCHAR(50)     NOT NULL,
    secondAffectedPlant VARCHAR(50)     NOT NULL,
    PRIMARY KEY (impactID),
    FOREIGN KEY (firstAffectedPlant) REFERENCES Plant(binomialName) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (secondAffectedPlant) REFERENCES Plant(binomialName) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Threat(
    threatID            SERIAL          NOT NULL,
    threatDescription   TEXT            NOT NULL,
    possibleSolutions   TEXT            NOT NULL,
    PRIMARY KEY (threatID)
);

CREATE TABLE IF NOT EXISTS PlantThreat(
    binomialName       VARCHAR(50)     NOT NULL,
    threatID            INTEGER         NOT NULL,
    PRIMARY KEY (binomialName, threatID),
    FOREIGN KEY (binomialName) REFERENCES Plant(binomialName) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (threatID) REFERENCES Threat(threatID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SoilType(
    soilTypeID      SERIAL      NOT NULL,
    soilTypeName    VARCHAR(50) NOT NULL,
    PRIMARY KEY (soilTypeID)
);

CREATE TABLE IF NOT EXISTS VarietySoilType(
    varietySoilTypeID       SERIAL      NOT NULL,
    soilTypeID              INTEGER     NOT NULL,
    varietyID               INTEGER     NOT NULL,
    adaptationDescription   TEXT        NOT NULL,
    PRIMARY KEY (varietySoilTypeID),
    FOREIGN KEY (varietyID) REFERENCES Variety(varietyID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (soilTypeID) REFERENCES SoilType(soilTypeID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SeedMaker(
    seedMakerID         SERIAL          NOT NULL,
    seedMakerName       VARCHAR(50)     NOT NULL,
    websiteURL          TEXT,
    PRIMARY KEY (seedMakerID)
);

CREATE TABLE IF NOT EXISTS Seed(
    seedID              SERIAL          NOT NULL,
    varietyID           INTEGER         NOT NULL,
    seedMakerID         INTEGER         NOT NULL,
    isOrganic           BOOLEAN         NOT NULL DEFAULT FALSE,
    PRIMARY KEY (seedID),
    FOREIGN KEY (varietyID) REFERENCES Variety(varietyID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (seedMakerID) REFERENCES SeedMaker(seedMakerID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SeedStrip(
    seedID              INTEGER         NOT NULL,
    stripNumber         INTEGER         NOT NULL,
    parcelID            INTEGER         NOT NULL,
    PRIMARY KEY (seedID, stripNumber, parcelID),
    FOREIGN KEY (seedID) REFERENCES Seed(seedID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (stripNumber, parcelID) REFERENCES Strip(stripNumber, parcelID) ON UPDATE CASCADE ON DELETE CASCADE
);
