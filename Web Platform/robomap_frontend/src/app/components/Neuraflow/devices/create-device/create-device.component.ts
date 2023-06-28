import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SessionService } from '../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '../../../../models/api/device';
import { DevicesService } from '../../../../services/Neuraflow/devices.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.css']
})
export class CreateDeviceComponent implements OnInit {
  name: any;
  ip: any;
  port: any;
  protocol: any;
  state: any;

  private device: Device = {
    id: null,
    name: null,
    ip: null,
    port: null,
    state: null,
    protocol: null,
    created_at: null,
    updated_at: null
  };

  constructor(public translate: TranslateService,
    private snackBar: MatSnackBar,
    public sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialog: MatDialog,
    private devicesService: DevicesService) { }

  ngOnInit() {
    console.log(this.dialogData);

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

  createDevice() {

    this.name = $("#name").val();
    this.ip = $("#ip").val();
    this.port = $("#port").val();
    this.protocol = $("#protocol").val();

    if (this.name != "") {
      this.device.name = this.name;
      this.device.ip = this.ip;
      this.device.protocol = this.protocol;
      this.device.state = "stopped";
      this.device.port = this.port;
      this.device.created_at = this.getDate();
      this.device.updated_at = this.getDate();

      this.devicesService.post(this.device).subscribe(data => {
        const mensaje = this.translate.instant('SETTINGS_DEVICE.new_device_added');

        this.snackBar.open(mensaje, 'X', {
          duration: 5000
        });

        this.dialog.closeAll();
      }, error => {
        const mensaje = this.translate.instant('SETTINGS_DEVICE.new_device_error');

        this.snackBar.open(mensaje, 'X', {
          duration: 5000
        });

        this.dialog.closeAll();
      });

    } else {
      this.dialog.closeAll();
    }


  }

  close() {
    this.dialog.closeAll();
  }


}
