# Dialog
```
import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

/**
 * @title Dialog Animations
 */
@Component({
  selector: 'dialog-animations-example',
  styleUrls: ['dialog-animations-example.css'],
  templateUrl: 'dialog-animations-example.html',
})
export class DialogAnimationsExample {
  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}
```

## Data Injection
```
import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

/**
 * @title Injecting data when opening a dialog
 */
```
```
@Component({
  selector: 'dialog-data-example',
  templateUrl: 'dialog-data-example.html',
})
export class DialogDataExample {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }
}
```
```
import {Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
    public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    ) {}

   close(): void {
      this.dialogRef.close([Data to Opener]);
    }
}
```