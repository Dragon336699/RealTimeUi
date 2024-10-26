import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Subject } from 'rxjs';
import { messageReq } from '../requestTypes/messageReq';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private readonly webSockeUrl = environment.webSocketUrl;
  private socket$!: WebSocket;
  private messageSubject: Subject<messageReq> = new Subject<messageReq>();
  public message$ = this.messageSubject.asObservable();

  constructor() { }

  connect(){
    if (!this.socket$ || this.socket$.readyState === WebSocket.CLOSED){
      this.socket$ = new WebSocket(this.webSockeUrl);

      this.socket$.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.messageSubject.next(data);
      }

      this.socket$.onclose = () => {

      }

      this.socket$.onerror = (error) => {
        
      };
    }

    return this.message$;
  }

  public sendMessage(message: string): void{
    if (this.socket$ && this.socket$.readyState === WebSocket.OPEN){
      this.socket$.send(JSON.stringify(message));
    }
  }

  public close(): void {
    if (this.socket$) {
      this.socket$.close();
    }
  }
}
