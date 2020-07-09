import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface User {
  uid: string;
  email: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut()
      .then(() => this.openSnackBar('Signed out'))
      .catch(() => this.openSnackBar('Error signing out'));
  }

  private updateUserData({ uid, displayName, email }: User) {
    const userReference: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    const data = {
      uid,
      displayName,
      email
    };

    this.afs.collection('users')
      .doc(data.uid)
      .ref
      .get().then((doc) => {
        if (doc.exists) {
          this.openSnackBar(`Signed in as ${data.displayName}`);
          return userReference.set(data, { merge: true });
        } else {
          this.openSnackBar('Invalid login');
        }
      }).catch((error) => {
        this.openSnackBar('Error logging in');
        console.log(error);
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }
}
