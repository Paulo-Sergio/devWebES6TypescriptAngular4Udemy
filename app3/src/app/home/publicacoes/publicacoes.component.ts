import { Component, OnInit } from '@angular/core';
import { BDService } from '../../bd.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string

  constructor(
    private bdService: BDService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email

      this.atualizarTimeline()
    })
  }

  public atualizarTimeline(): void {
    this.bdService.consultaPublicacoes(this.email)
  }

}
