import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // estou pegando um instancia do component: app-publicacoes
  @ViewChild('publicacoes') public publicacoes: any

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  public sair(): void {
    this.authService.sair()
  }

  public atualizarTimeline():void {
    // executando um metodo interno de outro component, graças a instancia utilizando @ViewChild
    this.publicacoes.atualizarTimeline()
  }

}
