import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent {
  messages: any[] =[];
  filteredMessages: any[] = [];
  selectedSenderMessages: any[] = [];
  selectedSenderNumber: string = '';

  constructor (private messageService: MessageService, private router: Router) {}

  ngOnInit(): void {
  this.loadMessages();
  }

  async loadMessages() {
    try {
      const data = await this.messageService.getMessages();
      console.log('Fetched messages:', data);
      this.messages = Array.isArray(data) ? data : [];
      this.filterRSVPMessages();
    } catch (error) {
      console.error('Error Loading data', error);
    }
  }

  filterRSVPMessages() {
    this.filteredMessages = this.messages.filter((message) =>
      message.message.trim().toLowerCase() === 'rsvp'
    );
    console.log('Filtered messages:', this.filteredMessages);
  }

  showMessagesFromSender(senderNumber: string) {
    console.log('Messages before filtering:', this.messages);
    this.selectedSenderNumber = senderNumber;
    this.selectedSenderMessages = this.messages.filter(
      (message) => message.sender_number === senderNumber
    )
  }
  
  navigateToDetail(messageId: string) {
    this.router.navigate(['/message-detail', messageId]);
  }
}
