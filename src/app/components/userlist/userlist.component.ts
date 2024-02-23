import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent {
  constructor(private authservice: AuthService, private dialog: MatDialog) {
    this.loadUser();
  }

  displayedColumns: string[] = [
    'username',
    'name',
    'email',
    'status',
    'role',
    'action',
  ];

  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadUser() {
    this.authservice.getAll().subscribe((res) => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(code: any): void {
    const popup = this.dialog.open(UpdatepopupComponent, {
      width: '50%',

      data: {
        usercode: code,
      },
    });

    popup.afterClosed().subscribe((res) => {
      this.loadUser();
    });
  }
}
