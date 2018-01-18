import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'descricaoReduzidaPipe'
})
export class DescricaoReduzidaPipe implements PipeTransform {

  transform(value: string, arg1: number): string {
    if (value.length > arg1) {
      return value.substr(0, arg1) + '...'
    }

    return value
  }

}