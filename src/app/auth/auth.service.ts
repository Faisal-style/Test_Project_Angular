import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

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

  //   getData(): Observable<any> {
  //     return this.apollo
  //       .query({
  //         query: gql`
  //           query {
  //             GetAllIngredients {
  //               data {
  //                 id
  //                 name
  //                 stock
  //                 status
  //               }
  //             }
  //           }
  //         `,
  //       })
  //       .pipe(
  //         map((resp) => {
  //           this.Data(resp.data);
  //           return resp;
  //         })
  //       );
  //   }

  //   Data(data: any) {
  //     console.log(data);
  //     localStorage.setItem(
  //       environment.tokenKey,
  //       JSON.stringify(data.Login.token)
  //     );
  //   }
}
