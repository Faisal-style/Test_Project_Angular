import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
// import { menu } from '../model/menu';
import { SubSink } from 'subsink';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { DataRecipe, Ingredient, Menu } from '../model/menu';

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
  private subs = new SubSink();
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
    this.subs.sink = this.authservice
      .addtocart(id, payload.amount, payload.note)
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}
