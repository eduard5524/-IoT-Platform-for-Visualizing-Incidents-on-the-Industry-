import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../components/General/login/login.component';
import {PageNotFoundComponent} from '../components/General/page-not-found/page-not-found.component';
import {CompaniesSelectComponent} from '../components/General/companies/companies-select/companies-select.component';
import {SidenavComponent} from '../components/navigation/top-navigation/sidenav.component';
import {AlarmsComponent} from '../components/Neuraflow/incidences/incidences.component';
import {SettingsDevicesComponent} from '../components/Neuraflow/devices/settings-devices.component';
import {AuthGuard} from '../guards/auth.guard';
import {Constants} from '../helpers/constants';
import { PurchaseOrderComponent } from '../components/Neuracore/purchases/purchase-order/purchase-order.component';
import { ComponentsComponent } from '../components/Neuracore/products/components/components.component';
import { DashboardComponent } from '../components/General/dashboard/dashboard.component';


/**
 * SPA (Single Page Application) use a set of routes to navigate between pages or call componentes.
 *In this file you define which routes call Angular Components or Set of nested Components
 * canActivate: [AuthGuard] set the route protected by token and Credential verification
 */
const routes: Routes = [
    // {path: 'users', component: ContentsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        component: SidenavComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {

        path: 'companies-select',
        component: CompaniesSelectComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        component: SidenavComponent,
        data: { option: Constants.OPTION_USER },
        canActivate: [AuthGuard]
    },
    {
        path: 'users/new',
        component: SidenavComponent,
        data: { option: Constants.OPTION_USER, action: Constants.ACTION_CREATE },
        canActivate: [AuthGuard]
    },
    {
        path: 'companies',
        component: SidenavComponent,
        data: { option: Constants.OPTION_COMPANY },
        canActivate: [AuthGuard],
        children: [
            { path: 'new', component: SidenavComponent, data: { action: Constants.ACTION_CREATE }},
        ]
    },
    {
        path: 'incidents',
        component: AlarmsComponent,
        pathMatch: 'full'
    },
    {
        path: 'purchase-orders',
        component: PurchaseOrderComponent,
        pathMatch: 'full'
    },
    {
        path: 'products-components',
        component: ComponentsComponent,
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'
    },
    {
        path: 'settings-devices',
        component: SettingsDevicesComponent,
        pathMatch: 'full'
    },
    {
        path: 'roles',
        component: SidenavComponent,
        pathMatch: 'full',
        data: { option: Constants.OPTION_ROLE },
        canActivate: [AuthGuard]
    },
    {path: 'notfound', component: PageNotFoundComponent},
    {
        path: '**',
        redirectTo: 'notfound',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

