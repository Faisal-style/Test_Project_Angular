import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { DataRecipe } from '../model/menu';
import Swal from 'sweetalert2';

const Get_myData = gql`
  query {
    GetAllRecipes {
      data_recipes {
        id
        recipe_name
        ingredients {
          stock_used
        }
        status
        description
        image
        price
      }
    }
  }
`;

interface Payload {
  amount: number;
  note: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  addtocartform: FormGroup = this.initFormGroup();
  alldata: DataRecipe[] = [];
  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: Get_myData,
      })
      .valueChanges.subscribe((response) => {
        console.log(response);
        if (response) {
          this.alldata = response.data.GetAllRecipes.data_recipes;
          console.log(this.alldata);
        }
      });
  }
  initFormGroup() {
    return this.fb.group({
      amount: [''],
      note: [''],
    });
  }

  addtocart(id: any) {
    const payload: Payload = this.addtocartform.value;
    console.log(id);
    this.authservice.addtocart(id, payload.amount, payload.note).subscribe(
      (resp) => {
        console.log(resp);
        Swal.fire(
          'Good job!',
          'Your product has been added to cart',
          'success'
        );
      },
      (error) => {
        Swal.fire('Oops!', `${error.message}`, 'error');
        console.log(error.message);
      }
    );
  }
}
