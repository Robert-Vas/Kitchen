import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {AuthService, LogModel, LogService, ModalService, UserModel, UsersService} from '../../shared';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import { UserRole } from 'src/app/shared/user-role';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  rForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe,
              private modalService: ModalService,
              private userService: UsersService,
              private logService: LogService,
              private authService: AuthService,
              private router: Router) {
    this.rForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  onSignup() {
    this.isLoading = true;
    const email = this.rForm.controls.email.value;
    const pwd = this.rForm.controls.pwd.value;
    const name = this.rForm.controls.name.value;
    this.authService.signUp(email, pwd, name).then(r => {
      if (r.user) {
        const log = new LogModel();
        log.userId = r.user.uid;
        log.device = 'Web Admin';
        log.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        forkJoin([this.authService.updateUser(r.user, UserRole.unapproved, name), this.logService.addLog(log)])
          .subscribe(results => {
            const user = new UserModel(r.user);
            user.displayName = name;
            this.authService.user = user;
            this.authService.isAuthenticated = true;
            this.isLoading = false;
            this.router.navigateByUrl('pages/dashboard');
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
