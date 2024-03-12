import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Variety } from "../../../../common/tables/Variety";
import { CommunicationService } from "../communication.service";
import { VarietyDialogComponent } from "../variety-dialog/variety-dialog.component";

@Component({
  selector: "app-variety-view-card",
  templateUrl: "./variety-view-card.component.html",
  styleUrls: ["./variety-view-card.component.css"],
})
export class VarietyViewCardComponent {
  @Input() variety: Variety;
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  constructor(
    public dialog: MatDialog,
    private readonly comm: CommunicationService
  ) {}

  deleteVariety(): void {
    this.comm.deleteVariety(this.variety.varietyid).subscribe(() => {
      this.refresh.emit();
    });
  }

  openEditionDialog(): void {
    this.dialog
      .open(VarietyDialogComponent, {
        data: this.variety,
      })
      .componentInstance.refresh.subscribe(() => {
        this.refresh.emit();
      });
  }
}
