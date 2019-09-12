import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument,
  AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, concatMap } from 'rxjs/operators';

export interface IUser {
  displayName: string;
  photoDataUrl: string;
}

export interface IMessage {
  uid: string;
  message: string;
  timestamp: number;
}

export interface IChat extends IUser, IMessage {}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  userDoc: AngularFirestoreDocument<IUser>;
  messageCollection: AngularFirestoreCollection<IMessage>;
  userCollection: AngularFirestoreCollection<IUser>;

  constructor(public af: AngularFirestore) {
    this.messageCollection = this.af.collection <
      IMessage
      >('chat', ref => ref.orderBy('timestamp', 'desc'));
    this.userCollection = this.af.collection<IUser>('users');
  }

  messageAdd(message: IMessage) {
    return this.messageCollection.add(message);
  }

  chatInit(): Observable<IChat[]> {
    return this.messageCollection.valueChanges( {idField: 'messageId'} )
      .pipe(concatMap(async messages => {
        const users = await this.userCollection.valueChanges( {idField: 'uid'} )
          .pipe(first()).toPromise(Promise);
        return messages.map(message => {
          const user = users.find(u => u.uid === message.uid);
          return Object.assign(message, user);
        });
      }));
  }

  userInit(uid: string): Promise<IUser> {
    this.userDoc = this.af.doc<IUser>('users/'  + uid);
    return this.userDoc.valueChanges()
      .pipe(first())
      .toPromise(Promise);
  }

  userSet(user: IUser): Promise<void> {
    return this.userDoc.set(user);
  }
}
