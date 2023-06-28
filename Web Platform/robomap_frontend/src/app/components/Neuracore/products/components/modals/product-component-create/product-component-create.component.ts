import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SessionService } from '../../../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../../../../../../models/api/product';
import { Category } from '../../../../../../models/api/category';
import { Manufacturer } from '../../../../../../models/api/manufacturer';
import { Provider } from '../../../../../../models/api/provider';
import { Country } from '../../../../../../models/api/country';
import { ProductService } from '../../../../../../services/Neuracore/product.service';
import { ProvidersService } from '../../../../../../services/Neuracore/providers.service';
import { ManufacturersService } from '../../../../../../services/Neuracore/manufacturers.service';
import { CategoriesService } from '../../../../../../services/Neuracore/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadService } from '../../../../../../services/file-upload.service';
import { CountryService } from 'src/app/services/country.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-component-create',
  templateUrl: './product-component-create.component.html',
  styleUrls: ['../../../../../../../assets/styles/tables-global-styles.css']
})
export class ProductComponentCreateComponent implements OnInit {

  public manufacturers: Manufacturer[];
  public providers: Provider[];
  public categories: Category[];
  public countries: Country[];
  private mobileLayout: boolean;
  provider_list: any[] = new Array();
  provider_list_text: any[] = new Array();
  product: Product = {
    id: null,
    category: null,
    codigo_articulo: null,
    description: null,
    imageLink: null,
    madeIn: null,
    manufacturer: null,
    provider: null,
    quantity: null,
    tech_sheet: null,
    title: null,
    warehouse: null,
    prices: null
  };

  title: any;
  category: any;
  codigo_articulo: any;
  descripcion: any;
  imageLink: any;
  madeIn: any;
  manufacturer: any;
  provider: any;
  quantity: any;
  tech_sheet: any;
  warehouse: any;

  formDataFile: FormData;
  formDataPhoto: FormData;
  imgUploaded: boolean = false;
  fileUploaded: boolean = false;

  text: any;

  public pageEvent: any;
  public edit: any;
  public create: any;

  constructor(public translate: TranslateService,
    private snackBar: MatSnackBar,
    public sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialog: MatDialog,
    private productService: ProductService,
    private manufacturersService: ManufacturersService,
    private providersService: ProvidersService,
    private categoriesService: CategoriesService,
    private fileUploadService: FileUploadService,
    private countriesService: CountryService) { }

  ngOnInit() {
    this.manufacturersService.list().subscribe(data => {
      this.manufacturers = data;
    });

    this.categoriesService.list().subscribe(data => {
      this.categories = data;
    });

    this.providersService.list().subscribe(data => {
      this.providers = data;
    });

    this.countriesService.list().subscribe(data => {
      this.countries = data;
    });

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

  addProvider() {
    this.text = "";
    let provider_text = $("#provider option:selected").text();
    let provider = $("#provider").val();
    let precio = parseFloat($("#price").val().toString().replace(",","."));
    let iva = parseInt($("#iva").val().toString().replace(",","."));
    let proveedor = precio + "-" + iva + "-" + provider;
console.log(proveedor);
    this.provider_list.push(proveedor);

    let iva_precio = precio * iva / 100;
    let precio_mas_iva = +precio + +iva_precio;

    this.provider_list_text[provider_text] = precio_mas_iva;

    for (var comp in this.provider_list_text) {

      this.text += comp + " ➨ " + this.provider_list_text[comp] + "€\n";

    }

  }

  onFileChange(event) {
    let elem = event.target;
    if (elem.files.length > 0) {
      this.formDataFile = new FormData();
      this.formDataFile.append('myfile', elem.files[0]);
      this.fileUploaded = true;
      console.log(elem.files[0]);
      if (parseInt(this.formDataFile.get('myfile')['size']) > 2000000) {
        console.log("El archivo que intentas subir pesa demasiado");
        this.formDataFile = null;
        this.fileUploaded = false;
      }
    }
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

  createProduct() {

    if (this.imgUploaded) {

      this.fileUploadService.postFile(this.formDataPhoto).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });

      this.product.imageLink = environment.image_path + this.formDataPhoto.get('myfile')['name'];

    }

    if (this.fileUploaded) {
      this.fileUploadService.postFile(this.formDataFile).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });

      this.product.tech_sheet = environment.image_path + this.formDataFile.get('myfile')['name'];

    }


    this.title = $("#title").val();
    this.category = $("#category").val();
    this.manufacturer = $("#manufacturer").val();
    this.codigo_articulo = $("#code").val();
    this.madeIn = $("#madeIn").val();
    this.descripcion = $("#description").val();


    if (this.title != "") {
      this.product.title = this.title;
      this.product.category = this.category;
      this.product.manufacturer = this.manufacturer;
      this.product.codigo_articulo = this.codigo_articulo;
      this.product.description = this.descripcion;
      this.product.quantity = 100;
      this.product.warehouse = this.warehouse;
      this.product.madeIn = this.madeIn;
      this.product.provider = this.provider_list.join(",");



            this.productService.post(this.product).subscribe(data => {
              const mensaje = this.translate.instant('MATERIAL_MNG.product_created');
      console.log(data);
              this.snackBar.open(mensaje, 'X', {
                duration: 5000
              });

              this.dialog.closeAll();
            }, error => {
              const mensaje = this.translate.instant('MATERIAL_MNG.product_created_error');
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

  onNoClick() {

    this.dialog.closeAll();
  }

  mobileClass(element: string): string {
    switch (element) {
      case 'paginator':
        if (this.mobileLayout) {
          return 'paginator-mobile';
        }
        return '';
      default:
        break;
    }
  }


}

