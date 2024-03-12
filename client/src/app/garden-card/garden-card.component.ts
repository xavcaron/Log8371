import { Component, Input, OnChanges } from "@angular/core";
import { Garden } from "../../../../common/tables/Garden";
import { Parcel } from "../../../../common/tables/Parcel";
import { Strip } from "../../../../common/tables/Strip";
import { Variety } from "../../../../common/tables/Variety";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-garden-card",
  templateUrl: "./garden-card.component.html",
  styleUrls: ["./garden-card.component.css"],
})
export class GardenCardComponent implements OnChanges {
  @Input() garden: Garden;

  parcels: Parcel[]; // key is gardenId
  strips: Map<number, Strip[]>; // key is parcelId
  varieties: Map<string, Variety[]>; // key is parcelId+stripNum as string

  constructor(private readonly comm: CommunicationService) {
    this.parcels = [];
    this.strips = new Map<number, Strip[]>();
    this.varieties = new Map<string, Variety[]>();
  }

  ngOnChanges(): void {
    if (this.garden) this.getParcels();
  }

  getParcels() {
    this.comm
      .getParcels(this.garden.gardenid)
      .subscribe((parcels: Parcel[]) => {
        this.parcels = parcels;
        parcels.forEach((parcel) => {
          this.getStrips(parcel.parcelid);
        });
      });
  }

  getStrips(parcelId: number) {
    this.comm.getStrips(parcelId).subscribe((strips: Strip[]) => {
      this.strips.set(parcelId, strips);
      strips.forEach((strip) => {
        this.getVarieties(strip.parcelid, strip.stripnumber);
      });
    });
  }
  getVarieties(parcelId: number, stripNum: number) {
    this.comm
      .getVarietiesFromStrip(parcelId, stripNum)
      .subscribe((varieties: Variety[]) => {
        this.varieties.set(`${parcelId}${stripNum}`, varieties);
      });
  }
}
