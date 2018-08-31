import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BDService } from '../../bd.service';
import * as firebase from 'firebase';
import { ProgressoService } from '../../progresso.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeline: EventEmitter<any> = new EventEmitter<any>()

  public email: string
  public imagem: any

  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null, [Validators.required, Validators.minLength(5)]),
  })

  constructor(
    private bdService: BDService,
    private progressoService: ProgressoService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {
    this.bdService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })

    let acompanhamentoUpload = Observable.interval(1500) // semelhando ao setTimeOut do javascript
    let continua = new Subject

    continua.next(true)

    acompanhamentoUpload
      .takeUntil(continua) // while (true)
      .subscribe(() => {
        this.progressoService.status
        this.progressoService.estado
        this.progressoPublicacao = 'andamento'

        this.porcentagemUpload = Math.round((this.progressoService.estado.bytesTransferred / this.progressoService.estado.totalBytes) * 100)

        if (this.progressoService.status === 'concluido') {
          this.progressoPublicacao = 'concluido'

          // emitir um evento do component parent (Home)
          this.atualizarTimeline.emit()

          continua.next(false)
        }
      })
  }

  public preparaImagemUpload(event: Event): void {
    console.log((<HTMLInputElement>event.target).files)
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
