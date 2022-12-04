import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  addtocart(id: string, amount: number, note: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation {
            addCart(
              input: {
                recipe_id: "${id}"
                amount: ${amount}
                note: "${note}"
              }
            ) {
              id
              order_status
              order_date
              status
              total_price
            }
          }
        `,
      })
      .pipe(
        map((resp) => {
          this.datacart(resp.data);
          return resp;
        })
      );
  }

  ordernow(id: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation {
            OrderNow(id: "${id}") {
              menu {
                recipe_id {
                  recipe_name
                }
              }
              order_status
              order_date
            }
          }
        `,
      })
      .pipe(
        map((resp) => {
          this.datacart(resp.data);
          return resp;
        })
      );
  }

  deletecart(id: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation {
            deleteCart(id: "${id}") {
              id
              menu {
                recipe_id {
                  recipe_name
                }
              }
            }
          }
        `,
      })
      .pipe(
        map((resp) => {
          this.datacart(resp.data);
          return resp;
        })
      );
  }

  datacart(data: any) {
    console.log(data);
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
        mutation {
          Login(email: "${email}", password: "${password}") {
            token
          }
        }
      `,
      })
      .pipe(
        map((resp) => {
          this.userLogin(resp.data);
          return resp;
        })
      );
  }

  userLogin(data: any) {
    console.log(data);
    localStorage.setItem(
      environment.tokenKey,
      JSON.stringify(data.Login.token)
    );
  }

  logOut() {
    localStorage.removeItem(environment.tokenKey);
  }
}
