import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {AuthService, LocalUserModel, LogModel, LogService, ModalService, UsersService} from '../../shared';
import {LocalStorage} from 'ngx-store';
import {combineLatest} from 'rxjs';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/shared/user-role';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  @LocalStorage() remember = false;
  @LocalStorage() localUser: LocalUserModel;

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe,
              private modalService: ModalService,
              private userService: UsersService,
              private logService: LogService,
              private authService: AuthService,
              private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  ngOnInit() {
    if (this.remember) {
      if (this.localUser) {
        this.loginForm.get('email').setValue(this.localUser.email);
        this.loginForm.get('pwd').setValue(this.localUser.password);
      }
      this.loginForm.get('remember').setValue(this.remember);
    }
  }

  onLogin() {
    this.isLoading = true;
    const remember = this.loginForm.controls.remember.value;
    const email = this.loginForm.controls.email.value;
    const pwd = this.loginForm.controls.pwd.value;
    this.authService.signWithEmail(email, pwd).then(r => {
      if (r.user) {
        const log = new LogModel();
        log.userId = r.user.uid;
        log.device = this.authService.device;
        log.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        combineLatest([this.userService.getModel(r.user.uid), this.logService.addLog(log)]).subscribe(results => {
          this.authService.user = results[0];
          this.authService.isAuthenticated = true;
          if (remember) {
            this.remember = true;
            const local = new LocalUserModel();
            local.email = email;
            local.password = pwd;
            this.localUser = local;
          } else {
            this.remember = false;
            this.localUser = null;
          }
          this.isLoading = false;
          if (this.authService.user.role == UserRole.cook) {
            this.router.navigateByUrl('pages/order');
          } else if (this.authService.user.role == UserRole.admin) {
            this.router.navigateByUrl('pages/dashboard');
          } else {
            this.isLoading = false;
            this.modalService.warning('Unauthorized Account');
          }
        });
      } else {
        this.isLoading = false;
        this.modalService.warning('Invalid email or password.');
      }
    }).catch(err => {
      this.isLoading = false;
      this.modalService.error('Invalid email or password.');
    });
  }
}
