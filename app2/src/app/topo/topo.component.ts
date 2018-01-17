import { Component, OnInit } from '@angular/core';

import { OfertasService } from "../ofertas.service";
import { Oferta } from "../shared/oferta.model";
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  // public ofertas: Observable<Oferta[]>
  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa // retorna Oferta[]
      .switchMap((termo: string) => {
        console.log('requisicao http para api')
        return this.ofertasService.pesquisaOfertas(termo)
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