import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.css']
})
export class ErrorBoxComponent implements OnInit {

  @Input() message: string;
  @Output() close=new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose(){
    this.close.emit();
  }

}
