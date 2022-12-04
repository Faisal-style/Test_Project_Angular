import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { gql } from 'apollo-angular';
import { Apollo } from 'apollo-angular';
import { SubSink } from 'subsink';
import { GetOrder, Menu, RecipeID } from '../model/cart';

const Get_myData = gql`
  query {
    GetOrder {
      id
      menu {
        id
        recipe_id {
          recipe_name
          status
          price
          image
        }
        amount
        note
      }
      order_status
    }
  }
`;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  private subs = new SubSink();
  // alldata: Menu[] = [];
  alldata: any;
  orderId: any;
  constructor(private authService: AuthService, private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: Get_myData,
      })
      .valueChanges.subscribe((response) => {
        console.log(response);
        if (response) {
          this.alldata = response.data.GetOrder.menu;
          this.orderId = response.data.GetOrder.id;
          console.log(this.alldata);
          console.log(this.orderId);
        }
      });
  }

  deletecart(id: any) {
    console.log(id);
    this.subs.sink = this.authService.deletecart(id).subscribe((resp) => {
      console.log(resp);
    });
  }

  ordernow(id: any) {
    let isConfirm = confirm('Apakah sudah yakin dengan pesanan anda ? ');
    if (isConfirm) {
      console.log(id);
      this.subs.sink = this.authService.ordernow(id).subscribe((resp) => {
        console.log(resp);
        window.location.reload();
      });
    }
  }
}
