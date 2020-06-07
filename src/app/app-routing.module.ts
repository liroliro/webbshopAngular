import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductpageComponent } from './components/productpage/productpage.component';
import { IndexComponent } from './components/index/index.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'products', component: ProductpageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products/:id', component: SingleProductComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
