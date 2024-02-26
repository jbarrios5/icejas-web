import { DialogRef } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-delete-dialog-component',
    templateUrl: './delete-dialog.component.html'
  })
export class DeleteDialogComponet{
    constructor(public dialogRef:MatDialogRef<boolean>,@Inject(MAT_DIALOG_DATA) public nro:number ){
    }

    onNoClick(): void {
        
        this.dialogRef.close(false);
    }
    onClick(): void {
        
        this.dialogRef.close(true);
    }

}