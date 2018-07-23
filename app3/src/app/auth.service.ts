import { Usuario } from "./acesso/usuario.model"
import * as firebase from 'firebase'

export class AuthService {

  public cadastrarUsuario(usuario: Usuario): void {
    console.log('auth sevice')

    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
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

}