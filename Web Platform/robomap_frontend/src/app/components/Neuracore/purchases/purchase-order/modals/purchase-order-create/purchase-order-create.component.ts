import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SessionService } from '../../../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { PurchaseOrder } from '../../../../../../models/api/purchase-order';
import { Country } from '../../../../../../models/api/country';
import { Provider } from '../../../../../../models/api/provider';
import { PurchaseDetail } from '../../../../../../models/api/purchase-detail';
import { Product } from '../../../../../../models/api/product';
import { Category } from '../../../../../../models/api/category';
import { ProductService } from '../../../../../../services/Neuracore/product.service';
import { PurchaseOrderService } from '../../../../../../services/Neuracore/purchase-order.service';
import { PurchaseDetailService } from '../../../../../../services/Neuracore/purchase-detail.service';
import { ProvidersService } from '../../../../../../services/Neuracore/providers.service';
import { CategoriesService } from '../../../../../../services/Neuracore/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountryService } from 'src/app/services/country.service';
import { environment } from 'src/environments/environment';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { RolesService } from '../../../../../../services/roles.service';
import { Role } from '../../../../../../models/api/role';
import { BaseModulesComponent } from '../../../../../base-modules.component';

@Component({
  selector: 'app-purchase-order-create',
  templateUrl: './purchase-order-create.component.html',
  styleUrls: ['../../../../../../../assets/styles/tables-global-styles.css']
})
export class PurchaseOrderCreateComponent extends BaseModulesComponent implements OnInit {

  public countries: Country[];
  providers: Provider[] = new Array();
  products: Product[] = new Array();
  category_list: Category[] = new Array();
  product_list: Product[] = new Array();
  provider: Provider = {
    id: null,
    name: null,
    vat: null,
    address: null,
    country: null,
    phone: null,
    email: null
  };

  purchase: PurchaseOrder = {
    id: null,
    project_num: null,
    ref_number: null,
    date: null,
    document: null,
    company_shipto: null,
    address_shipto: null,
    country_shipto: null,
    phone_shipto: null,
    email_shipto: null,
    vat_shipto: null,
    provider: null,
    company_billto: null,
    address_billto: null,
    country_billto: null,
    phone_billto: null,
    email_billto: null,
    vat_billto: null,
    items: null,
    total_price: null,
    state: null,
    order_num: null
  };

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

  purchaseDetail: PurchaseDetail = {
    id: null,
    component: null,
    ref_component: null,
    order_num: null,
    project_num: null,
    provider: null,
    quantity: null,
    ref_num: null,
    state: null,
    note: null
  }


  project_number: any;
  ref_number: any;
  date: any;
  document: any;
  company_shipto: any;
  address_shipto: any;
  country_shipto: any;
  phone_shipto: any;
  email_shipto: any;
  vat_shipto: any;
  company_billto: any;
  address_billto: any;
  country_billto: any;
  phone_billto: any;
  email_billto: any;
  vat_billto: any;
  items: any;
  conditions: any;
  total_price: any;
  state: any;
  id_provider: any;

  public edit: boolean;
  public create: boolean;
  public userRole: string;
  public roles: Role[];
  private mobileLayout: boolean;

  constructor(public dialogRef: MatDialogRef<PurchaseOrderCreateComponent>,
    public translate: TranslateService,
    private snackBar: MatSnackBar,
    public rolesService: RolesService,
    public sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private purchaseOrderService: PurchaseOrderService,
    private purchaseDetailService: PurchaseDetailService,
    private countriesService: CountryService,
    private providersService: ProvidersService,
    private productService: ProductService,
    private categoriesService: CategoriesService,
  ) {
    super(rolesService, sessionService);

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

    $("#addrow").on("click", function () {
      var newRow = $("<tr>");
      var cols = "";

      cols += $("#row_items").html();

      cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="✗"></td>';
      newRow.append(cols);
      $("table.order-list").append(newRow);

    });

    $("#row_items_body").on('change', '.product_list', function () {
      var valores = $(this).val().toString();
      var valores_arr = valores.split("|--|");
      var precio = +valores_arr[1];
      var codigo_art = valores_arr[0];
      var tr = $(this).closest("tr");
      tr.find(".reference").val(codigo_art);
      tr.find(".unit_price").val(precio.toFixed(4));
      var quantity = +tr.find(".quantity").val();
      var amount = +quantity * + precio;
      tr.find(".amount").val(amount.toFixed(4));

      var totalamount = 0;
      var totaliva = 0;
      var totalamountiva = 0;
      $(".amount").each(function () {
        totalamount += +$(this).val();


      });
      totaliva += +totalamount * 21 / 100;
      totalamountiva += +totalamount + +totaliva;
      $("#totaliva").val(totaliva.toFixed(4));
      $("#totalamount").val(totalamount.toFixed(4));
      $("#totalamountiva").val(totalamountiva.toFixed(4));
    });


    $("#row_items_body").on('change', '.quantity', function () {
      var quantity = +$(this).val();

      if (quantity < 0) {
        quantity = 0;
        $(this).val(quantity);
      }

      var tr = $(this).closest("tr");
      var valores = tr.find(".product_list").val().toString();
      var valores_arr = valores.split("|--|");
      var precio = +valores_arr[1];
      var amount = +quantity * + precio;
      tr.find(".amount").val(amount.toFixed(4));

      var totalamount = 0;
      var totaliva = 0;
      var totalamountiva = 0;
      $(".amount").each(function () {
        totalamount += +$(this).val();

      });

      totaliva += +totalamount * 21 / 100;
      totalamountiva += +totalamount + +totaliva;

      $("#totaliva").val(totaliva.toFixed(4));
      $("#totalamount").val(totalamount.toFixed(4));
      $("#totalamountiva").val(totalamountiva.toFixed(4));

    });


    $("table.order-list").on("click", ".ibtnDel", function (event) {
      $(this).closest("tr").remove();

      var totalamount = 0;
      var totaliva = 0;
      var totalamountiva = 0;
      $(".amount").each(function () {
        totalamount += +$(this).val();

      });

      totaliva += +totalamount * 21 / 100;
      totalamountiva += +totalamount + +totaliva;

      $("#totaliva").val(totaliva.toFixed(4));
      $("#totalamount").val(totalamount.toFixed(4));
      $("#totalamountiva").val(totalamountiva.toFixed(4));

    });

    //load countries
    this.countriesService.list().subscribe(data => {
      this.countries = data;
    });

    //load providers
    this.providersService.list().subscribe(data => {
      this.providers = data;
    });

    //load categories
    this.categoriesService.list().subscribe(data => {
      this.category_list = data;
    });
  }

  providerChange(event) {
    $('#row_items_body tr').not('.row_origin').remove();
    this.product_list = [];
    this.id_provider = event.target.value;
    this.providersService.get(this.id_provider).subscribe(data => {
      this.provider = data[0];

      $("tbody input").not('#addrow').val('');
      $("tfoot input").not('#addrow').val('');

      this.productService.list().subscribe(data => {
        this.products = data;
        console.log(this.products);
        this.products.forEach(element => {
          this.product = element;
          let prov = element['provider'].split(",");

          prov.forEach(element => {
            let prov_id = element.split("-");

            if (prov_id[2] == this.id_provider) {
              var iva = +prov_id[0] * +prov_id[1] / 100;
              var precio = +prov_id[0] + +iva;
              this.product.price = +prov_id[0];
              this.product.vat = +prov_id[1]
              this.product_list.push(this.product);
            }

          });

        });

      });

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

  createPurchaseOrder() {
    var arr_items = [];

    $("#row_items_body tr").each(function () {
      var value_item = $(this).find(".product_list").val().toString();
      var quantity = $(this).find(".quantity").val();
      var id = value_item.split("|--|")[2];
      arr_items.push(id + "-" + quantity);

    });

    this.project_number = $("#project_num").val();
    this.ref_number = $("#ref_number").val();
    this.date = $("#po_date").val();
    this.document = "-";
    this.company_shipto = $("#company_shipto").val();
    this.address_shipto = $("#address_shipto").val();
    this.country_shipto = $("#country_shipto").val();
    this.phone_shipto = $("#phone_shipto").val();
    this.email_shipto = $("#email_shipto").val();
    this.vat_shipto = $("#vat_shipto").val();
    this.company_billto = $("#company_billto").val();
    this.address_billto = $("#address_billto").val();
    this.country_billto = $("#country_billto").val();
    this.phone_billto = $("#phone_billto").val();
    this.email_billto = $("#email_billto").val();
    this.vat_billto = $("#vat_billto").val();
    this.items = arr_items.join();
    this.total_price = $("#totalamount").val();
    this.state = "0";


    if (this.project_number != "") {
      this.purchase.project_num = this.project_number;
      this.purchase.ref_number = this.ref_number;
      this.purchase.date = this.date;
      this.purchase.document = this.document;
      this.purchase.company_shipto = this.company_shipto;
      this.purchase.address_shipto = this.address_shipto;
      this.purchase.country_shipto = this.country_shipto;
      this.purchase.phone_shipto = this.phone_shipto;
      this.purchase.email_shipto = this.email_shipto;
      this.purchase.provider = this.provider.id;
      this.purchase.company_billto = this.company_billto;
      this.purchase.address_billto = this.address_billto;
      this.purchase.country_billto = this.country_billto;
      this.purchase.phone_billto = this.phone_billto;
      this.purchase.email_billto = this.email_billto;
      this.purchase.items = this.items;
      this.purchase.vat_shipto = this.vat_shipto;
      this.purchase.vat_billto = this.vat_billto;
      this.purchase.total_price = this.total_price;
      this.purchase.state = this.state;
      this.purchase.order_num = this.project_number + "_" + this.ref_number;


      this.purchaseOrderService.post(this.purchase).subscribe(data => {
        const mensaje = this.translate.instant('MATERIAL_MNG.purchase_order_created');
        console.log(data);

        this.snackBar.open(mensaje, 'X', {
          duration: 5000
        });

        this.dialog.closeAll();
      }, error => {
        const mensaje = this.translate.instant('MATERIAL_MNG.purchase_order_created_error');
        console.log(error);
        this.snackBar.open(mensaje, 'X', {
          duration: 5000
        });
        this.dialog.closeAll();
      });

      this.purchaseDetail.project_num = this.project_number;
      this.purchaseDetail.ref_num = this.ref_number;
      this.purchaseDetail.order_num = this.project_number + "_" + this.ref_number;
      this.purchaseDetail.state = this.state;
      this.purchaseDetail.provider = this.provider.name;
      this.purchaseDetail.note = "";

      arr_items.forEach(element => {
        console.log(element.split("-")[0]);
        console.log(element.split("-")[1]);

        this.productService.get(element.split("-")[0]).subscribe(data => {
          this.purchaseDetail.component = data[0]['title'];
          this.purchaseDetail.ref_component = data[0]['codigo_articulo'];
          this.purchaseDetail.quantity = element.split("-")[1];

          this.purchaseDetailService.post(this.purchaseDetail).subscribe(data => {
            console.log(data);
            this.dialog.closeAll();
          }, error => {
            console.log(error);
            this.dialog.closeAll();
          });
        });

      });

    } else {
      this.dialog.closeAll();
    }

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

  close() {

    this.dialog.closeAll();
  }


}
