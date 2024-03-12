import { Component, Input, OnInit } from "@angular/core";
import { Plant } from "../../../../common/tables/Plant";

@Component({
  selector: "app-plant-card",
  templateUrl: "./plant-card.component.html",
  styleUrls: ["./plant-card.component.css"],
})
export class PlantCardComponent implements OnInit {
  @Input() plant: Plant;
  constructor() {}

  ngOnInit(): void {}
}
