import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { detail } from '../model/detail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  param!: any;
  alldata: detail[] = [];
  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.param = this.route.snapshot.params['id'];
    const Get_myData = gql`
      query {
        GetOneRecipes(id: "${this.param}") {
          id
          recipe_name
          status
          description
          image
          price
          remain_order
        }
      }
    `;
    console.log(this.param);
    this.apollo
      .watchQuery<any>({
        query: Get_myData,
      })
      .valueChanges.subscribe((response) => {
        console.log(response);
        if (response) {
          this.alldata = response.data.GetOneRecipes;
          console.log(this.alldata);
        }
      });
  }
}
