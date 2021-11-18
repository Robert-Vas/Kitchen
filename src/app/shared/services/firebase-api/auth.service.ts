import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {User, auth} from 'firebase/app';
import UserCredential = firebase.auth.UserCredential;
import {SessionStorage} from 'ngx-store';
import {UserModel} from '../../model';
import {DatePipe} from '@angular/common';
import { UserRole } from '../../user-role';


@Injectable({providedIn: 'root'})
export class AuthService {
  @SessionStorage() user: UserModel;
  @SessionStorage() isAuthenticated = false;
  @SessionStorage() device = 'Web Admin';
  loginUrl = '/login';

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private datePipe: DatePipe) {

  }

  public updateUser(user: User, role: UserRole, userName?: string): Promise<void> {
    return this.afs.doc(`users/${user.uid}`).set({
      uid: user.uid,
      displayName: userName || user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      registerDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      lastDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      balance: 0,
      role: role
    })
      ;
  }

  signWithAnonymous() {
    return this.afAuth.auth.signInAnonymously()
      .then(credential => {
        return this.updateUser(credential.user, UserRole.admin);
      });
  }

  resetPass(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signWithEmail(email: string, password: string): Promise<UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string, userName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }


  githubLogin() {
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider())
      .then(credential => {
        return this.updateUser(credential.user, UserRole.admin);
      });
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => {
        return this.updateUser(credential.user, UserRole.admin);
      });
  }

  twitterLogin() {
    this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider())
      .then(credential => {
        return this.updateUser(credential.user, UserRole.admin);
      });
  }

  facebookLogin() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => {
        return this.updateUser(credential.user, UserRole.admin);
      });
  }
}
