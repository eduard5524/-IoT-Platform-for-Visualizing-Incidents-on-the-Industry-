import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../helpers/constants';
import { SidenavComponent } from '../top-navigation/sidenav.component';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AboutComponent } from '../../General/about/about.component';

@Component({
  selector: 'app-sidenav-neuraflow',
  templateUrl: './sidenav-neuraflow.component.html',
  styleUrls: ['../sidenav-global-styles.css']
})

export class SidenavMfcComponent implements OnInit {
  @Output() option = new EventEmitter();

  constants = Constants;
  public openclose = 0;
  public message: string;


  constructor(public dialog: MatDialog) {
    this.message = "arrow_forward_ios";
  }

  ngOnInit() {
    let counter = 0;
    $("#sidenav .sidenav-submenu").click(function () {
      $(".main").css("padding-left", "340px");
    });

    /* Expand the submenus. */
    $("#menu_settings").click(function () {
      $(this).find(".arrow_dropdown").toggleClass('d-none');
      $(this).find(".arrow_dropup").toggleClass('d-none');
      $('.menu .arrow_dropdown').not('.menu #menu_settings .arrow_dropdown').removeClass('d-none');
      $('.menu .arrow_dropup').not('.menu #menu_settings .arrow_dropup').addClass('d-none');
      $("#submenu_settings").toggle(200);
      $("#submenu_control_monitoring").hide(200);
      $("#submenu_mfc").hide(200);
    });

    $("#menu_control_monitoring").click(function () {
      $(this).find(".arrow_dropdown").toggleClass('d-none');
      $(this).find(".arrow_dropup").toggleClass('d-none');
      $('.menu .arrow_dropdown').not('.menu #menu_control_monitoring .arrow_dropdown').removeClass('d-none');
      $('.menu .arrow_dropup').not('.menu #menu_control_monitoring .arrow_dropup').addClass('d-none');
      $("#submenu_control_monitoring").toggle(200);
      $("#submenu_settings").hide(200);
      $("#submenu_mfc").hide(200);
    });

    $("#menu_mfc").click(function () {
      $(this).find(".arrow_dropdown").toggleClass('d-none');
      $(this).find(".arrow_dropup").toggleClass('d-none');
      $('.menu .arrow_dropdown').not('.menu #menu_mfc .arrow_dropdown').removeClass('d-none');
      $('.menu .arrow_dropup').not('.menu #menu_mfc .arrow_dropup').addClass('d-none');
      $("#submenu_mfc").toggle(200);
      $("#submenu_control_monitoring").hide(200);
      $("#submenu_settings").hide(200);
    });


    /*añadir estilos al elemento seleccionado */
    $(".sidenav-submenu").click(function () {
      $("html *").removeClass("imhere");
      $(this).find('span').addClass("imhere");
      $(this).closest('.menu').find('.sidenav-menu *').addClass("imhere");
    });
  }

  onClicSidenav(option) {
    this.option.emit(option);
  }

  /* Set the width of the side navigation and the left margin of the page content to 250px */
  openNav() {
    if (this.openclose == 0) {
        this.openclose = 1;
        this.message = "arrow_back_ios";

        $('.arrow_drop').removeClass("d-none");
        $('.links_menu').removeClass("d-none");
        $('.about_text').removeClass("d-none");
        $(".text-sidenav").removeClass("d-none");
        $(".text-sidenav-submenu").removeClass("d-none");
        $(".text-sidenav-about").removeClass("d-none");
        $(".closebtn").removeClass("d-none");
        $(".openbtn").removeClass("d-none");
        $(".sidenav-submenu").removeClass("d-none");
        //$(".sidenav").css("margin-top", "60px");
        $(".main").css("padding-left", "340px");
        //  $(".submenus").css("display", "none");
        document.getElementById("sidenav").style.width = "260px";
        //document.getElementById("main").style.paddingLeft = "300px";
    }else{
        this.openclose = 0;
        this.message = "arrow_forward_ios";

        $('.arrow_drop').addClass("d-none");
        $('.links_menu').removeClass("d-none");
        $('.about_text').addClass("d-none");
        $(".text-sidenav").addClass("d-none");
        $(".text-sidenav-about").addClass("d-none");
        $(".text-sidenav-submenu").removeClass("d-none");
        $(".closebtn").addClass("d-none");
        $(".openbtn").removeClass("d-none");
        $(".sidenav-submenu").addClass("d-none");
        //$(".sidenav").css("margin-top", "60px");
        $(".main").css("padding-left", "140px");
        document.getElementById("sidenav").style.width = "80px";
    }
}

    /** Function executed to display About Information. */
    openAbout(about: AboutComponent) {
        this.dialog.open(AboutComponent, {
          width: '1500px',
          data: { }
        });
    }
}
