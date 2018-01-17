import { Http, Response } from '@angular/http'
import { Injectable } from "@angular/core"

import { Oferta } from './shared/oferta.model'
import { URL_API } from './app.api'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'

import { Observable } from "rxjs/Observable"

@Injectable()
export class OfertasService {

  constructor(private http: Http) { }

  public getOfertas(): Promise<Oferta[]> {
    // efetua a requisicao http (convertendo de observable para promise)
    return this.http.get(URL_API + '/ofertas?destaque=true')
      .toPromise()
      .then((resposta: Response) => resposta.json())
  }

  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
    return this.http.get(URL_API + '/ofertas?categoria=' + categoria)
      .toPromise()
      .then((respota: Response) => respota.json())
  }

  public getOfertaPorId(id: number): Promise<Oferta> {
    return this.http.get(URL_API + '/ofertas?id=' + id)
      .toPromise()
      .then((resposta: Response) => {
        return resposta.json()[0]
      })
  }

  public getComoUsarOfertaPorId(id: number): Promise<string> {
    return this.http.get(URL_API + '/como-usar?id=' + id)
      .toPromise()
      .then((resposta: Response) => {
        return resposta.json()[0].descricao
      })
  }

  public getOndeFicaPorId(id: number): Promise<string> {
    return this.http.get(URL_API + '/onde-fica?id=' + id)
      .toPromise()
      .then((resposta: Response) => {
        return resposta.json()[0].descricao
      })
  }

  public pesquisaOfertas(termo: string): Observable<Oferta[]> {
    return this.http.get(URL_API + '/ofertas?descricao_oferta_like=' + termo)
      .retry(10) // vai fazer 10 tentivas caso a conexao caia
      .map((resposta: Response) => { return resposta.json() })
  }

  /*
  ** Exemplo de promisses(resolve,reject) | sem requisicao Http
  **
  public getOfertas2(): Promise<Oferta[]> {
    return new Promise((resolve, reject) => {
      // algum tipo de processamento que ao finalizar chama a função resolve ou reject
      let deu_certo = true
      if (deu_certo) {
        setTimeout(() => { resolve(this.ofertas) }, 3000)
      } else {
        reject({ codigo_erro: 404, mensagem: 'Não encontrado!!' })
      }
    })
      .then((ofertas: Oferta[]) => {
        // fazer alguma tratativa
        console.log('primeiro then')
        return ofertas
      })
      .then((ofertas: Oferta[]) => {
        // fazer uma outra tratativa
        console.log('segundo then')
        return new Promise((resolve2, reject2) => {
          setTimeout(() => { resolve2(ofertas) }, 3000)
        })
      })
      .then((ofertas: Oferta[]) => {
        console.log('terceiro then executado apos 3 segundos pq estava aguardando uma promisse')
        return ofertas
      })
  }
    */

}