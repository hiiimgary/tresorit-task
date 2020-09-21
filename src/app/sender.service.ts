import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as CryptoJS from 'crypto-js';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Message } from './model/message.model';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class SenderService {
  link: string = '';
  filename: string = '';
  key1: string = '';
  key2: string = '';
  constructor(private socket: Socket) { }

  initSender(){
    if(this.link == '' || this.key1 == '' || this.key2 == '' || this.filename == ''){
      if(sessionStorage.getItem('filename') != null){
        this.filename = sessionStorage.getItem('filename');
      }
      if(sessionStorage.getItem('link') != null){
        this.link = sessionStorage.getItem('link');
      }
      if(sessionStorage.getItem('key1') != null){
        this.key1 = sessionStorage.getItem('key1');
      }
      if(sessionStorage.getItem('key2') != null){
        this.key2 = sessionStorage.getItem('key2');
      }
    }
  }

  encryptMessage(message: string){
    return new Promise(resolve => {
      var cipher = CryptoJS.AES.encrypt(message, this.key1, {
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
      }).toString();
  
      var hmac = CryptoJS.HmacSHA1(cipher, this.key2).toString();
      var secure = <Message> { msg: cipher, hash: hmac, filename: this.filename};
      resolve(secure);
    });
  }

  sendMessage(message: string){
    this.encryptMessage(message).then(msg => {
      this.socket.emit('send-message', msg);
    })
  }

  setFileName(name: string){
    this.filename = name;
    sessionStorage.setItem('filename', this.filename);
    this.socket.emit('new-file', this.filename);
  }

  getFileName(){
    return this.filename;
  }

  getLink(){
    return this.link;
  }

  generateSecretKey(){
    this.key1 = CryptoJS.lib.WordArray.random(8).toString();
    this.key2 = CryptoJS.lib.WordArray.random(8).toString();
    this.link = 'http://localhost:4200/receiver?key=' + this.key1 + this.key2 + '&filename=' + this.filename;
    sessionStorage.setItem('link', this.link);
    sessionStorage.setItem('key1', this.key1);
    sessionStorage.setItem('key2', this.key2);
    return this.link;
  }

}
