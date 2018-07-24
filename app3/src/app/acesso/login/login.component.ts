import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public usuarioNaoEncontrado: boolean = false

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)]),
  })

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

  public autenticar(): void {
    console.log(this.formulario)

    if (this.formulario.status === 'INVALID') {
      this.formulario.get('email').markAsTouched()
      this.formulario.get('senha').markAsTouched()
      return
    }

    this.authService.autenticar(this.formulario.value.email, this.formulario.value.senha)
      .then((resp: any) => {
        console.log(resp.status)
        if (resp.status == 400) 
          this.usuarioNaoEncontrado = true
      })
  }

}
