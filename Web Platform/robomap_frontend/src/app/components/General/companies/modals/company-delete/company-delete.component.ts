import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Company} from '../../../../../models/api/company';
import {CompaniesService} from '../../../../../services/General/companies.service';

@Component({
  selector: 'app-company-delete',
  templateUrl: './company-delete.component.html',
  styleUrls: ['../../../../../../assets/styles/tables-global-styles.css']
})
export class CompanyDeleteComponent {

    public company: Company;

    constructor(public dialogRef: MatDialogRef<CompanyDeleteComponent>,
                private companiesService: CompaniesService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data != null) {
            this.company = data.company;
        }
    }

    onDeleteClick(): void {
        this.companiesService.delete(this.company.id).subscribe(result => {
            this.dialogRef.close();
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
