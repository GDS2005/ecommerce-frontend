import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  mode!: 'add' | 'modify';
  userForm!: FormGroup;
  id!: String;

  constructor(private service: UserService, private route: ActivatedRoute, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.initializeForm();
    this.route.params.subscribe(params => {
      if (params['id']){
      this.mode = 'modify';
      const userId = params['id'];
      if (userId) {
        console.log("ID:", userId)
        this.service.getUserById(localStorage.getItem('access_token'), userId).subscribe(user => {
          if (user) {
            console.log(user)
            this.userForm.patchValue(user); // Populate form with user data
          } else {
            console.error('User not found');
          }
        });
      }
    }
    else{
      this.mode = 'add';
    }
    });
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      isEmailVerified: ['', [Validators.required]],
      id: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.mode === "modify"){
      const id = this.userForm.value.id;
      const userData: any = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      password: this.userForm.value.password
      };
      this.service.updateUser(localStorage.getItem('access_token'),id , userData)
      .subscribe(response => {
          console.log('User updated successfully:', response);
        }, error => {
          console.error('Error updating user:', error);
        });
      }
    else{
      const userData: any = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        role: this.userForm.value.role
      };
      this.service.createUser(localStorage.getItem('access_token'), userData)
      .subscribe(response => {
          console.log('User created successfully:', response);
        }, error => {
          console.error('Error creating:', error);
        });
    }
  }
    
}
