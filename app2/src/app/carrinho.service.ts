import { Injectable } from "@angular/core"

import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from "app/shared/oferta.model";

@Injectable()
export class CarrinhoService {

  public itens: ItemCarrinho[] = []

  public exibirItens(): ItemCarrinho[] {
    return this.itens
  }

  public incluirItem(oferta: Oferta): void {
    let itemCarrinho: ItemCarrinho = new ItemCarrinho(oferta.id, oferta.imagens[0], oferta.titulo, oferta.descricao_oferta, oferta.valor, 1)
    console.log(itemCarrinho)
    this.itens.push(itemCarrinho)
  }

}