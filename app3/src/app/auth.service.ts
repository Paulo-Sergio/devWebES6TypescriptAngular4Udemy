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
      .catch((error: any) => {
        console.log(error)
        if (error.code == 'auth/email-already-in-use') {
          error.status = 400
          return error
        }
      })
  }

  public autenticar(email: string, senha: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, senha)
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
      .catch((error: any) => {
        console.log(error)
        if (error.code == 'auth/user-not-found' || error.code == 'auth/wrong-password') {
          error.status = 400
          return error
        }
      })
  }

  public isAutenticado(): boolean {
    if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
      this.token_id = localStorage.getItem('idToken')
    }

    if (this.token_id === undefined) {
      this.router.navigate(['/'])
    }

    return this.token_id !== undefined
  }

  public sair(): void {
    /**
     * Removendo id do firebase e o idToken armazenado no LocalStorage
     */
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('idToken')
        this.token_id = undefined
        this.router.navigate(['/'])
      })
  }

}