import { Component, Inject } from '@angular/core';
import { Provider } from '../../../../../../models/api/provider';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProvidersService } from '../../../../../../services/Neuracore/providers.service';

@Component({
  selector: 'app-provider-delete',
  templateUrl: './provider-delete.component.html',
  styleUrls: ['../../../../../../../assets/styles/tables-global-styles.css']
})
export class ProviderDeleteComponent {

  public provider: Provider;

  constructor(public dialogRef: MatDialogRef<ProviderDeleteComponent>,
    private providersService: ProvidersService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      this.provider = data.provider;
    }
  }

  onDeleteClick(): void {
    this.providersService.delete(this.provider.id).subscribe(result => {
      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
