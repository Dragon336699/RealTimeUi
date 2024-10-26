import { AfterViewInit, Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { BaseComponent } from '../../../core/commonComponent/base.component';
import { ToastService } from '../../../core/services/toast.service';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { catchError, delay, filter, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { loginDetailDto } from '../../../core/dtos/loginDetail.dto';
import { UserDto } from '../../../core/dtos/user.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    BlockUIModule,
    ReactiveFormsModule
  ],
  providers: [
    ToastService,
    MessageService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements AfterViewInit {
  public formSubmitSubject = new Subject<void>();
  public formSubmit$ = this.formSubmitSubject.asObservable();
  public loginForm: FormGroup
  public blockedUi: boolean = false;
  private token!: string;

  constructor(
    private readonly messageService: MessageService,
    private toastService: ToastService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    super();
    this.loginForm = this.fb.group({
      email: [, Validators.required],
      password: [, Validators.required]
    })
  }

  ngAfterViewInit(): void {
    this.formSubmit$.pipe(
      filter(() => {
        if (this.loginForm.invalid) {
          this.toastService.fail("Vui lòng kiểm tra lại thông tin");
          return false;
        }
        return true;
      }),
      switchMap(() => {
        return this.userService.login({
          email : this.loginForm.value.email,
          password : this.loginForm.value.password,
        }).pipe(
          tap((loginVal : loginDetailDto) => {
            this.toastService.success(loginVal.message);
            localStorage.setItem("token",loginVal.token);
            this.token = loginVal.token;
            this.blockUi();
          }),
          delay(1000),
          switchMap(() => {
            return this.userService.getInforUser(this.token).pipe(
              tap((userInfor: UserDto) => {
                localStorage.setItem("userInfor", JSON.stringify(userInfor));
              })
            );
          }),
          tap(() => {
            window.location.href = '/Home';
          }),
          catchError((error) => {
            this.toastService.fail(error.error.message);
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
