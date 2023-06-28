import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../../../../../services/users.service';
import { AlarmsService } from '../../../../../services/Neuraflow/incidences.service';
import { SessionService } from '../../../../../services/session.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DetailIncidentsComponent } from '../../incidence-detail/incidence-detail.component';
import { Alarm } from '../../../../../models/api/alarm';

@Component({
    selector: 'app-acknowledge-confirmation',
    templateUrl: './acknowledge-confirmation.component.html',
    styleUrls: ['./acknowledge-confirmation.component.css']
})

export class ConfirmationAcknowComponent implements OnInit {
    private alarms: Alarm[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        public translate: TranslateService,
        private snackBar: MatSnackBar,
        public sessionService: SessionService,
        private dialog: MatDialog,
        public alarmsService: AlarmsService,
        private usersService: UsersService
    ) { }

    ngOnInit() {
    }

    acceptDeactivate() {
        //Call to service.
        const mensaje = this.translate.instant('ACKNOW.all_alarm_deactivate_process');

        this.snackBar.open(mensaje, 'X', {
            duration: 5000
        });
        this.reloadIncidents();
        this.dialog.closeAll();
    }

    declineDeactivate() {
        this.dialog.closeAll();
    }


    reloadIncidents(): void {
        this.getAllAlarms(this.dialog);

        var today = new Date();
        var ampm = (today.getUTCHours() >= 12) ? " PM" : " AM";
        var fecha = ("0" + today.getDate()).slice(-2) + "/" + ("0" + (today.getMonth() + 1)).slice(-2) + "/" + today.getFullYear() + " " + ("0" + (today.getUTCHours() + 1)).slice(-2) + ":" + today.getMinutes() + ":" + today.getSeconds() + ampm;
        $("#date-update-incidents").html(fecha);
    }

    getAllAlarms(dialog: MatDialog): void {
        this.alarmsService.list().subscribe(data => {
            this.alarms = data;

            $('#datatable').DataTable({
                destroy: true,
                data: this.alarms,
                columns: [
                    { data: "id_alarm", className: "text-center" },
                    { data: "state", className: "state" },
                    { data: "severity", className: "severity" },
                    { data: "description" },
                    { data: "location" },
                    { data: "device" },
                    { data: "created_at" },
                    { data: "updated_at" },
                    { data: "detail", defaultContent: "<img style='width:20px;cursor:pointer' src='assets/img/eye.png'>", className: "text-center" }
                ],
                initComplete: function () {
                    this.api().columns().every(function () {
                        var column = this;
                        var select = $('<select class="custom-select custom-select-sm form-control form-control-sm"><option value=""></option></select>')
                            .appendTo($(column.footer()).empty())
                            .on('change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    (<HTMLInputElement>this).value
                                );

                                column.search(val ? '^' + val + '$' : '', true, false).draw();
                            });

                        column.data().unique().sort().each(function (d, j) {
                            var val = $.fn.dataTable.util.escapeRegex(String(d));
                            if (column.search() === "^" + val + "$") {
                                select.append(
                                    '<option value="' + String(d) + '" selected="selected">' + String(d) + "</option>"
                                );
                            } else {
                                select.append('<option value="' + String(d) + '">' + String(d) + "</option>");
                            }
                        });
                    });
                    //columna severity
                    this.api().columns([2]).every(function () {
                        var column = this;
                        console.log(column.data());
                        var select = $('<select class="custom-select custom-select-sm form-control form-control-sm"><option value=""></option></select>')
                            .appendTo($(column.footer()).empty())
                            .on('change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    (<HTMLInputElement>this).value
                                );

                                column.search(val ? '^' + val + '$' : '', true, false).draw();
                            });

                        column.data().unique().sort().each(function (d, j) {
                            var val = $.fn.dataTable.util.escapeRegex(String(d));
                            var severityStr = "";
                            if (val == '1') {
                                severityStr = "Warning";
                            } else if (val == '2') {
                                severityStr = "Error";
                            } else if (val == '3') {
                                severityStr = "Fatal";
                            }
                            if (column.search() === "^" + val + "$") {
                                select.append(
                                    '<option value="' + String(d) + '" selected="selected">' + severityStr + "</option>"
                                );
                            } else {
                                select.append('<option value="' + String(d) + '">' + severityStr + "</option>");
                            }
                        });
                    });
                    //columna state
                    this.api().columns([1]).every(function () {
                        var column = this;
                        var val = $.fn.dataTable.util.escapeRegex("1");

                        column.search(val ? '^' + val + '$' : '', true, false).draw();

                        var select = $('<select class="custom-select custom-select-sm form-control form-control-sm"><option value=""></option></select>')
                            .appendTo($(column.footer()).empty())
                            .on('change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    (<HTMLInputElement>this).value
                                );

                                column.search(val ? '^' + val + '$' : '', true, false).draw();
                            });

                        column.data().unique().sort().each(function (d, j) {
                            var val = $.fn.dataTable.util.escapeRegex("1");
                            var valOrig = $.fn.dataTable.util.escapeRegex(String(d));
                            var stateStr = "";
                            if (valOrig == '0') {
                                stateStr = "Desactivate";
                            } else if (valOrig == '1') {
                                stateStr = "Activate";
                            }
                            if (column.search() === "^" + val + "$") {
                                select.append(
                                    '<option value="' + d + '" selected="selected">' + stateStr + "</option>"
                                );
                            } else {
                                select.append('<option value="' + d + '">' + stateStr + "</option>");
                            }
                        });
                    });
                },
                createdRow: function (row, data, dataIndex) {
                    // console.log(data);
                    if (data['severity'] == 1) {
                        $(row).find(".severity").text("Warning").css({ "color": "#f8c261", "font-weight": "bold" });
                    }
                    else if (data['severity'] == 2) {
                        $(row).find(".severity").text("Error").css({ "color": "#e43c40", "font-weight": "bold" });
                    }
                    else if (data['severity'] == 3) {
                        $(row).find(".severity").text("Fatal").css({ "color": "#a00002", "font-weight": "bold" });
                    }

                    if (data['state'] == 0) {
                        $(row).find(".state").text("Desactivate");

                    } else if (data['state'] == 1) {
                        $(row).find(".state").text("Active");

                    }

                    $(row).attr('location', data['location']);
                    $(row).attr('device', data['device']);
                    $(row).attr('id', data['id_alarm']);
                    $(row).click(function () {

                        const dialogRef = dialog.open(DetailIncidentsComponent, {
                            width: '1000px',
                            data: {
                                id: $(this).attr('id').valueOf(),
                                location: $(this).attr('location').valueOf(),
                                device: $(this).attr('device').valueOf(),
                            }
                        });

                        dialogRef.afterClosed().subscribe(
                            //data => console.log("Dialog output:", data)
                        );

                    });

                },

            });
        });
    }

}
