import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BillingPageComponent } from './components/billing-page/billing-page.component';
import { ProductEntryComponent } from './components/product-entry/product-entry.component';
import { ProductInfoService } from './services/product-info.service';
import { HttpClientModule } from '@angular/common/http';
import { TabViewModule } from 'primeng/tabview';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import {KeyFilterModule} from 'primeng/keyfilter';
import {TooltipModule} from 'primeng/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    BillingPageComponent,
    ProductEntryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TabViewModule,
    DataViewModule,
    ButtonModule,
    KeyFilterModule,
    TooltipModule
  ],
  providers: [ProductInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
