import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Plant } from "../../../../common/tables/Plant";
import { Seed } from "../../../../common/tables/Seed";
import { SeedMaker } from "../../../../common/tables/SeedMaker";
import { SoilType } from "../../../../common/tables/SoilType";
import { Variety } from "../../../../common/tables/Variety";
import { VarietySoilType } from "../../../../common/tables/VarietySoilType";
import { CommunicationService } from "../communication.service";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
@Component({
  selector: "app-variety-dialog",
  templateUrl: "./variety-dialog.component.html",
  styleUrls: ["./variety-dialog.component.css"],
})
export class VarietyDialogComponent implements OnInit {
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  months = MONTHS;
  variety: Variety;
  seedMakers: SeedMaker[];
  selectedSeeds: Seed[];
  existingSeeds: Seed[];
  selectedPlants: Plant[];
  existingPlants: Plant[];
  soilTypes: SoilType[];
  varietySoilTypes: VarietySoilType[];
  existingVarietySoilTypes: VarietySoilType[];
  isEditing: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public existingVariety: Variety | undefined,
    private readonly comm: CommunicationService,
    private dialog: MatDialogRef<VarietyDialogComponent>
  ) {
    this.dialog.disableClose = true;
    this.selectedSeeds = [];
    this.selectedPlants = [];
    this.varietySoilTypes = [];
    this.existingVarietySoilTypes = [];
    this.existingPlants = [];
    this.existingSeeds = [];
  }

  ngOnInit(): void {
    if (this.existingVariety) {
      this.isEditing = true;
      this.variety = this.existingVariety;
      this.getExistingVarietyData();
    } else {
      this.isEditing = false;
      this.variety = {
        varietyid: -1,
        varietyname: "",
        marketdate: "",
        sowingdescription: "",
        plantingdescription: "",
        caredescription: "",
        gatheringdescription: "",
        plantingperiodstart: "",
        plantingperiodend: "",
        gatheringperiodstart: "",
        gatheringperiodend: "",
        generalcomment: "",
      };
    }

    this.comm.getSeedMakers().subscribe((seedMakers: SeedMaker[]) => {
      this.seedMakers = seedMakers;
    });
    this.comm.getSoilTypes().subscribe((soilTypes: SoilType[]) => {
      this.soilTypes = soilTypes;
    });
  }

  getExistingVarietyData() {
    this.comm
      .getVarietySoilType(this.variety.varietyid)
      .subscribe((varietySoilTypes: VarietySoilType[]) => {
        this.existingVarietySoilTypes = varietySoilTypes;
      });
    this.comm.getSeeds(this.variety.varietyid).subscribe((seeds: Seed[]) => {
      this.existingSeeds = seeds;
    });
    this.comm.getPlants(this.variety.varietyid).subscribe((plants: Plant[]) => {
      this.existingPlants = plants;
    });
  }

  pushNewVariety() {
    this.comm
      .insertVariety(this.variety)
      .subscribe((varietyInserted: Variety) => {
        this.addOtherData(varietyInserted);
        this.refresh.emit();
      });
    this.closeDialog();
  }

  addOtherData(varietyInserted: Variety) {
    this.varietySoilTypes.forEach((varietySoilType) => {
      varietySoilType.varietyid = varietyInserted.varietyid;
      this.comm.insertSoilType(varietySoilType).subscribe();
    });
    this.selectedSeeds.forEach((seed) => {
      seed.varietyid = varietyInserted.varietyid;
      this.comm.insertSeed(seed).subscribe();
    });
    this.selectedPlants.forEach((plant) => {
      plant.varietyid = varietyInserted.varietyid;
      this.comm.insertPlant(plant).subscribe();
    });
  }

  editPreviousData() {
    this.existingVarietySoilTypes.forEach((varietySoilType) => {
      varietySoilType.varietyid = this.variety.varietyid;
      this.comm.updateSoilType(varietySoilType).subscribe();
    });
    this.existingSeeds.forEach((seed) => {
      seed.varietyid = this.variety.varietyid;
      this.comm.updateSeed(seed).subscribe();
    });
    this.existingPlants.forEach((plant) => {
      plant.varietyid = this.variety.varietyid;
      this.comm.updatePlant(plant).subscribe();
    });
  }

  editVariety() {
    this.comm.updateVariety(this.variety).subscribe(() => {
      this.refresh.emit();
    });
    this.addOtherData(this.variety);
    this.editPreviousData();
    this.closeDialog();
  }

  addSeedMaker() {
    this.selectedSeeds.push({
      seedid: -1,
      varietyid: -1,
      seedmakerid: -1,
      isorganic: false,
    });
  }

  deleteSeed(seed: Seed) {
    const indexExisting = this.existingSeeds.findIndex((existingSeed) => {
      return existingSeed.seedid === seed.seedid;
    });
    if (indexExisting > -1) {
      this.comm.deleteSeed(seed.seedid).subscribe();
      this.existingSeeds.splice(indexExisting, 1);
      return;
    }
    const indexSelected = this.selectedSeeds.findIndex((existingSeed) => {
      return existingSeed.seedid === seed.seedid;
    });
    this.selectedSeeds.splice(indexSelected, 1);
  }

  addPlant() {
    this.selectedPlants.push({
      binomialname: "",
      commonname: "",
      plantcategory: "",
      planttype: "",
      plantsubtype: "",
      varietyid: -1,
    });
  }

  deletePlant(plant: Plant) {
    const indexExisting = this.existingPlants.findIndex((existingPlant) => {
      return existingPlant.binomialname === plant.binomialname;
    });
    if (indexExisting > -1) {
      this.comm.deletePlant(plant.binomialname).subscribe();
      this.existingSeeds.splice(indexExisting, 1);
      return;
    }
    const indexSelected = this.selectedPlants.findIndex((existingPlant) => {
      return existingPlant.binomialname === plant.binomialname;
    });
    this.selectedPlants.splice(indexSelected, 1);
  }

  addVarietySoilType() {
    this.varietySoilTypes.push({
      varietysoiltypeid: -1,
      soiltypeid: -1,
      varietyid: -1,
      adaptationdescription: "",
    });
  }

  deleteSoilType(soiltype: VarietySoilType) {
    const indexExisting = this.existingVarietySoilTypes.findIndex(
      (existingType) => {
        return existingType.varietysoiltypeid === soiltype.varietysoiltypeid;
      }
    );
    if (indexExisting > -1) {
      this.comm
        .deleteSoilType(soiltype.varietysoiltypeid.toString())
        .subscribe();
      this.existingSeeds.splice(indexExisting, 1);
      return;
    }
    const indexSelected = this.varietySoilTypes.findIndex((existingType) => {
      return existingType.varietysoiltypeid === soiltype.varietysoiltypeid;
    });
    this.varietySoilTypes.splice(indexSelected, 1);
  }

  closeDialog() {
    this.dialog.close();
  }
}
