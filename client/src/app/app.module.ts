import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { GardenCardComponent } from "./garden-card/garden-card.component";
import { GardenListComponent } from "./garden-list/garden-list.component";
import { PlantCardComponent } from "./plant-card/plant-card.component";
import { PlantListComponent } from "./plant-list/plant-list.component";
import { VarietyDialogComponent } from "./variety-dialog/variety-dialog.component";
import { VarietyListComponent } from "./variety-list/variety-list.component";
import { VarietyViewCardComponent } from "./variety-view-card/variety-view-card.component";

@NgModule({
  declarations: [
    AppComponent,
    GardenListComponent,
    GardenCardComponent,
    PlantListComponent,
    PlantCardComponent,
    VarietyListComponent,
    VarietyViewCardComponent,
    VarietyDialogComponent,
  ],
  imports: [
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatRadioModule,
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
