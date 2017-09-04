import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { OfertasService } from "../ofertas.service";
import { Oferta } from "../shared/oferta.model";

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Array<Oferta>>

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
  }

  public pesquisa(termoDaBusca: string): void {
    this.ofertas = this.ofertasService.pesquisaOferta(termoDaBusca)
    this.ofertas.subscribe(
      (ofertas: Array<Oferta>) => console.log(ofertas)
    )
  }

}