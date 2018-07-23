import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Usuario } from "./acesso/usuario.model"
import * as firebase from 'firebase'

@Injectable()
export class AuthService {

  public token_id: string

  constructor(private router: Router) { }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    console.log('auth sevice')

    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resp: any) => {
        // remover atributo senha do obj usuario (não vou armazenar a senha)
        delete usuario.senha

        /** 
         * btoa() criptografia para base64
         * atob() descriptografia da base64
        */
        // registrando dados complementares do usuario no path email na base64
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario)
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }

  public autenticar(email: string, senha: string): void {
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((resp: any) => {
        console.log(resp)
        firebase.auth().currentUser.getIdToken()
          .then((idToken: string) => {
            this.token_id = idToken
            console.log(this.token_id)
            localStorage.setItem('idToken', idToken)
            this.router.navigate(['/home'])
          })
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }

  public isAutenticado(): boolean {
    if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
      this.token_id = localStorage.getItem('idToken')
    }
    return this.token_id !== undefined
  }

}