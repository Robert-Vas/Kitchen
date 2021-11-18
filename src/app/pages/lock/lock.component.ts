import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.scss']
})
export class LockComponent implements OnInit {
  year = new Date().getFullYear();
  lockForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router) {
    this.lockForm = this.fb.group({
      pwd: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  onUnLock() {
    this.router.navigateByUrl('/pages/dashboard');
  }

}
