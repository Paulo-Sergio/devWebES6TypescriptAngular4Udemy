import { Injectable } from "@angular/core"

import { ItemCarrinho } from './shared/item-carrinho.model'

@Injectable()
export class CarrinhoService {

  public itens: ItemCarrinho[] = []

}