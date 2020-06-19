import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { SocketService } from 'src/app/_services/socket.service';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'src/app/_entities/message';
import { User } from 'src/app/_entities/user';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  /* @Input() friendsList = new Set<User>(); */

  serverUrl = "http://localhost:8080/" + "socket";
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  stompClient;
  form: FormGroup;
  userForm: FormGroup;
  messages: Message[] = [];

  from: string = this.tokenStorageService.getUser().username;
  to: string = "";

  constructor(private socketService: SocketService,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    })
    this.userForm = new FormGroup({
      fromId: new FormControl(null, [Validators.required]),
      toId: new FormControl(null)
    })

    this.initializeWebSocketConnection();
  }

  sendMessageUsingSocket(myMessage: any) {

    let message: Message = { message: myMessage.value, fromId: this.from, toId: this.to };
    this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));

    myMessage.value = '';

  }

  sendMessageUsingRest() {
    if (this.form.valid) {
      let message: Message = { message: this.form.value.message, fromId: this.from, toId: this.to };
      this.socketService.post(message).subscribe(res => {
        console.log(res);
      })
    }
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.isLoaded = true;
      that.openGlobalSocket()
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe("/socket-publisher", (message) => {
      this.handleResult(message);
    });
  }

  openSocket() {
    /* if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/socket-publisher/" + this.userForm.value.fromId, (message) => {
        this.handleResult(message);
      });
    } */

    console.log(this.tokenStorageService.getUser().username);

    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/socket-publisher/" + this.tokenStorageService.getUser().username, (message) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message) {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      console.log(messageResult);
      this.messages.push(messageResult);
      this.toastr.success("New message received", null, {
        'timeOut': 3000
      });
    }
  }

}
