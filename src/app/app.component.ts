import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthGuard } from './auth/auth.guard';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private cok = new BehaviorSubject<boolean>(false);
  title = 'apollo-client-learning';
  isLoggedIn$!: Observable<boolean>;
  constructor(
    private nav: AuthGuard,
    private authservice: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.isLoggedIn$ = this.nav.isLoggedIn;
  }
  logout() {
    this.authservice.logOut();
    this.router.navigate(['/login']);
    this.isLoggedIn$ = this.cok;
  }
}
