import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Variety } from "../../../../common/tables/Variety";
import { CommunicationService } from "../communication.service";
import { VarietyDialogComponent } from "../variety-dialog/variety-dialog.component";

@Component({
  selector: "app-variety-list",
  templateUrl: "./variety-list.component.html",
  styleUrls: ["./variety-list.component.css"],
})
export class VarietyListComponent implements OnInit {
  varieties: Variety[];
  constructor(
    private readonly comm: CommunicationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshVarietyList();
  }

  refreshVarietyList(): void {
    console.log("refreshCalled");
    this.comm.getAllVarieties().subscribe((varieties: Variety[]) => {
      this.varieties = varieties;
    });
  }

  openAddVarietyDialog(): void {
    this.dialog
      .open(VarietyDialogComponent)
      .componentInstance.refresh.subscribe(() => {
        this.refreshVarietyList();
      });
  }
}
