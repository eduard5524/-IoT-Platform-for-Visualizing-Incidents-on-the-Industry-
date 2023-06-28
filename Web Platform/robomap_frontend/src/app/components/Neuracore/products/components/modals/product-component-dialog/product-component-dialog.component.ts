import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SessionService } from '../../../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../../../../../../models/api/product';
import { Provider } from '../../../../../../models/api/provider';
import { ProductService } from '../../../../../../services/Neuracore/product.service';
import { ProvidersService } from '../../../../../../services/Neuracore/providers.service';
import { ManufacturersService } from '../../../../../../services/Neuracore/manufacturers.service';
import { CategoriesService } from '../../../../../../services/Neuracore/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadService } from '../../../../../../services/file-upload.service';
import { CountryService } from 'src/app/services/country.service';
import { Country } from '../../../../../../models/api/country';
import { Category } from '../../../../../../models/api/category';
import { Manufacturer } from '../../../../../../models/api/manufacturer';
import { environment } from 'src/environments/environment';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { RolesService } from '../../../../../../services/roles.service';
import { Role } from '../../../../../../models/api/role';
import { BaseModulesComponent } from '../../../../../base-modules.component';

@Component({
  selector: 'app-product-component-dialog',
  templateUrl: './product-component-dialog.component.html',
  styleUrls: ['../../../../../../../assets/styles/tables-global-styles.css']
})
export class ProductComponentDialogComponent  extends BaseModulesComponent implements OnInit {
  id_product: any;
  proveedores: any = new Array<Provider>();
  id_provider: any;
  iva: number;
  iva_porcentaje: number;
  preciosiniva: number;
  providersplit: any;
  manufacturer: any;
  manufacturer_id: any;
  provider_list: any[] = new Array();
  provider_list_text: any[] = new Array();

  provider: Provider = {
    id: null,
    address: null,
    country: null,
    email: null,
    name: null,
    phone: null,
    vat: null,
    price_this_prod: null,
    iva_this_prod: null
  };

  product: Product = {
    id: null,
    title: null,
    description: null,
    imageLink: null,
    madeIn: null,
    quantity: null,
    category: null,
    codigo_articulo: null,
    warehouse: null,
    provider: null,
    manufacturer: null,
    tech_sheet: null,
    prices: null
  };

  title: any;
  category: any;
  codigo_articulo: any;
  descripcion: any;
  imageLink: any;
  madeIn: any;
  quantity: any;
  tech_sheet: any;
  warehouse: any;

  formDataFile: FormData;
  formDataPhoto: FormData;
  imgUploaded: boolean = false;
  fileUploaded: boolean = false;

  text: any;

  manufacturers: Manufacturer[];
  providers: Provider[];
  categories: Category[];
  countries: Country[];

  public edit: boolean;
  public create: boolean;
  public userRole: string;
  public roles: Role[];
  private mobileLayout: boolean;


  constructor(public dialogRef: MatDialogRef<ProductComponentDialogComponent>,
    public translate: TranslateService,
    private snackBar: MatSnackBar,
    public sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private productService: ProductService,
    private manufacturersService: ManufacturersService,
    private providersService: ProvidersService,
    private categoriesService: CategoriesService,
    private fileUploadService: FileUploadService,
    private countriesService: CountryService,
    public rolesService: RolesService,
    private breakPointObserver: BreakpointObserver) {
      super(rolesService, sessionService);

      breakPointObserver
        .observe(['(max-width: 1023px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.mobileLayout = true;
          } else {
            this.mobileLayout = false;
          }
        });

      if (data != null) {
        this.product = data.product;
        this.edit = data.edit;
        this.create = false;
      } else {
        this.product = new Product();
        this.edit = true;
        this.create = true;
      }
    }

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

    this.id_product = this.data.product.id;

    this.productService.get(this.id_product).subscribe(data => {
      this.product = data[0];
      console.log(this.product);
      this.product.provider = data[0]['provider'];
      this.manufacturer_id = data[0]['manufacturer'];

      this.manufacturersService.get(this.manufacturer_id).subscribe(data => {
        //console.log(data[0]);
        this.manufacturer = data[0]
      });

      this.providersplit = this.product.provider.split(",");

      for (let elemento of this.providersplit) {

        this.preciosiniva = elemento.split("-")[0];
        this.iva = this.preciosiniva * elemento.split("-")[1] / 100;
        this.id_provider = elemento.split("-")[2];
        this.iva_porcentaje = elemento.split("-")[1];

        let precio: number = +this.preciosiniva;
        let iva: number = +this.iva_porcentaje;
        this.providersService.get(this.id_provider).subscribe((data) => {
          data[0]['price_this_prod'] = precio;
          data[0]['iva_this_prod'] = iva;
          this.proveedores.push(data[0]);

        });

      }

      console.log(this.product);
      console.log(this.proveedores);

    });

    //remove provider
    $("#providers_list").on("click", ".delete", function () {
      $(this).closest(".providers_edit").remove();

    });
  }



  requestData() {
    this.rolesService.list().subscribe(data => {
      this.roles = data;
    });
  }

  onCreateClick(): void {
    console.log(this.product);
    if (this.create) {
      this.productService.post(this.product).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.productService.put(this.product).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  onClickEdit() {
    this.edit = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  mobileClass(element: string): string {
    switch (element) {
      case 'field':
        if (this.mobileLayout) {
          return 'full';
        }
        return 'medium';
      case 'button':
        if (this.mobileLayout) {
          return 'button-mobile';
        }
        return '';
      default:
        break;
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

  addProvider() {
    var append = $(".providers_edit").clone()[0];
    $("#providers_list").append(append);

  }

  editProduct() {

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
      let provider = "";
      $(".providers_edit").each(function () {
        var prov = $(this).find(".provider_select").val();
        var precio = $(this).find(".provider_precio").val();
        var iva = $(this).find(".provider_iva").val();

        provider += precio + "-" + iva + "-" + prov + ",";

      });

      var lastChar = provider.slice(-1);
      if (lastChar == ',') {
        provider = provider.slice(0, -1);
      }

      this.product.title = this.title;
      this.product.category = this.category;
      this.product.manufacturer = this.manufacturer;
      this.product.codigo_articulo = this.codigo_articulo;
      this.product.description = this.descripcion;
      this.product.quantity = 100;
      this.product.warehouse = this.warehouse;
      this.product.madeIn = this.madeIn;
      this.product.provider = provider;
      console.log(this.product);


      this.productService.put(this.product).subscribe(data => {
        const mensaje = this.translate.instant('MATERIAL_MNG.product_updated');
        console.log(data);
        this.snackBar.open(mensaje, 'X', {
          duration: 5000
        });

        this.dialog.closeAll();
      }, error => {
        const mensaje = this.translate.instant('MATERIAL_MNG.product_updated_error');
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

