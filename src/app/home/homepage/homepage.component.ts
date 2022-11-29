import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { menu } from '../model/menu';

const Get_myData = gql`
  query {
    GetAllRecipes {
      data_recipes {
        id
        recipe_name
        status
        description
        image
        price
        remain_order
      }
    }
  }
`;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  alldata: menu[] = [];
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: Get_myData,
      })
      .valueChanges.subscribe((response) => {
        console.log(response);
        if (response) {
          this.alldata = response.data.GetAllRecipes.data_recipes;
        }
      });
  }
}
