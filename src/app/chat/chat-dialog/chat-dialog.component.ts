import { Component, OnInit } from "@angular/core";
import { ChatService, Message } from "../chat.service";
import "rxjs/add/operator/scan";
import { Observable } from "rxjs";

@Component({
  selector: "chat-dialog",
  templateUrl: "./chat-dialog.component.html",
  styleUrls: ["./chat-dialog.component.css"]
})
export class ChatDialogComponent implements OnInit {
  messages: Observable<Message[]>;
  formValue: string;

  constructor(public chat: ChatService) {}

  ngOnInit() {
    this.messages = this.chat.conversation
      .asObservable()
      .scan((acc, val) => acc.concat(val)
      );
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = "";
  }
}
