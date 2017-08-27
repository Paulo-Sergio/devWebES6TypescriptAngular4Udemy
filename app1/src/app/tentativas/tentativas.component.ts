import { Component, OnInit, Input } from '@angular/core';

import { Coracao } from '../shared/coracao.model'

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnInit {

  @Input() public tentativas: number

  constructor() {
    console.log(this.coracoes)
  }

  public coracoes: Array<Coracao> = [
    new Coracao(true),
    new Coracao(true),
    new Coracao(true)
  ]

  ngOnInit() {
    console.log('Tentativas recebidas do painel: ' + this.tentativas)
  }

}
