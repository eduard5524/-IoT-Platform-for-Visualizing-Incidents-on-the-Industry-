import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SessionService } from '../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { NewIncidentCommentComponent } from '../incidence-new-comment/incidence-new-comment.component';
import { CommentsService } from '../../../../services/comments.service';
import { HistoricalAlarmService } from '../../../../services/Neuraflow/historical-alarm-active.service';
import { UsersService } from '../../../../services/users.service';
import { Comment } from '../../../../models/api/comment';
import { HistoricalAlarmActive } from '../../../../models/api/historical-alarm-active';
import { AcknowComponent } from '../acknowledge/acknowledge.component';


@Component({
  selector: 'app-incidence-detail',
  templateUrl: './incidence-detail.component.html',
  styleUrls: ['./incidence-detail.component.css']
})
export class DetailIncidentsComponent implements OnInit {
   comments_arr: any = new Array();
   historicalAlarm_arr: any = new Array();
   count: any = 0;
   count_historical: any = 0;
   comments: any = new Array<Comment>();
   comment: Comment = {
    id: null,
    id_user: null,
    comment: null,
    id_alarm: null,
    created_at: null,
    updated_at: null,
    username: null
  };
   historicalAlarms: any = new Array<HistoricalAlarmActive>();
   historicalAlarm: HistoricalAlarmActive = {
    id: null,
    id_alarm: null,
    id_user_acknow: null,
    created_at: null,
    updated_at: null
  };
   idalarm: any;
   iduser: any;
   location: any;
   device: any;

  constructor(public translate: TranslateService,
    public sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialog: MatDialog,
    public commentsService: CommentsService,
    public historicalAlarmService: HistoricalAlarmService,
    public usersService: UsersService ) {
  }

  ngOnInit() {
    this.idalarm = this.dialogData.id;
    this.location = this.dialogData.location;
    this.device = this.dialogData.device;

    this.iduser = this.sessionService.getUserId();
    this.commentsBlock(this.idalarm);
    this.historicalBlock(this.idalarm);

  }

  historicalBlock(idalarm: number) {
    this.historicalAlarmService.get(idalarm).subscribe(data => {

      for (var i in data) {
        this.historicalAlarm_arr.push(data[i]);
      }

      this.historicalAlarm_arr.forEach(element => {
        this.historicalAlarm = new HistoricalAlarmActive();
        this.historicalAlarm.id_alarm = element.id_alarm;
        this.historicalAlarm.id_user_acknow = element.id_user_acknow;
        this.historicalAlarm.created_at = element.created_at;
        this.historicalAlarm.updated_at = element.updated_at;
        //console.log(this.historicalAlarm);
        this.historicalAlarms.push(this.historicalAlarm);
        this.count_historical = this.historicalAlarms.length;


      });

    });
  }

  commentsBlock(idalarm: number) {
    this.commentsService.get(idalarm).subscribe(data => {

      for (var i in data) {
        this.comments_arr.push(data[i]);
      }

      this.comments_arr.forEach(element => {
        this.usersService.getUserData(element.id_user).subscribe(data => {
          this.comment = new Comment();
          this.comment.id_user = element.id_user;
          this.comment.comment = element.comment;
          this.comment.id_alarm = element.id_alarm;
          this.comment.created_at = element.created_at;
          this.comment.updated_at = element.updated_at;
          this.comment.username = data.name + " " + data.surname;
          //console.log(this.comment);
          this.comments.push(this.comment);
          this.count = this.comments.length;
        });

      });

    });
  }

  showCommentDialog(): void {
    this.dialog.open(NewIncidentCommentComponent, {
      width: '900px',
      data: {
        idalarm: this.idalarm,
        iduser: this.iduser
      }
    });
  }

  showAcknowDialog(): void {
    this.dialog.open(AcknowComponent, {
      width: '600px',
      data: {
        idalarm: this.idalarm,
        iduser: this.iduser,
        location: this.location
      }
    });
  }

  close(){
    this.dialog.closeAll();
  }

}
