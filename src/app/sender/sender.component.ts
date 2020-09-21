import { Component, OnInit } from '@angular/core';
import { SenderService } from '../sender.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})
export class SenderComponent implements OnInit {
  button: string = '';
  message: string;
  filename: string = '';
  constructor(private senderService: SenderService, private clipboardService: ClipboardService) { }

  ngOnInit(): void {
    this.senderService.initSender();
    this.filename = this.senderService.getFileName();
  }

  type(){
    this.senderService.sendMessage(this.message);
  }

  copyKey(){
    this.clipboardService.copyFromContent(this.senderService.getLink());
  }


}
