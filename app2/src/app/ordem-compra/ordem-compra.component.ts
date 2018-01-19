import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {

  public endereco: string = ''
  public numero: string = ''
  public complemento: string = ''
  public formaPagamento: string = ''

  constructor() { }

  ngOnInit() {
  }

  public atualizaEndereco(endereco: string) {
    this.endereco = endereco
  }

  public atualizaNumero(numero: string) {
    this.numero = numero
  }

  public atualizaComplemento(complemento: string) {
    this.complemento = complemento
  }

  public atualizaFormaPagamento(formaPagamento: string) {
    this.formaPagamento = formaPagamento
    console.log(this.formaPagamento)
  }

}
