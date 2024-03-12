import { Component, OnInit } from "@angular/core";
import { Plant } from "../../../../common/tables/Plant";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-plant-list",
  templateUrl: "./plant-list.component.html",
  styleUrls: ["./plant-list.component.css"],
})
export class PlantListComponent implements OnInit {
  plantNameSearchQuery: string;
  plants: Plant[];

  constructor(private comm: CommunicationService) {
    this.plantNameSearchQuery = "";
  }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.comm
      .getPlantsLike(this.plantNameSearchQuery)
      .subscribe((plants: Plant[]) => {
        this.plants = plants;
      });
  }
}
