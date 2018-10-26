import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message?: string;

  setMessage(message: string) {
    this.message = message;
  }
  clear() {
    delete this.message;
  }
}
