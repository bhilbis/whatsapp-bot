import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../services/message.service';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';

registerLocaleData(localeId, 'id')

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.css'
})
export class InvitationComponent {
  weddingInvitations: any[] = [];

  constructor (private messageService: MessageService) {}

  async ngOnInit() {
    try {
      this.weddingInvitations = await this.messageService.getWeddingInvitations();
    } catch (error) {
      console.error('Error Loading data', error);
    }}

    transformTimeToDate(time: string): Date {
      const [hours, minutes, seconds] = time.split(':');
      const date = new Date();
      date.setHours(+hours, +minutes, +seconds);
      return date;
  }
}
