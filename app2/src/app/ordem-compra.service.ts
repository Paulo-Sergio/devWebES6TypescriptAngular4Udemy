import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Pedido } from "app/shared/pedido.model";
import { Observable } from "rxjs/Observable";
import { URL_API } from "app/app.api";

@Injectable()
export class OrdemCompraService {

    constructor(private http: Http) { }

    public efetivarCompra(pedido: Pedido): Observable<any> {
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')

        return this.http.post(
            `${URL_API}/pedidos`, 
            JSON.stringify(pedido),
            new RequestOptions({headers: headers})
        ).map((resposta: Response) => {
            console.log(resposta.json())
        })
    }
}