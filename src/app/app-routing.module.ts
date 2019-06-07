import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { HomeComponent } from './home/home.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ProductsComponent } from './products/products.component';
import { UpdateComponent } from './update/update.component';


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'registration', component: RegComponent},
    {path: 'login', component: LoginComponent},
    {path: 'user-page', component: UserPageComponent},
    {path: 'product-list', component: ProductsComponent},
    {path: 'update', component: UpdateComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
