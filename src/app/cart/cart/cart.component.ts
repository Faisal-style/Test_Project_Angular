import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { gql } from 'apollo-angular';
import { Apollo } from 'apollo-angular';
import Swal from 'sweetalert2';

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
      total_price
    }
  }
`;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  alldata: any;
  orderId: any;
  totalprice: any;
  loading: boolean = false;
  constructor(private authService: AuthService, private apollo: Apollo) {}

  ngOnInit(): void {
    this.loading = true;
    this.apollo
      .watchQuery<any>({
        query: Get_myData,
      })
      .valueChanges.subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.alldata = response.data.GetOrder.menu;
            this.orderId = response.data.GetOrder.id;
            this.totalprice = response.data.GetOrder.total_price;
            console.log(this.alldata);
            console.log(this.orderId);
            console.log(this.totalprice);
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  deletecart(id: any) {
    console.log(id);
    this.authService.deletecart(id).subscribe((resp) => {
      console.log(resp);
    });
    window.location.reload();
  }

  ordernow(id: any) {
    // let isConfirm = confirm('Apakah sudah yakin dengan pesanan anda ? ');
    // if (isConfirm) {

    Swal.fire({
      title: 'Yakin dengan Pesananmu?',
      text: 'Yang telah dibeli tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Bayar!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        this.authService.ordernow(id).subscribe((resp) => {
          console.log(resp);
        });
        window.location.reload();
      }
    });
    // }
  }

  nullCart() {
    return this.alldata?.length ? false : true;
  }
}
