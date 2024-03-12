import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { GardenListComponent } from "./garden-list/garden-list.component";
import { PlantListComponent } from "./plant-list/plant-list.component";
import { VarietyListComponent } from "./variety-list/variety-list.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "gardens", component: GardenListComponent },
  { path: "plants", component: PlantListComponent },
  { path: "varieties", component: VarietyListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
