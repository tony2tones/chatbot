import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/scan'; 
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {  } from '@angular/forms'

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  title = 'Angular Bot';
  messages: Observable<Message[]>;
  formValue: string;

  constructor(public chat: ChatService,private fb: FormBuilder) { }

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable()
      .scan((acc, val) => acc.concat(val));
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

  form = this.fb.group ({
     messageInput: ['', Validators.required]
  });

  get messageInput() {
    return this.form.get('messageInput');
  }
}
