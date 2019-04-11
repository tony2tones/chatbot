import { Component, OnInit } from "@angular/core";
import { ChatService, Message } from "../chat.service";
import { Observable } from "rxjs";
import "rxjs/add/operator/scan";
import {} from "@angular/forms";

@Component({
  selector: "chat-dialog",
  templateUrl: "./chat-dialog.component.html",
  styleUrls: ["./chat-dialog.component.css"]
})
export class ChatDialogComponent implements OnInit {
  title = "Angular Bot";
  messages: Observable<Message[]>;
  formValue: string;

  constructor(public chat: ChatService) {}

  ngOnInit() {
    this.messages = this.chat.conversation
      .asObservable()
      .scan((acc, val) => acc.concat(val));
  }

  sendMessage() {
    let value = this.formValue;
    if (value === undefined || value === '') {
    } else {   
      this.chat.converse(value);
      this.formValue = "";
    }
  }
}
