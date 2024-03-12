import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { Observable, of, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Garden } from "../../../common/tables/Garden";
import { Parcel } from "../../../common/tables/Parcel";
import { Plant } from "../../../common/tables/Plant";
import { Seed } from "../../../common/tables/Seed";
import { SeedMaker } from "../../../common/tables/SeedMaker";
import { SoilType } from "../../../common/tables/SoilType";
import { Strip } from "../../../common/tables/Strip";
import { Variety } from "../../../common/tables/Variety";
import { VarietySoilType } from "../../../common/tables/VarietySoilType";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}

  private _listners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }

  // ======== GARDENS =========

  public getGardens(): Observable<Garden[]> {
    return this.http
      .get<Garden[]>(this.BASE_URL + "/gardens")
      .pipe(catchError(this.handleError<Garden[]>("getGardens")));
  }

  public getParcels(gardenId: number): Observable<Parcel[]> {
    return this.http
      .get<Parcel[]>(this.BASE_URL + `/parcels/${gardenId}`)
      .pipe(catchError(this.handleError<Parcel[]>("getParcels")));
  }

  public getStrips(parcelId: number): Observable<Strip[]> {
    return this.http
      .get<Strip[]>(this.BASE_URL + `/strips/${parcelId}`)
      .pipe(catchError(this.handleError<Strip[]>("getStrips")));
  }

  // ======== PLANTS =========

  public getPlants(varietyId: number): Observable<Plant[]> {
    return this.http
      .get<Plant[]>(this.BASE_URL + `/plantsfromvariety/${varietyId}`)
      .pipe(catchError(this.handleError<Plant[]>("getPlants")));
  }

  public getPlantsLike(searchQuery: string): Observable<Plant[]> {
    return this.http
      .get<Plant[]>(this.BASE_URL + `/plants/${searchQuery}`)
      .pipe(catchError(this.handleError<Plant[]>("getPlants")));
  }

  public insertPlant(plant: Plant): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + `/plants/insert/`, plant)
      .pipe(catchError(this.handleError<number>("insertPlant")));
  }

  public updatePlant(newPlant: Plant) {
    return this.http
      .put<number>(this.BASE_URL + "/plants/update/", newPlant)
      .pipe(catchError(this.handleError<number>("updatePlant")));
  }

  public deletePlant(binomialName: string): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/plants/delete/" + binomialName, {})
      .pipe(catchError(this.handleError<number>("deletePlant")));
  }

  // ======== SOIL TYPES =========

  public getSoilTypes(): Observable<SoilType[]> {
    return this.http
      .get<SoilType[]>(this.BASE_URL + `/soiltypes`)
      .pipe(catchError(this.handleError<SoilType[]>("getSoilTypes")));
  }

  public insertSoilType(newSoilType: VarietySoilType): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + `/varietysoiltypes/insert/`, newSoilType)
      .pipe(catchError(this.handleError<number>("insertSoilType")));
  }

  public updateSoilType(newSoilType: VarietySoilType) {
    return this.http
      .put<number>(this.BASE_URL + "/varietysoiltypes/update/", newSoilType)
      .pipe(catchError(this.handleError<number>("updateSoilType")));
  }

  public deleteSoilType(soiltypeid: string): Observable<number> {
    return this.http
      .post<number>(
        this.BASE_URL + "/varietysoiltypes/delete/" + soiltypeid,
        {}
      )
      .pipe(catchError(this.handleError<number>("deleteSoilType")));
  }

  public getVarietySoilType(varietyId: number): Observable<VarietySoilType[]> {
    return this.http
      .get<VarietySoilType[]>(
        this.BASE_URL + `/varietysoiltypesfromvariety/${varietyId}`
      )
      .pipe(
        catchError(this.handleError<VarietySoilType[]>("getVarietySoilTypes"))
      );
  }

  // ======== VARIETIES =========

  public getAllVarieties(): Observable<Variety[]> {
    return this.http
      .get<Variety[]>(this.BASE_URL + `/varieties`)
      .pipe(catchError(this.handleError<Variety[]>("getVarieties")));
  }

  public getVarietiesFromStrip(
    parcelId: number,
    stripNum: number
  ): Observable<Variety[]> {
    return this.http
      .get<Variety[]>(this.BASE_URL + `/varieties/${parcelId}/${stripNum}`)
      .pipe(catchError(this.handleError<Variety[]>("getVarietiesFromStrip")));
  }

  public insertVariety(newVariety: Variety) {
    return this.http
      .post<Variety>(this.BASE_URL + "/varieties/insert/", newVariety)
      .pipe(catchError(this.handleError<Variety>("insertVariety")));
  }

  public updateVariety(newVariety: Variety) {
    return this.http
      .put<number>(this.BASE_URL + "/varieties/update/", newVariety)
      .pipe(catchError(this.handleError<number>("updateVariety")));
  }

  public deleteVariety(varietyId: number): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/varieties/delete/" + varietyId, {})
      .pipe(catchError(this.handleError<number>("deleteVariety")));
  }

  // ======== SEEDS =========

  public getSeeds(varietyId: number): Observable<Seed[]> {
    return this.http
      .get<Seed[]>(this.BASE_URL + `/seedsfromvariety/${varietyId}`)
      .pipe(catchError(this.handleError<Seed[]>("getSeeds")));
  }

  public getSeedMakers(): Observable<SeedMaker[]> {
    return this.http
      .get<SeedMaker[]>(this.BASE_URL + `/seedmakers`)
      .pipe(catchError(this.handleError<SeedMaker[]>("getSeedMakers")));
  }

  public insertSeed(newSeed: Seed) {
    return this.http
      .post<number>(this.BASE_URL + "/seeds/insert/", newSeed)
      .pipe(catchError(this.handleError<number>("insertSeed")));
  }

  public updateSeed(newSeed: Seed) {
    return this.http
      .put<number>(this.BASE_URL + "/seeds/update/", newSeed)
      .pipe(catchError(this.handleError<number>("updateSeed")));
  }

  public deleteSeed(seedId: number): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/seeds/delete/" + seedId, {})
      .pipe(catchError(this.handleError<number>("deleteSeed")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
