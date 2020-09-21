import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { SenderService } from '../sender.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  filename: string = '';

  constructor(private senderService: SenderService, private clipboardService: ClipboardService, private router: Router) { }

  ngOnInit(): void {
  }

  initSession(){
    if(this.filename != ''){
      this.senderService.setFileName(this.filename);
      var url = this.senderService.generateSecretKey();
      this.clipboardService.copyFromContent(url);
      this.router.navigate(['/sender']);
    }
  }

}
