import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-deletealert',
  templateUrl: './deletealert.component.html',
  styleUrls: ['./deletealert.component.css']
})
export class DeletealertComponent implements OnInit {

  @Input() item:string|undefined

  // child to parent value pass @output()
  @Output() nobutton = new EventEmitter

  constructor() { }

  ngOnInit(): void {
  }

  // no button

  no(){
this.nobutton.emit()
  }

}
