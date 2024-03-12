import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";
import { Garden } from "../../../common/tables/Garden";
import { Parcel } from "../../../common/tables/Parcel";
import { Plant } from "../../../common/tables/Plant";
import { Seed } from "../../../common/tables/Seed";
import { SeedMaker } from "../../../common/tables/SeedMaker";
import { Strip } from "../../../common/tables/Strip";
import { Variety } from "../../../common/tables/Variety";
import { VarietySoilType } from "../../../common/tables/VarietySoilType";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();
    router.get("/gardens", (req: Request, res: Response) => {
      this.databaseService
        .getAllFromTable("Garden")
        .then((queryResult: pg.QueryResult) => {
          const gardens: Garden[] = queryResult.rows;
          res.json(gardens);
        })
        .catch((err) => {
          console.log(err);
          res.status(404);
        });
    });

    router.get("/parcels/:gardenId", (req: Request, res: Response) => {
      this.databaseService
        .getParcels(parseInt(req.params.gardenId))
        .then((queryResult: pg.QueryResult) => {
          const parcels: Parcel[] = queryResult.rows;
          res.json(parcels);
        })
        .catch((err) => {
          console.log(err);
          res.status(404);
        });
    });

    router.get("/strips/:parcelId", (req: Request, res: Response) => {
      this.databaseService
        .getStrips(parseInt(req.params.parcelId))
        .then((queryResult: pg.QueryResult) => {
          const strips: Strip[] = queryResult.rows;
          res.json(strips);
        })
        .catch((err) => {
          console.log(err);
          res.status(404);
        });
    });

    router.get(
      "/varieties/:parcelId/:stripNum",
      (req: Request, res: Response) => {
        this.databaseService
          .getVarietiesByStrip(req.params.parcelId, req.params.stripNum)
          .then((queryResult: pg.QueryResult) => {
            const varieties: Variety[] = queryResult.rows;
            res.json(varieties);
          })
          .catch((err) => {
            console.log(err);
            res.status(404);
          });
      }
    );

    router.get("/varieties", (req: Request, res: Response) => {
      this.databaseService
        .getAllFromTable("Variety")
        .then((queryResult: pg.QueryResult) => {
          const varieties: Variety[] = queryResult.rows;
          res.json(varieties);
        })
        .catch((err) => {
          console.log(err);
          res.status(404);
        });
    });

    router.post(
      "/varieties/delete/:varietyId",
      (req: Request, res: Response, _: NextFunction) => {
        const varietyId: string = req.params.varietyId;
        this.databaseService
          .deleteVariety(varietyId)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.status(404);
          });
      }
    );

    router.post(
      "/varieties/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const variety: Variety = req.body;

        this.databaseService
          .insertVariety(variety)
          .then((result: pg.QueryResult) => {
            res.json(result);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
            res.status(404);
          });
      }
    );

    router.put(
      "/varieties/update",
      (req: Request, res: Response, _: NextFunction) => {
        const variety: Variety = req.body;
        this.databaseService
          .updateVarieties(variety)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.status(404);
          });
      }
    );

    router.get("/plants", (req: Request, res: Response) => {
      this.databaseService
        .getAllFromTable("Plant")
        .then((queryResult: pg.QueryResult) => {
          const plants: Plant[] = queryResult.rows;
          res.json(plants);
        })
        .catch((err) => {
          console.log(err);
          res.status(404);
        });
    });

    router.get("/plants/:searchQuery", (req: Request, res: Response) => {
      this.databaseService
        .getPlantsLike(req.params.searchQuery)
        .then((queryResult: pg.QueryResult) => {
          const plants: Plant[] = queryResult.rows;
          res.json(plants);
        })
        .catch((err) => {
          console.log(err);
          res.status(404);
        });
    });

    router.get("/plantsfromvariety/:id", (req: Request, res: Response) => {
      this.databaseService
        .getPlantsFromVariety(req.params.id)
        .then((queryResult: pg.QueryResult) => {
          const plants: Plant[] = queryResult.rows;
          res.json(plants);
        })
        .catch((err) => {
          console.log(err);
          res.status(404);
        });
    });

    router.get("/seedsfromvariety/:id", (req: Request, res: Response) => {
      this.databaseService
        .getSeedsFromVariety(req.params.id)
        .then((queryResult: pg.QueryResult) => {
          const seeds: Seed[] = queryResult.rows;
          res.json(seeds);
        })
        .catch((err) => {
          console.log(err);
          res.status(404);
        });
    });

    router.get(
      "/varietysoiltypesfromvariety/:id",
      (req: Request, res: Response) => {
        this.databaseService
          .getVarietySoilTypesFromVariety(req.params.id)
          .then((queryResult: pg.QueryResult) => {
            const varietySoilTypes: VarietySoilType[] = queryResult.rows;
            res.json(varietySoilTypes);
          })
          .catch((err) => {
            console.log(err);
            res.status(404);
          });
      }
    );

    router.post(
      "/plants/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const plant: Plant = req.body;

        this.databaseService
          .insertPlant(plant)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
            res.status(404);
          });
      }
    );

    router.post(
      "/seeds/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const seed: Seed = req.body;

        this.databaseService
          .insertSeed(seed)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
            res.status(404);
          });
      }
    );

    router.put(
      "/plants/update",
      (req: Request, res: Response, _: NextFunction) => {
        const plant: Plant = req.body;
        this.databaseService
          .updatePlant(plant)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.status(404);
          });
      }
    );

    router.put(
      "/seeds/update",
      (req: Request, res: Response, _: NextFunction) => {
        const seed: Seed = req.body;
        this.databaseService
          .updateSeed(seed)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.status(404);
          });
      }
    );

    router.post(
      "/seeds/delete/:seedid",
      (req: Request, res: Response, _: NextFunction) => {
        const seedid: string = req.params.seedid;
        this.databaseService
          .deleteSeed(seedid)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.status(404);
          });
      }
    );

    router.put(
      "/varietysoiltypes/update",
      (req: Request, res: Response, _: NextFunction) => {
        const varietySoilType: VarietySoilType = req.body;
        this.databaseService
          .updateVarietySoilType(varietySoilType)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.status(404);
          });
      }
    );

    router.post(
      "/plants/delete/:binomialname",
      (req: Request, res: Response, _: NextFunction) => {
        const binomialname: string = req.params.binomialname;
        this.databaseService
          .deletePlant(binomialname)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.status(404);
          });
      }
    );

    router.get("/seedmakers", (req: Request, res: Response) => {
      this.databaseService
        .getAllFromTable("SeedMaker")
        .then((queryResult: pg.QueryResult) => {
          const seedMakers: SeedMaker[] = queryResult.rows;
          res.json(seedMakers);
        })
        .catch((err) => {
          console.log(err);
          res.status(404);
        });
    });

    router.get("/soiltypes", (req: Request, res: Response) => {
      this.databaseService
        .getAllFromTable("SoilType")
        .then((queryResult: pg.QueryResult) => {
          const soilTypes: SeedMaker[] = queryResult.rows;
          res.json(soilTypes);
        })
        .catch((err) => {
          console.log(err);
          res.status(404);
        });
    });

    router.post(
      "/varietysoiltypes/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const soiltype: VarietySoilType = req.body;

        this.databaseService
          .insertSoilType(soiltype)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
            res.status(404);
          });
      }
    );

    router.post(
      "/varietysoiltypes/delete/:varietysoiltypeid",
      (req: Request, res: Response, _: NextFunction) => {
        const varietysoiltypeid: string = req.params.varietysoiltypeid;
        this.databaseService
          .deleteVarietySoilType(varietysoiltypeid)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.status(404);
          });
      }
    );

    // ======= GENERAL ROUTES =======
    router.get(
      "/tables/:tableName",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getAllFromTable(req.params.tableName)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.status(404);
          });
      }
    );

    return router;
  }
}
