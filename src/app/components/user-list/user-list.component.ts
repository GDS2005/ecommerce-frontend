import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/services/user/user.service';
import { UserResults } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'role', 'isEmailVerified', 'actions'];
  users: MatTableDataSource<UserResults>;
  dataSource = new MatTableDataSource<any>();
  accessToken: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { 
    this.users = new MatTableDataSource<UserResults>([]);
  }

  ngOnInit(): void {
    const userData = this.userService.getUsers().subscribe((userData: any) => {
      this.dataSource.data = userData.results;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }
  
  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        window.location.reload(); 
      },
      (error) => {
        console.log(error)
      }
    );
  }
  
  modifyUser(userId: string) {
    this.router.navigate(['/edit-user', userId]);
  }
}
