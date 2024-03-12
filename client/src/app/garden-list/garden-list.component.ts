import { Component, OnInit } from "@angular/core";
import { Garden } from "../../../../common/tables/Garden";
import { Parcel } from "../../../../common/tables/Parcel";
import { Strip } from "../../../../common/tables/Strip";
import { Variety } from "../../../../common/tables/Variety";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-garden-list",
  templateUrl: "./garden-list.component.html",
  styleUrls: ["./garden-list.component.css"],
})
export class GardenListComponent implements OnInit {
  gardens: Garden[];
  selectedGarden: Garden;
  parcels: Parcel[];
  selectedParcel: Parcel;
  strips: Strip[];
  selectedStrip: Strip;
  variety: Variety[];

  constructor(private readonly comm: CommunicationService) {
    this.gardens = [];
  }

  ngOnInit(): void {
    this.comm.getGardens().subscribe((gardens: Garden[]) => {
      this.gardens = gardens;
      this.selectedGarden = gardens[0];
    });
  }
}
