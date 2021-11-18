import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {AuthService, LocalUserModel, LogModel, LogService, ModalService, UsersService} from '../../shared';
import {LocalStorage} from 'ngx-store';
import {combineLatest} from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {
  resetForm: FormGroup;
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
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {

  }

  onReset() {
    this.isLoading = true;
    const email = this.resetForm.controls.email.value;
    this.authService.resetPass(email).then(r => {
      this.isLoading = false;
      this.modalService.success('Please check your email to reset your password.');
    }).catch(err => {
      this.isLoading = false;
      this.modalService.error('Invalid email or password.');
    });
  }
}
