import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('((?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'),
      ])
    ),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    gender: this.builder.control('male', Validators.required),
    role: this.builder.control(''),
    isactive: this.builder.control(false),
  });

  proceedRegistration() {
    if (this.registerForm.valid) {
      this.authService
        .procedRegister(this.registerForm.value)
        .subscribe((res) => {
          this.toastr.success(
            'Please contact Admin to enable Access',
            'Registration Successfully'
          );
          console.log('form');
          this.router.navigate(['/login']);
        });
    } else {
      this.toastr.warning('Please enter Valid data', 'Invalid Data');
    }
  }
}
