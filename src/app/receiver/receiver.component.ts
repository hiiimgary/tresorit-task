import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Message } from '../model/message.model';
import { ReceiverService } from '../receiver.service';


@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent implements OnInit {
  message: string;
  key: string;
  filename: string;
  constructor(private receiverService: ReceiverService, private socket: Socket, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get querystrings
    this.key = this.route.snapshot.queryParamMap.get('key');
    this.filename = this.route.snapshot.queryParamMap.get('filename');

    //separate keys
    this.receiverService.addKeys(this.key);

    this.socket.emit('new-connection', this.filename);

    //get the file from the server with the specified filename
    this.socket.on('access-file', (message: Message) => {
      console.log(message);
      this.message = this.receiverService.decryptMessage(message);
    })

    
    this.socket.on('broadcast-message', (message: Message) => {
      if(message.filename == this.filename){
        this.message = this.receiverService.decryptMessage(message);
      }
    })
  }

}
