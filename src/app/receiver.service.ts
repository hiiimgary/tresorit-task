import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { listenerCount } from 'process';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Message } from './model/message.model';


@Injectable({
  providedIn: 'root'
})
export class ReceiverService implements OnInit {
  constructor(private socket: Socket) { }
  key1: string;
  key2: string;
  filename: string;
  message: string;
  ngOnInit(){
  }

  addKeys(key: string){
    this.key1 = key.slice(0, 16);
    this.key2 = key.slice(16);
    console.log(this.key1);
    console.log(this.key2);
  }

  addFilename(name: string){
    this.filename = name;
  }

  decryptMessage(received:Message){
    var hash = CryptoJS.HmacSHA1(received.msg, this.key2);

    //if the computed hash equals to the received hash, then the message wasnt altered, we can continue
    if(hash == received.hash){
      var decrypted = CryptoJS.AES.decrypt(received.msg, this.key1, {
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
      });
      var original = decrypted.toString(CryptoJS.enc.Utf8);

      //TODO: implement line break
      
      return original;
    }
  }
}
