import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input('msg') msg: string;
  @Input('isSuccess') isSuccess: boolean;

  constructor() { }

  ngOnInit() {
  }

}
