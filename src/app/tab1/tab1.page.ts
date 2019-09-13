import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { ProfilePage } from '../shared/profile/profile.page';
import { AuthService } from '../auth/auth.service';
import { FirestoreService, IChat, IUser } from '../shared/firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  message = '';
  uid: string;
  user: IUser;
  chat: Observable<IChat[]>;

  @ViewChild(IonContent, { static: true })
  content: IonContent;

  constructor(
    public modalController: ModalController,
    public auth: AuthService,
    public firestore: FirestoreService,
  ) {}

  async ngOnInit() {
    const user = await this.firestore.userInit(this.auth.getUserId());
    if (!user) {
      const modal = await this.modalController.create({
        component: ProfilePage,
      });
      await modal.present();
      modal.onWillDismiss().then(() => this.ionViewWillEnter());
    }
    this.chat = this.firestore.chatInit();
  }

  async ionViewWillEnter() {
    this.uid = this.auth.getUserId();
    this.user = await this.firestore.userInit(this.uid);
  }

  postMessage() {
    if (!this.user) {
      alert('プロフィール登録が必要です');
      return;
    }
    this.firestore.messageAdd({
      uid: this.uid,
      message: this.message,
      timestamp: Date.now(),
    });
    this.message = '';
    this.content.scrollToTop(100);
  }

  trackByFn(index, item) {
    return item.messageId;
  }
}
