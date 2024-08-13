import { Injectable } from '@angular/core';
import axios from 'axios';
import { promises } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:3000/api';

  async getMessages(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/messages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  async getWeddingInvitations(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/wedding-invitations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching wedding invitations:', error);
      throw error;
    }
  }


  // constructor() { }
}
