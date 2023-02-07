import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {ProductComponent} from './components/product/product.component'
import {HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {ProductPageComponent} from './pages/product-page/product-page.component'
import { ProductsService } from './services/products.service'

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
