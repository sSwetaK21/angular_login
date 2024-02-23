import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'dashLogin';
  showFiller = false;
  isMenurequired = false;
  isadminUser = false;
  constructor(private router: Router, private authservice: AuthService) {}

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isMenurequired = false;
    } else {
      this.isMenurequired = true;
    }

    if (this.authservice.getUserRole() === 'admin') {
      this.isadminUser = true;
    } else {
      this.isadminUser = false;
    }
  }
}
