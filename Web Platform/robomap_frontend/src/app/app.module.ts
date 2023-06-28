/**
 * In this file must be imported all dependencies or libraries used in the project.
 * One declaration for each Component. If your are using CLI Commands (ng g c your_component)
 * declaration are included automatically. We recommend strongly use of CLI commands to create Angular Components.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/General/login/login.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
    MAT_SNACK_BAR_DEFAULT_OPTIONS, MatButtonModule,
    MatCardModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatMenuModule, MatPaginatorModule, MatSidenavModule,
    MatSnackBarModule, MatTableModule, MatToolbarModule, MatTooltipModule,
    MatDividerModule, MatDialogModule, MatSelectModule, MatOptionModule,
    MatRadioModule, MatListModule, MatChipsModule, MatSortModule
} from '@angular/material';
import { PageNotFoundComponent } from './components/General/page-not-found/page-not-found.component';
import { SessionService } from './services/session.service';
import { CompaniesService } from './services/General/companies.service';
import { RolesService } from './services/roles.service';
import { UsersService } from './services/users.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './components/navigation/top-navigation/sidenav.component';
import { UserContainerComponent } from './components/General/users/user-container/user-container.component';
import { DataTablesModule } from 'angular-datatables';
import { LayoutModule } from '@angular/cdk/layout';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';

/*********************************************************************
 * General Application
 *********************************************************************/

/**
 * General Menu Angular Components
 */
 import { HomeContainerComponent } from './components/General/home/home.component';
 import { DashboardComponent } from './components/General/dashboard/dashboard.component';
 import { HelpComponent } from './components/General/help/help.component';
 import { FooterComponent } from './components/General/footer/footer.component';
 import { AboutComponent } from './components/General/about/about.component';
 import { RolesDialogComponent } from './components/General/roles/modals/roles-dialog/roles-dialog.component';
 import { RolesDeleteComponent } from './components/General/roles/modals/roles-delete/roles-delete.component';
 import { UserDialogComponent } from './components/General/users/modals/user-dialog/user-dialog.component';
 import { ContextMenuComponent } from './components/General/context-menu/context-menu.component';
 import { CompanyDeleteComponent } from './components/General/companies/modals/company-delete/company-delete.component';
 import { SidenavMfcComponent } from './components/navigation/sidenav-neuraflow/sidenav-neuraflow.component';
 import { SidenavMaterialManagementComponent } from './components/navigation/sidenav-neuracore/sidenav-neuracore.component';

/**
 * User Menu Angular Components.
 */
 import { UserProfileComponent } from './components/General/users/user-profile/user-profile.component';

 /**
  * Panel Administration Angular Components.
  */
 import { UserListComponent } from './components/General/users/user-list/user-list.component';
 import { UserDeleteComponent } from './components/General/users/modals/user-delete/user-delete.component';
 import { RolesContainerComponent } from './components/General/roles/roles-container/roles-container.component';
 import { RolesListComponent } from './components/General/roles/roles-list/roles-list.component';
 import { CompaniesContainerComponent } from './components/General/companies/companies-container/companies-container.component';
 import { CompaniesListComponent } from './components/General/companies/companies-list/companies-list.component';
 import { CompaniesSelectComponent } from './components/General/companies/companies-select/companies-select.component';
 import { CompanyDialogComponent } from './components/General/companies/modals/company-dialog/company-dialog.component';

 /*********************************************************************
 * Neuraflow Application
 *********************************************************************/

/**
 * Incidences Angular Components.
 */
 import { DetailIncidentsComponent } from './components/Neuraflow/incidences/incidence-detail/incidence-detail.component';
 import { NewIncidentCommentComponent } from './components/Neuraflow/incidences/incidence-new-comment/incidence-new-comment.component';
 import { AlarmsComponent } from './components/Neuraflow/incidences/incidences.component';
 import { AcknowComponent } from './components/Neuraflow/incidences/acknowledge/acknowledge.component';
 import { ConfirmationAcknowComponent } from './components/Neuraflow/incidences/acknowledge/acknowledge-confirmation/acknowledge-confirmation.component';


/**
 * Devices Angular Components.
 */
 import { CreateDeviceComponent } from './components/Neuraflow/devices/create-device/create-device.component';
 import { SettingsDevicesComponent } from './components/Neuraflow/devices/settings-devices.component';
 import { EditDeviceComponent } from './components/Neuraflow/devices/edit-device/edit-device.component';

/*********************************************************************
 * Neuracore Application
 *********************************************************************/

 import { MaterialManagementComponent } from './components/Neuracore/neuracore.component';
/**
 * Purchases Angular Components.
 */
 import { PurchaseOrderComponent } from './components/Neuracore/purchases/purchase-order/purchase-order.component';
 import { PurchaseOrderDeleteComponent } from './components/Neuracore/purchases/purchase-order/modals/purchase-order-delete/purchase-order-delete.component';
 import { PurchaseOrderDialogComponent } from './components/Neuracore/purchases/purchase-order/modals/purchase-order-dialog/purchase-order-dialog.component';
 import { PurchaseOrderCreateComponent } from './components/Neuracore/purchases/purchase-order/modals/purchase-order-create/purchase-order-create.component';
 import { PurchasesComponent } from './components/Neuracore/purchases/purchases.component';
 import { ComponentPurchasedDialogComponent } from './components/Neuracore/purchases/components-purchased/modals/component-purchased-dialog/component-purchased-dialog.component';
 import { ComponentsPurchasedComponent } from './components/Neuracore/purchases/components-purchased/components-purchased.component';

/**
 * Product Component Angular Component.
 */
 import { NewCategoryComponent } from './components/Neuracore/products/categories/new-category/new-category.component';
 import { ProductComponentDialogComponent } from './components/Neuracore/products/components/modals/product-component-dialog/product-component-dialog.component';
 import { ProductComponentDeleteComponent } from './components/Neuracore/products/components/modals/product-component-delete/product-component-delete.component';
 import { ProductComponentCreateComponent } from './components/Neuracore/products/components/modals/product-component-create/product-component-create.component';
 import { CategoryDialogComponent } from './components/Neuracore/products/categories/modals/category-dialog/category-dialog.component';
 import { CategoryDeleteComponent } from './components/Neuracore/products/categories/modals/category-delete/category-delete.component';
 import { ProductsComponent } from './components/Neuracore/products/products.component';
 import { CategoriesComponent } from './components/Neuracore/products/categories/categories.component';
 import { ComponentsComponent } from './components/Neuracore/products/components/components.component';
 import { FamiliesComponent } from './components/Neuracore/products/families/families.component';

/**
 * Sales Menu Angular Components.
 */
 import { SalesComponent } from './components/Neuracore/sales/sales.component';
 import { ClientsComponent } from './components/Neuracore/sales/clients/clients.component';
 import { InvoicesComponent } from './components/Neuracore/sales/invoices/invoices.component';



/**
 * Providers Menu Angular Components.
 */
 import { ProvidersComponent } from './components/Neuracore/purchases/providers/providers.component';
 import { ProviderDialogComponent } from './components/Neuracore/purchases/providers/modals/provider-dialog/provider-dialog.component';
 import { ProviderDeleteComponent } from './components/Neuracore/purchases/providers/modals/provider-delete/provider-delete.component';
 import { ManufacturerDeleteComponent } from './components/Neuracore/products/manufacturers/modals/manufacturer-delete/manufacturer-delete.component';
 import { ManufacturerDialogComponent } from './components/Neuracore/products/manufacturers/modals/manufacturer-dialog/manufacturer-dialog.component';
 import { ManufacturersComponent } from './components/Neuracore/products/manufacturers/manufacturers.component';

/**
 * Wharehouse Menu Angular Components.
 */
 import { WarehouseComponent } from './components/Neuracore/warehouse/warehouse.component';
 import { ComponentsWarehouseComponent } from './components/Neuracore/warehouse/components-warehouse/components-warehouse.component';
 import { LocationsComponent } from './components/Neuracore/warehouse/locations/locations.component';
 import { LocationDialogComponent } from './components/Neuracore/warehouse/locations/modals/location-dialog/location-dialog.component';
 import { LocationDeleteComponent } from './components/Neuracore/warehouse/locations/modals/location-delete/location-delete.component';

/**
 * Get the token from localStorage. This token is generated when user login is successful.
 */
export function getToken() {
    const USER_TOKEN = 'token';
    return localStorage.getItem(USER_TOKEN);
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

registerLocaleData(localeEs);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PageNotFoundComponent,
        CompaniesSelectComponent,
        CompanyDialogComponent,
        SidenavComponent,
        UserListComponent,
        UserContainerComponent,
        HomeContainerComponent,
        CompaniesContainerComponent,
        CompaniesListComponent,
        RolesContainerComponent,
        RolesListComponent,
        UserDialogComponent,
        ContextMenuComponent,
        UserDeleteComponent,
        CompanyDeleteComponent,
        RolesDialogComponent,
        RolesDeleteComponent,
        AlarmsComponent,
        DetailIncidentsComponent,
        NewIncidentCommentComponent,
        AcknowComponent,
        ConfirmationAcknowComponent,
        FooterComponent,
        SettingsDevicesComponent,
        EditDeviceComponent,
        CreateDeviceComponent,
        MaterialManagementComponent,
        PurchaseOrderComponent,
        SidenavMfcComponent,
        SidenavMaterialManagementComponent,
        ManufacturersComponent,
        PurchasesComponent,
        ProductsComponent,
        ComponentsPurchasedComponent,
        ProvidersComponent,
        ComponentsComponent,
        FamiliesComponent,
        CategoriesComponent,
        SalesComponent,
        InvoicesComponent,
        ClientsComponent,
        WarehouseComponent,
        ComponentsWarehouseComponent,
        NewCategoryComponent,
        ManufacturerDeleteComponent,
        ManufacturerDialogComponent,
        DashboardComponent,
        UserProfileComponent,
        CategoryDialogComponent,
        CategoryDeleteComponent,
        ProviderDialogComponent,
        ProviderDeleteComponent,
        ProductComponentDialogComponent,
        ProductComponentDeleteComponent,
        ProductComponentCreateComponent,
        PurchaseOrderDeleteComponent,
        PurchaseOrderDialogComponent,
        PurchaseOrderCreateComponent,
        ComponentPurchasedDialogComponent,
        LocationsComponent,
        LocationDialogComponent,
        LocationDeleteComponent,
        AboutComponent,
        HelpComponent,
    ],

    imports: [
        BrowserModule,
        DataTablesModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: getToken,
                whitelistedDomains: [environment.api]
            }
        }),

        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSnackBarModule,
        MatButtonModule,
        MatDividerModule,
        MatDialogModule,
        MatToolbarModule,
        MatSidenavModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatSelectModule,
        MatOptionModule,
        MatRadioModule,
        MatListModule,
        MatChipsModule,
        LayoutModule,
        MatSlideToggleModule
    ],

    providers: [
        JwtInterceptor,
        ErrorInterceptor,
        SessionService,
        CompaniesService,
        RolesService,
        UsersService,
        { provide: LOCALE_ID, useValue: 'es-ES' },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } }
    ],

    entryComponents: [
        CompanyDialogComponent,
        UserDialogComponent,
        UserDeleteComponent,
        ManufacturerDialogComponent,
        ManufacturerDeleteComponent,
        CompanyDeleteComponent,
        RolesDialogComponent,
        RolesDeleteComponent,
        DetailIncidentsComponent,
        NewIncidentCommentComponent,
        AcknowComponent,
        ConfirmationAcknowComponent,
        EditDeviceComponent,
        CreateDeviceComponent,
        NewCategoryComponent,
        CategoryDialogComponent,
        CategoryDeleteComponent,
        ProviderDialogComponent,
        ProviderDeleteComponent,
        ProductComponentDialogComponent,
        ProductComponentDeleteComponent,
        ProductComponentCreateComponent,
        PurchaseOrderDeleteComponent,
        PurchaseOrderDialogComponent,
        PurchaseOrderCreateComponent,
        ComponentPurchasedDialogComponent,
        LocationDialogComponent,
        LocationDeleteComponent,
        AboutComponent,
        HelpComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
