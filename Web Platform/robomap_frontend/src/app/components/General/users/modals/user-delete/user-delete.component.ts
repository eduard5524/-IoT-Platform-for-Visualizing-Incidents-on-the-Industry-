import {Component, Inject} from '@angular/core';
import {User} from '../../../../../models/api/user';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UsersService} from '../../../../../services/users.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent {

    public user: User;

    constructor(public dialogRef: MatDialogRef<UserDeleteComponent>,
                private userService: UsersService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data != null) {
            this.user = data.user;
        }
    }

    onDeleteClick(): void {
        this.userService.delete(this.user.id).subscribe(result => {
            this.dialogRef.close();
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
