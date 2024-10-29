import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private readonly webSockeUrl = environment.webSocketUrl;
  private hubConnection!: signalR.HubConnection;
  private token: string | null = null;
  private userId: string | null = null;

  constructor() {
    if (typeof localStorage !== 'undefined'){
      this.token = localStorage.getItem("token");
    }
  }

  public connect(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.webSockeUrl, {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation:true,
        accessTokenFactory: () => { return this.token!},
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch(err => console.error("Error establishing connection: ", err));
  }

  public addReceiveMessageListener(): void {
    this.hubConnection.on("ReceiveMessage", (message: string) => {
      console.log("Receive Message from server:", message);
    });

    this.hubConnection.on("ReceivePrivateMessage", (message: string) => {
      console.log("Receive Message from another client:", message);
    });
  }

  public sendMessage (userId: string, message: string) : void {
    if (this.hubConnection) {
      this.hubConnection.invoke("SendMessage", userId, message);
    }
  }
}
