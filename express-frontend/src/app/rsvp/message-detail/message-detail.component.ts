import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-detail.component.html',
  styleUrl: './message-detail.component.css'
})
export class MessageDetailComponent {
  messages: any;
  senderNumber: string = '';

  constructor(private route: ActivatedRoute, private messageService: MessageService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.senderNumber = params.get('senderNumber') || '';
      if (this.senderNumber) {
        this.loadMessagesForSender(this.senderNumber)
      }
    });
  }

  async loadMessagesForSender(senderNumber: string) {
    try{
      const messages = await this.messageService.getMessages();
      this.messages = messages.filter(msg => msg.sender_number === senderNumber);
    } catch (error) {
      console.error('Error loading message detail', error);
    }
  }

}
