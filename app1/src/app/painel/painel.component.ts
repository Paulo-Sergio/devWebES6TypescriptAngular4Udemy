import { Component, OnInit } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public instrucao: string = 'Traduza a frase:'
  public frases: Array<Frase> = FRASES
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0

  public tentativas: number = 3

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
    // console.log(this.resposta)
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtBr == this.resposta) {
      // trocar pergunta da rodada
      this.rodada++
      this.atualizaRodada()

      // barra de progresso
      this.progresso = this.progresso + (100 / this.frases.length)
    } else {
      // diminiur a variavel tentativas
      this.tentativas--;
      if (this.tentativas === -1) {
        alert('acabou as tentativas')
      }
    }
  }

  private atualizaRodada(): void {
    // define a frase da rodada com base em alguma lógica
    this.rodadaFrase = this.frases[this.rodada]

    // limpa resposta
    this.resposta = ''
  }

}