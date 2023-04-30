import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './nav/nav.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { PasswordResetRequestComponent } from './auth/password-reset-request/password-reset-request.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { RequestAccountUnlockComponent } from './auth/request-account-unlock/request-account-unlock.component';
import { UnlockAccountComponent } from './auth/unlock-account/unlock-account.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminProductListComponent } from './admin/admin-product-list/admin-product-list.component';

import { AuthService } from './auth.service';
import { AuthInterceptor } from './http-interceptors/AuthInterceptor';
import { ProductsService } from './products.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { AdminNewProductComponent } from './admin/admin-new-product/admin-new-product.component';
import { CategoriesComponent } from './admin/categories/categories/categories.component';
import { CategoryEditComponent } from './admin/categories/category-edit/category-edit.component';
import { FeaturesComponent } from './admin/features/features/features.component';
import { FeatureEditComponent } from './admin/features/feature-edit/feature-edit.component';
import { DiscountsComponent } from './admin/discounts/discounts/discounts.component';
import { DiscountEditComponent } from './admin/discounts/discount-edit/discount-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    RegistrationComponent,
    PasswordResetRequestComponent,
    PasswordResetComponent,
    RequestAccountUnlockComponent,
    UnlockAccountComponent,
    AdminPanelComponent,
    AdminProductListComponent,
    ProductCardComponent,
    AdminNewProductComponent,
    CategoriesComponent,
    CategoryEditComponent,
    FeaturesComponent,
    FeatureEditComponent,
    DiscountsComponent,
    DiscountEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: AuthService },
    { provide: ProductsService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
