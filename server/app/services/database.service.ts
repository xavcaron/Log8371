import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Plant } from "../../../common/tables/Plant";
import { Seed } from "../../../common/tables/Seed";
import { Variety } from "../../../common/tables/Variety";
import { VarietySoilType } from "../../../common/tables/VarietySoilType";

@injectable()
export class DatabaseService {
  // TODO: A MODIFIER POUR VOTRE BD
  public connectionConfig: pg.ConnectionConfig = {
    user: "admin",
    database: "GardenDB",
    password: "admin",
    port: 5432,
    host: "127.0.0.1",
    keepAlive: true,
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  // ======= DEBUG =======
  public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM GardenDB.${tableName};`);
    client.release();
    return res;
  }

  public async getParcels(gardenId: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = `SELECT * FROM GardenDB.Parcel WHERE gardenid = ${gardenId}`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async getStrips(parcelId: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = `SELECT * FROM GardenDB.Strip WHERE parcelid = ${parcelId}`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async getPlantsFromVariety(
    varietyId: string
  ): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = `SELECT * FROM GardenDB.Plant WHERE varietyid = ${varietyId}`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async getSeedsFromVariety(varietyId: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = `SELECT * FROM GardenDB.Seed WHERE varietyid = ${varietyId}`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async getVarietySoilTypesFromVariety(
    varietyId: string
  ): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = `SELECT * FROM GardenDB.VarietySoilType WHERE varietyid = ${varietyId}`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async getPlantsLike(
    searchQuery: string | undefined
  ): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = "";
    if (searchQuery)
      queryText = `SELECT * FROM GardenDB.Plant WHERE LOWER(commonName) LIKE LOWER('%${searchQuery}%') OR LOWER(binomialName) LIKE LOWER('%${searchQuery}%')`;
    else queryText = "SELECT * FROM GardenDB.Plant";
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async insertPlant(plant: Plant): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (
      !plant.binomialname ||
      !plant.commonname ||
      !plant.plantcategory ||
      !plant.planttype ||
      !plant.plantsubtype ||
      !plant.varietyid
    )
      throw new Error("Invalid create plant values");

    const values: string[] = [
      plant.binomialname,
      plant.commonname,
      plant.plantcategory,
      plant.planttype,
      plant.plantsubtype,
      plant.varietyid.toString(),
    ];
    const queryText: string = `INSERT INTO GardenDB.Plant(binomialname, commonname, plantcategory, planttype, plantsubtype, varietyid) VALUES($1, $2, $3, $4, $5, $6);`;
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }
  public async insertSeed(seed: Seed): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!seed.varietyid || !seed.seedmakerid)
      throw new Error("Invalid create seed values");

    const values: string[] = [
      seed.varietyid.toString(),
      seed.seedmakerid.toString(),
      seed.isorganic.toString(),
    ];
    const queryText: string = `INSERT INTO GardenDB.Seed(varietyid, seedmakerid, isorganic) VALUES($1, $2, $3);`;
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  public async insertSoilType(
    soilType: VarietySoilType
  ): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (
      !soilType.varietyid ||
      !soilType.soiltypeid ||
      !soilType.adaptationdescription
    )
      throw new Error("Invalid create soiltype values");

    const values: string[] = [
      soilType.varietyid.toString(),
      soilType.soiltypeid.toString(),
      soilType.adaptationdescription.toString(),
    ];
    const queryText: string = `INSERT INTO GardenDB.VarietySoilType(varietyid, soiltypeid, adaptationdescription) VALUES($1, $2, $3);`;
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  public async updatePlant(plant: Plant): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    let toUpdateValues = [];

    if (plant.commonname.length > 0)
      toUpdateValues.push(`commonname = '${plant.commonname}'`);
    if (plant.plantcategory.length > 0)
      toUpdateValues.push(`plantcategory = '${plant.plantcategory}'`);
    if (plant.planttype.length > 0)
      toUpdateValues.push(`planttype = '${plant.planttype}'`);
    if (plant.plantsubtype.length > 0)
      toUpdateValues.push(`plantsubtype = '${plant.plantsubtype}'`);

    if (
      !plant.binomialname ||
      plant.binomialname.length === 0 ||
      toUpdateValues.length === 0
    )
      throw new Error("Invalid plant update query");

    const query = `UPDATE GardenDB.Plant SET ${toUpdateValues.join(
      ", "
    )} WHERE binomialname = '${plant.binomialname}';`;
    const res = await client.query(query);
    client.release();
    return res;
  }

  public async updateSeed(seed: Seed): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    let toUpdateValues = [];

    toUpdateValues.push(`seedmakerid = '${seed.seedmakerid}'`);
    toUpdateValues.push(`isorganic = '${seed.isorganic}'`);

    if (!seed.seedid) throw new Error("Invalid seed update query");

    const query = `UPDATE GardenDB.Seed SET ${toUpdateValues.join(
      ", "
    )} WHERE seedid = '${seed.seedid}';`;
    const res = await client.query(query);
    client.release();
    return res;
  }

  public async deleteSeed(seedid: string) {
    if (seedid.length === 0) throw new Error("Invalid delete seed query");

    const client = await this.pool.connect();
    const query = `DELETE FROM GardenDB.Seed WHERE seedid = '${seedid}';`;

    const res = await client.query(query);
    client.release();
    return res;
  }

  public async updateVarietySoilType(
    varietySoilType: VarietySoilType
  ): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    let toUpdateValues = [];

    toUpdateValues.push(`soiltypeid = '${varietySoilType.soiltypeid}'`);
    toUpdateValues.push(
      `adaptationdescription = '${varietySoilType.adaptationdescription}'`
    );

    if (!varietySoilType.varietyid || !varietySoilType.varietysoiltypeid)
      throw new Error("Invalid Variety id update query");

    const query = `UPDATE GardenDB.VarietySoilType SET ${toUpdateValues.join(
      ", "
    )} WHERE varietysoiltypeid = '${varietySoilType.varietysoiltypeid}';`;
    const res = await client.query(query);
    client.release();
    return res;
  }

  public async deleteVarietySoilType(varietysoiltypeid: string) {
    if (varietysoiltypeid.length === 0) throw new Error("Invalid delete query");

    const client = await this.pool.connect();
    const query = `DELETE FROM GardenDB.VarietySoilType WHERE varietysoiltypeid = '${varietysoiltypeid}';`;

    const res = await client.query(query);
    client.release();
    return res;
  }

  public async deletePlant(binomialName: string) {
    if (binomialName.length === 0)
      throw new Error("Invalid delete plant query");

    const client = await this.pool.connect();
    const query = `DELETE FROM GardenDB.Plant WHERE binomialName = '${binomialName}';`;

    const res = await client.query(query);
    client.release();
    return res;
  }

  public async getVarietiesByStrip(
    parcelId: number | string,
    stripNum: number | string
  ): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const toSelect =
      "varietyId, varietyName, marketDate, sowingDescription, plantingDescription, careDescription, gatheringDescription, plantingPeriodStart, plantingPeriodEnd, gatheringPeriodStart, gatheringPeriodEnd, generalComment";
    let queryText = `SELECT ${toSelect} FROM GardenDB.Variety NATURAL JOIN GardenDB.SeedStrip NATURAL JOIN GardenDB.Seed WHERE parcelid = ${parcelId} AND stripnumber= ${stripNum}`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async updateVarieties(variety: Variety): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    let toUpdateValues = [];

    if (variety.varietyname.length > 0)
      toUpdateValues.push(`varietyname = '${variety.varietyname}'`);
    if (variety.marketdate.length > 0)
      toUpdateValues.push(`marketdate = '${variety.marketdate}'`);
    if (variety.sowingdescription.length > 0)
      toUpdateValues.push(`sowingdescription = '${variety.sowingdescription}'`);
    if (variety.plantingdescription.length > 0)
      toUpdateValues.push(
        `plantingdescription = '${variety.plantingdescription}'`
      );
    if (variety.caredescription.length > 0)
      toUpdateValues.push(`caredescription = '${variety.caredescription}'`);
    if (variety.gatheringdescription.length > 0)
      toUpdateValues.push(
        `gatheringdescription = '${variety.gatheringdescription}'`
      );
    if (variety.plantingperiodstart.length > 0)
      toUpdateValues.push(
        `plantingperiodstart = '${variety.plantingperiodstart}'`
      );
    if (variety.plantingperiodend.length > 0)
      toUpdateValues.push(`plantingperiodend = '${variety.plantingperiodend}'`);
    if (variety.gatheringperiodstart.length > 0)
      toUpdateValues.push(
        `gatheringperiodstart = '${variety.gatheringperiodstart}'`
      );
    if (variety.gatheringperiodend.length > 0)
      toUpdateValues.push(
        `gatheringperiodend = '${variety.gatheringperiodend}'`
      );
    if (variety.generalcomment.length > 0)
      toUpdateValues.push(`generalcomment = '${variety.generalcomment}'`);

    if (
      !variety.varietyid ||
      variety.varietyid.toString().length === 0 ||
      toUpdateValues.length === 0
    )
      throw new Error("Invalid variety update query");

    const query = `UPDATE GardenDB.Variety SET ${toUpdateValues.join(
      ", "
    )} WHERE varietyId = '${variety.varietyid}';`;
    const res = await client.query(query);
    client.release();
    return res;
  }

  public async insertVariety(variety: Variety): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!variety.varietyname) throw new Error("Invalid create variety values");

    const values: string[] = [
      variety.varietyname,
      variety.marketdate,
      variety.sowingdescription,
      variety.plantingdescription,
      variety.caredescription,
      variety.gatheringdescription,
      variety.plantingperiodstart,
      variety.plantingperiodend,
      variety.gatheringperiodstart,
      variety.gatheringperiodend,
      variety.generalcomment,
    ];
    const queryText: string = `INSERT INTO GardenDB.Variety(varietyname, marketdate, sowingdescription, plantingdescription, caredescription, gatheringdescription, plantingperiodstart, plantingperiodend, gatheringperiodstart, gatheringperiodend, generalcomment) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`;
    const res = await client.query(queryText, values);
    client.release();
    return res.rows[0];
  }

  public async deleteVariety(varietyId: string) {
    if (varietyId.length === 0) throw new Error("Invalid delete query");

    const client = await this.pool.connect();
    const query = `DELETE FROM GardenDB.Variety WHERE varietyId = '${varietyId}';`;

    const res = await client.query(query);
    client.release();
    return res;
  }
}
