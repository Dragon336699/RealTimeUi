import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { registerReq } from '../requestTypes/registerReq';
import { loginReq } from '../requestTypes/loginReq';
import { loginDetailDto } from '../dtos/loginDetail.dto';
import { UserDto } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = environment.apiUrl
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public register(registerInfor: registerReq){
    return this.httpClient.post(`${this.apiUrl}user/register`, registerInfor);
  }

  public login(loginInfor: loginReq) {
    return this.httpClient.post<loginDetailDto>(`${this.apiUrl}user/login`, loginInfor);
  }

  public getInforUser(token: string){
    return this.httpClient.get<UserDto>(`${this.apiUrl}user/infor`,{ params: { token }});
  }
}
