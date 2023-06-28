import { Component, Inject } from '@angular/core';
import { Category } from '../../../../../../models/api/category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CategoriesService } from '../../../../../../services/Neuracore/categories.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['../../../../../../../assets/styles/tables-global-styles.css']
})
export class CategoryDeleteComponent {

  public category: Category;

  constructor(public dialogRef: MatDialogRef<CategoryDeleteComponent>,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      this.category = data.category;
    }
  }

  onDeleteClick(): void {
    this.categoriesService.delete(this.category.id).subscribe(result => {
      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
