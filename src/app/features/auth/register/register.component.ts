import { AfterViewInit, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { BaseComponent } from '../../../core/commonComponent/base.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, delay, filter, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonModule,
    PasswordModule,
    InputTextModule,
    ReactiveFormsModule,
    BlockUIModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  providers:[
    MessageService,
    ToastService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent extends BaseComponent implements AfterViewInit{
    public registerForm: FormGroup;
    public formGroupSubmitSubject = new Subject<void>();
    public formGroup$ = this.formGroupSubmitSubject.asObservable();
    public blockedUi: boolean = false;

    constructor(
      private readonly fb : FormBuilder,
      private userService: UserService,
      private router: Router,
      private toastService: ToastService
    ) {
      super();
      this.registerForm = this.fb.group({
        firstName: [, Validators.required],
        lastName: [, Validators.required],
        email: [, Validators.required],
        password: [, Validators.required],
        confirmPassword: [, Validators.required]
      })
    }

    ngAfterViewInit(): void {
      this.formGroup$.pipe(
        filter(() => {
          if (this.registerForm.invalid){
            this.toastService.fail("Vui lòng điền đầy đủ thông tin");
            return false;
          } else if (this.registerForm.value.password != this.registerForm.value.confirmPassword){
            this.toastService.fail("Mật khẩu chưa khớp với nhau, vui lòng kiểm tra lại");
            return false;
          }
          return true;
        }),
        switchMap(() => {
          return this.userService.register({
            firstName: this.registerForm.value.firstName,
            lastName: this.registerForm.value.lastName,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
            confirmPassword: this.registerForm.value.confirmPassword
          }).pipe(
            tap(() => {
              this.toastService.success("Đăng ký thành công");
              this.blockUi();
            }),
            delay(1000),
            tap(() => {
              this.router.navigateByUrl('/Login')
            }),
            catchError((registerError) => {
              this.toastService.fail(registerError.error.message)
              return of();
            })
          )
        }),
        takeUntil(this.destroyed$)
      ).subscribe();
    }

    blockUi() {
      this.blockedUi = true;
      setTimeout(() => {
          this.blockedUi = false;
      }, 1000);
    }
}
