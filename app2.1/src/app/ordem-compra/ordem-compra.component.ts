import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { NgForm } from '@angular/forms';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  @ViewChild('formulario') public formulario: NgForm

  public idPedidoCompra: number
  public itensCarrinho: ItemCarrinho[]

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
    console.log('itens do carrinho...')
    console.log(this.itensCarrinho)
  }

  public confirmarCompra() {
    console.log(this.formulario)

    // apenas enviar o pedido se houver Item no carrinho
    if(this.carrinhoService.exibirItens().length === 0){
      alert('Você não selecionou nenhum item!')
      return
    }

    let pedido: Pedido = new Pedido(
      this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento,
      this.carrinhoService.exibirItens()
    )
    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe((idPedido: number) => {
        console.log('Pedido de numero: ' + idPedido)
        this.idPedidoCompra = idPedido
        this.carrinhoService.limparCarrinho()
      })
  }

  public getTotalCarrinho(): number {
    return this.carrinhoService.totalCarrinhoCompras()
  }

  public adicionar(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item)
  }

  public diminuir(item: ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item)
  }

}
