import { Component, OnInit } from '@angular/core';

import { OfertasService } from "../ofertas.service";
import { Oferta } from "../shared/oferta.model";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa // retorna Observable<Oferta[]>
      .debounceTime(1000) // executa ação do switchMap apos 1s
      .distinctUntilChanged() // verifica se a pesquisa é igual a anterior
      .switchMap((termoDaBusca: string) => {
        console.log('requisicao http para api')
        if (termoDaBusca.trim() === '') {
          // retornar observable de array ofertas vazio
          return Observable.of<Oferta[]>([])
        }
        return this.ofertasService.pesquisaOfertas(termoDaBusca)
      })
      .catch((err: any) => {
        console.log(err)
        return Observable.of<Oferta[]>([])
      })

    this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas))
  }

  public pesquisa(termoDaBusca: string): void {
    console.log('keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)

    /*this.ofertasService.pesquisaOfertas(termoDaBusca)
      .subscribe((ofertas: Oferta[]) => {
        console.log(ofertas)
      },
      (erro: any) => console.log('Erro status: ', erro.status),
      () => console.log('Fluxo de eventos completo!'))*/
  }

}