import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { ProgressoService } from './progresso.service';

@Injectable()
export class BDService {

  constructor(private progressoService: ProgressoService) { }

  public publicar(publicacao: any): void {
    console.log('publicando...')
    console.log(publicacao)


    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((resposta: any) => {

        let nomeImagem = resposta.key

        firebase.storage().ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(firebase.storage.TaskEvent.STATE_CHANGED,
            // acompanhamento do processo de upload
            (snapshot: any) => {
              this.progressoService.status = 'andamento'
              this.progressoService.estado = snapshot
            }, (error) => {
              //console.log(error)
              this.progressoService.status = 'erro'
            }, () => {
              //console.log('upload completo')
              this.progressoService.status = 'concluido'
            }
          )

      })

  }

  public consultaPublicacoes(emailUsuario: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // consultar as publicações (database)
      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
        .once('value')
        .then((snapshot: any) => {
          console.log(snapshot.val())

          let publicacoes: any[] = []

          snapshot.forEach((childSnapshot: any) => {
            let publicacao = childSnapshot.val()

            // consultar a url da imagem (storage)
            firebase.storage().ref()
              .child(`imagens/${childSnapshot.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url_imagem = url

                // consultar o nome do usuario
                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .once('value')
                  .then((snapshot: any) => {
                    publicacao.nome_usuario = snapshot.val().nome_usuario

                    publicacoes.push(publicacao)
                  })
              })
          });

          resolve(publicacoes)
        })

    })

  }

}