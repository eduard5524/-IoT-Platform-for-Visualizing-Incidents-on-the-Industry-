import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SessionService } from '../../../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../../../../../../models/api/product';
import { PurchaseOrder } from '../../../../../../models/api/purchase-order';
import { Provider } from '../../../../../../models/api/provider';
import { ProductService } from '../../../../../../services/Neuracore/product.service';
import { ProvidersService } from '../../../../../../services/Neuracore/providers.service';
import { PurchaseOrderService } from '../../../../../../services/Neuracore/purchase-order.service';
import { CategoriesService } from '../../../../../../services/Neuracore/categories.service';
import { Category } from '../../../../../../models/api/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { RolesService } from '../../../../../../services/roles.service';
import { Role } from '../../../../../../models/api/role';
import { BaseModulesComponent } from '../../../../../base-modules.component';

@Component({
  selector: 'app-purchase-order-dialog',
  templateUrl: './purchase-order-dialog.component.html',
  styleUrls: ['../../../../../../../assets/styles/tables-global-styles.css']
})
export class PurchaseOrderDialogComponent extends BaseModulesComponent implements OnInit {
  id_product: any;
  proveedores: any = new Array<any>();
  id_provider: any;
  id_purchase: any;
  iva: number;
  preciosiniva: number;
  providersplit: any;
  providersplit2: any;
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
  purchase_num: any;

  provider: Provider = {
    id: null,
    address: null,
    country: null,
    email: null,
    name: null,
    phone: null,
    vat: null,
    price_this_prod: null
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

  purchase_order: PurchaseOrder = {
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

  providers: Provider[] = new Array();
  products: Product[] = new Array();
  category_list: Category[] = new Array();
  product_list: Product[] = new Array();
  actual_products: Product[] = new Array();
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


  public purchaseOrders: PurchaseOrder[];

  public edit: boolean;
  public create: boolean;
  public userRole: string;
  public roles: Role[];
  private mobileLayout: boolean;
  public export_array = [
    "PDF",
    "Excel"
  ];

  constructor(public dialogRef: MatDialogRef<PurchaseOrderDialogComponent>,
    public rolesService: RolesService,
    private breakPointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    public translate: TranslateService,
    private categoriesService: CategoriesService,
    public productService: ProductService,
    public providersService: ProvidersService,
    public purchaseOrderService: PurchaseOrderService,
    public sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,) {
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
      this.edit = data.edit;
      this.create = false;
    } else {
      this.edit = true;
      this.create = true;
    }


  }

  ngOnInit() {

    this.id_purchase = this.data.purchaseorder.id;

    //get purchase order
    this.purchaseOrderService.get(this.id_purchase).subscribe(data => {
      this.purchase_order = data[0];
      this.purchase_num = this.purchase_order.project_num + '_' + this.purchase_order.ref_number;
      let arr_elements = this.purchase_order.items.split(",");

      arr_elements.forEach(element => {
        let product = new Product();
        let id = element.split("-")[0];
        let qty = element.split("-")[1];

        this.productService.get(+id).subscribe(data => {
          product = data[0];
          product.quantity = +qty;


          let prov = product.provider.split(",");

          prov.forEach(element => {
            let prov_id = element.split("-");

            console.log(prov_id);
            var iva = +prov_id[0] * +prov_id[1] / 100;
            var precio = +prov_id[0] + +iva;
            product.price_sin_iva = +prov_id[0];
            product.vat = +iva;
            product.price = product.price_sin_iva * +qty;


          });
          this.actual_products.push(product);
        });

      });

      console.log(this.actual_products);

      //get provider
      this.providersService.get(this.purchase_order.provider).subscribe(data => {
        this.provider = data[0];
        this.productService.list().subscribe(data => {
          this.products = data;

          this.products.forEach(element => {
            this.product = element;
            let prov = element['provider'].split(",");

            prov.forEach(element => {
              let prov_id = element.split("-");
              if (+prov_id[2] == this.provider.id) {

                var iva = +prov_id[0] * +prov_id[1] / 100;
                var precio = +prov_id[0] + +iva;
                this.product.price = +prov_id[0];
                this.product.vat = +prov_id[1]
                this.product_list.push(this.product);
              }

            });

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

        });

      });
    });


    //add row
    $("#addrow").on("click", function () {
      console.log("CLick add row");
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
      console.log(valores);
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
        totalamount += +$(this).val()
      });

      totaliva += +totalamount * 21 / 100;
      totalamountiva += +totalamount + +totaliva;
      $("#totaliva").val(totaliva.toFixed(4));
      $("#totalamount").val(totalamount.toFixed(4));
      $("#totalamountiva").val(totalamountiva.toFixed(4));
    });

    // change quantity
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

    //delete row
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



  }


  exportFile(value: any) {
    console.log(value);

    if (value == 'PDF') {
      $("#print_this input").prop("readonly", true);
      $("#print_this select").css("-webkit-appearance", "none");
      $("#print_this select").css("-moz-appearance", "none");
      $("#provider_selector").addClass("d-none");
      $("#addrow").addClass("d-none");
      $("#printpdf").addClass("d-none");
      $(".ibtnDel").addClass("d-none");

      var datos = document.getElementById('print_this');

      html2canvas(datos, {
        scale: 3,
        windowWidth: 1500,
        windowHeight: 1200
      }).then(function (canvas) {
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/png");
        // a.download = 'myfile.png';
        //a.click();
        var imgWidth = 210;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        var doc = new jspdf('p', 'mm');
        var position = 0;

        doc.addImage(a.href, 'JPG', 0, position, imgWidth, imgHeight);

        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(a.href, 'JPG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save(Date.now() + '.pdf');
      });
    }

  }


  close() {
    this.dialog.closeAll();
  }


  getAllPurchaseOrders(dialog: MatDialog): void {
    console.log("PURCHASE ORDER");
    this.purchaseOrderService.list().subscribe(data => {
      this.purchaseOrders = data;

      $('#datatable_purchase_order').DataTable({
        destroy: true,
        data: this.purchaseOrders,
        columns: [
          { data: "project_num" },
          { data: "ref_number" },
          {
            data: "total_price", render: function (data) {
              return data + '€';
            }
          },
          { data: "detail", defaultContent: "<img style='width:20px;cursor:pointer' src='assets/img/eye.png'>", className: "text-center" }
        ],
        createdRow: function (row, data, dataIndex) {
          $(row).attr('id', data['id']);

          $(row).click(function () {
            const dialogRef = dialog.open(PurchaseOrderDialogComponent, {
              width: '1500px',
              data: {
                id: $(this).attr('id').valueOf()
              }
            });

            dialogRef.afterClosed().subscribe(
              (data: any) => {
                data => console.log("Update purchase order output:", data)

              }
            );

          });

        },
      });
    });
  }




  updatePurchaseOrder() {
    var arr_items = [];

    $("#row_items_body tr").each(function () {
      var value_item = $(this).find(".product_list").val().toString();
      var quantity = $(this).find(".quantity").val();
      var id = value_item.split("|--|")[2];

      if (typeof id !== "undefined") {
        arr_items.push(id + "-" + quantity);
      }

    });

    this.project_number = $("#project_number").val();
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
    console.log(this.id_purchase);


    if (this.project_number != "") {
      this.purchase.id = this.id_purchase;
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

      this.purchaseOrderService.put(this.purchase).subscribe(data => {
        const mensaje = this.translate.instant('MATERIAL_MNG.purchase_order_updated');

        this.snackBar.open(mensaje, 'X', {
          duration: 5000
        });

        this.dialog.closeAll();
      }, error => {
        const mensaje = this.translate.instant('MATERIAL_MNG.purchase_order_updated_error');
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
}

