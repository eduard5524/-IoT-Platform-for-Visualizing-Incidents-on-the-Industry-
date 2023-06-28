import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SessionService } from '../../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '../../../../../models/api/category';
import { CategoriesService } from '../../../../../services/Neuracore/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadService } from '../../../../../services/file-upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  category: Category = {
    id:null,
    name: null,
    description: null,
    image: null
  };

  name: any;
  description: any;
  image: any;

  formDataPhoto: FormData;
  imgUploaded: boolean = false;

  text: any;

  constructor(public translate: TranslateService,
    private snackBar: MatSnackBar,
    public sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    private fileUploadService: FileUploadService) { }

  ngOnInit() {

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

  onPhotoChange(event) {
    let elem = event.target;
    if (elem.files.length > 0) {
      this.formDataPhoto = new FormData();
      this.formDataPhoto.append('myfile', elem.files[0]);
      this.imgUploaded = true;

      if (parseInt(this.formDataPhoto.get('myfile')['size']) > 2000000) {
        console.log("El archivo que intentas subir pesa demasiado");
        this.formDataPhoto = null;
        this.imgUploaded = false;
      }
    }
  }

  createCategory() {

    if (this.imgUploaded) {

      this.fileUploadService.postFile(this.formDataPhoto).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });

      this.category.image = environment.image_path + this.formDataPhoto.get('myfile')['name'];

    }



    this.name = $("#name").val();
    this.description = $("#description").val();


    if (this.name != "") {
      this.category.name = this.name;
      this.category.description = this.description;



      this.categoriesService.post(this.category).subscribe(data => {
        const mensaje = this.translate.instant('MATERIAL_MNG.category_created');
        console.log(data);
        this.snackBar.open(mensaje, 'X', {
          duration: 5000
        });

        this.dialog.closeAll();
      }, error => {
        const mensaje = this.translate.instant('MATERIAL_MNG.category_created_error');
        console.log(error);
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
