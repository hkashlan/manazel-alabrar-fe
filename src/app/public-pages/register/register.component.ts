import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../core/modules/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  token: boolean = true;
  loading: boolean = false;
  registerform = this.createform();
  phone_number: any;
  constructor(private fb: FormBuilder, private router: Router) {}

  createform() {
    return this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', [Validators.required]],
        phone_code: ['+963'],
        phone_iso_code: ['sy'],
        phone_number: ['957770047'],
        account_type: ['user'],
        firebase_token: ['token'],
        date_of_birth: ['1990/01/01'],
      },
      {
        // validators: [MatchPassword('password', 'password_confirmation')],
        asyncValidators: [],
        updateOn: 'change',
      }
    );
  }
  onSubmit() {
    this.loading = true;
    let body = {
      first_name: this.registerform.get('first_name')?.value,
      last_name: this.registerform.get('last_name')?.value,
      email: this.registerform.get('email')?.value,
      password: this.registerform.get('password')?.value,
      password_confirmation: this.registerform.get('password_confirmation')?.value,
      phone_code: this.registerform.get('phone_code')?.value,
      phone_iso_code: this.registerform.get('phone_iso_code')?.value,
      phone_number: this.registerform.get('phone_number')?.value,
      account_type: this.registerform.get('account_type')?.value,
      firebase_token: this.registerform.get('firebase_token')?.value,
      date_of_birth: this.registerform.get('date_of_birth')?.value,
    };
    // this.registerService.register(body).subscribe(
    //   (resp) => {
    //     const Toast = Swal.mixin({
    //       toast: true,
    //       position: 'top-end',
    //       showConfirmButton: false,
    //       timer: 3000,
    //       timerProgressBar: true,
    //       didOpen: (toast) => {
    //         toast.addEventListener('mouseenter', Swal.stopTimer);
    //         toast.addEventListener('mouseleave', Swal.resumeTimer);
    //       },
    //     });

    //     Toast.fire({
    //       icon: 'success',
    //       title: 'Registered successfully',
    //     });
    //     this.loading = false;
    //     this.router.navigate(['/']);
    //   },
    //   (error) => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Registeration not complete!',
    //       text: 'Please Try again',
    //     });
    //     this.loading = false;
    //   }
    // );
  }
  get firstname() {
    return this.registerform.get('name');
  }
  get email() {
    return this.registerform.get('email');
  }
  get password() {
    return this.registerform.get('password');
  }
  get confirmPassword() {
    return this.registerform.get('password_confirmation');
  }
}
