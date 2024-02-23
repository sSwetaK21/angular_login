import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  userData: any;

  loginForm = this.builder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      this.authService.getByCode(this.loginForm.value.username).subscribe(
        (res) => {
          this.userData = res;
          console.log(this.userData);
          if (this.userData) {
            if (this.userData.password === this.loginForm.value.password) {
              if (this.userData.isactive) {
                sessionStorage.setItem('username', this.userData.id);
                sessionStorage.setItem('role', this.userData.role);
                this.toastr.success('Logged In successfully');

                this.router.navigate(['/home']);
              } else {
                this.toastr.error('Please contact Admin', 'Inactive User');
              }
            } else {
              this.toastr.warning('Invalid Credentials');
            }
          } else {
            this.toastr.error(
              'Please Register First before attempting to login'
            );
            console.log('invalid values');
          }
        },
        (error) => {
          // Handle HTTP errors, like 404, if user tries to login without registering thisis shown
          this.toastr.error('Please Register First before attempting to login');
        }
      );
    } else {
      this.toastr.error('Please Enter Valid values');
    }
  }
}
