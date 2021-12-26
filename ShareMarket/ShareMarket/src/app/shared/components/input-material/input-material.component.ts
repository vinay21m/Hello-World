import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-input-material',
  templateUrl: './input-material.component.html',
  styleUrls: ['./input-material.component.scss']
})
export class InputMaterialComponent implements OnInit {
  @Input() inputName!: string;
  @Input() inputId!:string;
  @Input() labelTitle!:string;
  @Input() inputType!:string;
  @Input() inputValue!:any;
  @Input() inputPlaceholder!:string;
  @Input() isDisabled!:boolean;
  constructor() { }

  ngOnInit(): void {
 /*  this.inputContactType = 'text';
  this.inputId = 'contentTypeId';
  this.labelTitle = 'Content Type';
  this.inputType = 'text';
  this.inputValue = '';
  this.inputPlaceholder= 'Contact Type'; */
  }

 

}
