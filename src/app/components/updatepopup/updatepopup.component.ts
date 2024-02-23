import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css'],
})
export class UpdatepopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<UpdatepopupComponent>
  ) {}

  editdata: any;
  ngOnInit(): void {
    this.authService.getAllRole().subscribe((res) => {
      this.roleList = res;
    });

    if (this.data.usercode != null && this.data.usercode != '') {
      this.authService.getByCode(this.data.usercode).subscribe((res) => {
        this.editdata = res;
        this.registerForm.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          password: this.editdata.password,
          email: this.editdata.email,
          gender: this.editdata.gender,
          role: this.editdata.role,
          isactive: this.editdata.isactive,
        });
      });
    }
  }

  roleList: any;

  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
  });

  updateUser() {
    if (this.registerForm.valid) {
      this.authService
        .updateUser(this.registerForm.value.id, this.registerForm.value)
        .subscribe((res) => {
          this.toastr.success('Updated successfully');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please Select Role');
    }
  }
}
