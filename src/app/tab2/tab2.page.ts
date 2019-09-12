import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../shared/profile/profile.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public auth: AuthService,
    public modalController: ModalController
  ) {}

  async openProfile() {
    const modal = await this.modalController.create({
      component: ProfilePage,
    });
    modal.present();
  }

  signOut() {
    this.auth.authSignOut();
  }
}
