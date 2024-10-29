import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/commonComponent/base.component';
import { messageReq } from '../../../core/requestTypes/messageReq';
import { WebsocketService } from '../../../core/services/websocket.service';
import { takeUntil, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent extends BaseComponent implements AfterViewInit, OnInit {
  public message: messageReq[] = [];
  public messageValue: string = "";
  public userId!: string;

  constructor(
    private webSocketService: WebsocketService
  ) {
    super();
  }

  ngOnInit(): void {
      this.webSocketService.connect();
      this.webSocketService.addReceiveMessageListener();
  }

  ngAfterViewInit(): void {
    
  }

  sendMessage(){
    if (this.userId && this.messageValue) {
      this.webSocketService.sendMessage("3", this.messageValue);
    }
  }
}
