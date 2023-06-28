import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Comment } from '../../../../models/api/comment';
import { HistoricalAlarmActive } from '../../../../models/api/historical-alarm-active';
import { HistoricalAlarmService } from '../../../../services/Neuraflow/historical-alarm-active.service';
import { SessionService } from '../../../../services/session.service';
import { CommentsService } from '../../../../services/comments.service';
import { UsersService } from '../../../../services/users.service';


@Component({
    selector: 'app-incidence-new-comment-comment',
    templateUrl: './incidence-new-comment.component.html',
    styleUrls: ['./incidence-new-comment.component.css']
})
export class NewIncidentCommentComponent implements OnInit {
    private idalarm: any;
    private iduser: any;
    private commentText: any;
    private comment: Comment = {
        id: null,
        id_user: null,
        comment: null,
        id_alarm: null,
        created_at: null,
        updated_at: null,
        username: null
    };

    constructor(
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        public translate: TranslateService,
        private snackBar: MatSnackBar,
        private commentsService: CommentsService,
        public sessionService: SessionService,
        private historicalAlarmService: HistoricalAlarmService,
        private dialog: MatDialog,
        private usersService: UsersService) { }

    ngOnInit() {
        this.idalarm = this.idalarm = this.dialogData.idalarm;
        this.iduser = this.sessionService.getUserId();

    }

    getDate() {
        var now = new Date();
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    }

    addComment() {
        this.commentText = $("#text-comment").val();

        if (this.commentText != "") {
            this.comment.id_alarm = this.idalarm;
            this.comment.id_user = this.iduser;
            this.comment.comment = this.commentText;
            this.comment.created_at = this.getDate();
            this.comment.updated_at = this.getDate();
            this.commentsService.post(this.comment).subscribe(data => {
                const mensaje = this.translate.instant('NEW_COMMENT_MFC.new_comment_added');

                this.snackBar.open(mensaje, 'X', {
                    duration: 5000
                });

                this.dialog.closeAll();
            }, error => {
                const mensaje = this.translate.instant('NEW_COMMENT_MFC.new_comment_error');

                this.snackBar.open(mensaje, 'X', {
                    duration: 5000
                });

                this.dialog.closeAll();
            });

        } else {
            this.dialog.closeAll();
        }

    }



}
