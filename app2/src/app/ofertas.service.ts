import { Http } from '@angular/http'
import { Injectable } from "@angular/core"

import { Oferta } from './shared/oferta.model'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class OfertasService {

  constructor(private http: Http) { }

  public getOfertas(): Promise<Array<Oferta>> {
    // efetua a requisicao http (convertendo de observable para promise)
    return this.http.get('http://localhost:3000/ofertas?destaque=true')
      .toPromise()
      .then((resposta: any) => resposta.json())
  }

  /*
  ** Exemplo de promisses(resolve,reject) | sem requisicao Http
  **
  public getOfertas2(): Promise<Array<Oferta>> {
    return new Promise((resolve, reject) => {
      // algum tipo de processamento que ao finalizar chama a função resolve ou reject
      let deu_certo = true
      if (deu_certo) {
        setTimeout(() => { resolve(this.ofertas) }, 3000)
      } else {
        reject({ codigo_erro: 404, mensagem: 'Não encontrado!!' })
      }
    })
      .then((ofertas: Array<Oferta>) => {
        // fazer alguma tratativa
        console.log('primeiro then')
        return ofertas
      })
      .then((ofertas: Array<Oferta>) => {
        // fazer uma outra tratativa
        console.log('segundo then')
        return new Promise((resolve2, reject2) => {
          setTimeout(() => { resolve2(ofertas) }, 3000)
        })
      })
      .then((ofertas: Array<Oferta>) => {
        console.log('terceiro then executado apos 3 segundos pq estava aguardando uma promisse')
        return ofertas
      })
  }
    */

}