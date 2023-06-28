import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SessionService } from '../../../services/session.service';
import { Constants } from '../../../helpers/constants';
import { SidenavComponent } from '../top-navigation/sidenav.component';
import { Output, EventEmitter } from '@angular/core';
import { AboutComponent } from '../../General/about/about.component';
import { HelpComponent } from '../../General/help/help.component';

@Component({
  selector: 'app-sidenav-neuracore',
  templateUrl: './sidenav-neuracore.component.html',
  styleUrls: ['../sidenav-global-styles.css']
})
export class SidenavMaterialManagementComponent implements OnInit {
  @Output() option = new EventEmitter();

  constants = Constants;

  constructor(private dialog: MatDialog,
    public sessionService: SessionService,) { }

  ngOnInit() {

    $("#sidenav .sidenav-submenu, #menu_dashboard").click(function () {
      $(".main").css("padding-left", "280px");
    });

    //desplegar los submenu
    $("#menu_purchases").click(function () {
      $(this).find(".arrow_dropdown").toggleClass('d-none');
      $(this).find(".arrow_dropup").toggleClass('d-none');
      $('.menu .arrow_dropdown').not('.menu #menu_purchases .arrow_dropdown').removeClass('d-none');
      $('.menu .arrow_dropup').not('.menu #menu_purchases .arrow_dropup').addClass('d-none');
      $("#submenu_purchases").toggle(200);
      $("#submenu_products").hide(200);
      $("#submenu_sales").hide(200);
      $("#submenu_warehouse").hide(200);
    });

    $("#menu_products").click(function () {
      $(this).find(".arrow_dropdown").toggleClass('d-none');
      $(this).find(".arrow_dropup").toggleClass('d-none');
      $('.menu .arrow_dropdown').not('.menu #menu_products .arrow_dropdown').removeClass('d-none');
      $('.menu .arrow_dropup').not('.menu #menu_products .arrow_dropup').addClass('d-none');
      $("#submenu_products").toggle(200);
      $("#submenu_purchases").hide(200);
      $("#submenu_sales").hide(200);
      $("#submenu_warehouse").hide(200);
    });

    $("#menu_sales").click(function () {
      $(this).find(".arrow_dropdown").toggleClass('d-none');
      $(this).find(".arrow_dropup").toggleClass('d-none');
      $('.menu .arrow_dropdown').not('.menu #menu_sales .arrow_dropdown').removeClass('d-none');
      $('.menu .arrow_dropup').not('.menu #menu_sales .arrow_dropup').addClass('d-none');
      $("#submenu_sales").toggle(200);
      $("#submenu_products").hide(200);
      $("#submenu_purchases").hide(200);
      $("#submenu_warehouse").hide(200);
    });

    $("#menu_warehouse").click(function () {
      $(this).find(".arrow_dropdown").toggleClass('d-none');
      $(this).find(".arrow_dropup").toggleClass('d-none');
      $('.menu .arrow_dropdown').not('.menu #menu_warehouse .arrow_dropdown').removeClass('d-none');
      $('.menu .arrow_dropup').not('.menu #menu_warehouse .arrow_dropup').addClass('d-none');
      $("#submenu_warehouse").toggle(200);
      $("#submenu_products").hide(200);
      $("#submenu_purchases").hide(200);
      $("#submenu_sales").hide(200);
    });

    $("#menu_dashboard").click(function () {
      $("#submenu_warehouse").hide(200);
      $("#submenu_products").hide(200);
      $("#submenu_purchases").hide(200);
      $("#submenu_sales").hide(200);
    });

    //añadir estilos al elemento seleccionado
    $(".sidenav-submenu").click(function () {
      $("html *").removeClass("imhere");
      // $("html *").removeClass("imhere-bg");
      $(this).find('span').addClass("imhere");
      // $(this).addClass("imhere-bg");
      $(this).closest('.menu').find('.sidenav-menu *').addClass("imhere");
    });

    $("#menu_dashboard").click(function () {
      $("html *").removeClass("imhere");
      // $("html *").removeClass("imhere-bg");
      $(this).find('span b').addClass("imhere");
      $(this).find('mat-icon').addClass("imhere");
    });
  }

  onClicSidenav(option) {
    this.option.emit(option);
  }

  aboutModal() {
    this.dialog.open(AboutComponent, {
      width: '700px',
      data: {}
    });
  }

  helpModal() {
    this.dialog.open(HelpComponent, {
      width: '700px',
      data: {}
    });
  }

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
  openNav() {
    $('.arrow_drop').removeClass("d-none");
    $('.links_menu').removeClass("d-none");
    $(".text-sidenav").removeClass("d-none");
    $(".closebtn").removeClass("d-none");
    $(".openbtn").addClass("d-none");
    $(".sidenav-submenu").removeClass("d-none");
    $(".sidenav").css("margin-top", "64px");
    $(".main").css("padding-left", "280px");
    //  $(".submenus").css("display", "none");
    document.getElementById("sidenav").style.width = "235px";
    //document.getElementById("main").style.paddingLeft = "300px";
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  closeNav() {
    $('.arrow_drop').addClass("d-none");
    $('.links_menu').addClass("d-none");
    $(".text-sidenav").addClass("d-none");
    $(".closebtn").addClass("d-none");
    $(".openbtn").removeClass("d-none");
    $(".sidenav-submenu").addClass("d-none");
    $(".sidenav").css("margin-top", "19px");
    $(".main").css("padding-left", "140px");
    document.getElementById("sidenav").style.width = "80px";

  }

}

