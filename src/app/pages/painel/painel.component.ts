import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {

  activeItem: number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }



  setActive(index: number) {
    this.activeItem = index;
  }
}
