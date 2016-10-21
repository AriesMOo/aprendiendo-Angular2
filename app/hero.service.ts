import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from '../app/mock-heroes';

@Injectable()
export class HeroService {

  getHeroes(): Promise<Hero[]> {
    // Resolvemos la promesa y enviamos el array tal cual de objetos HEROES
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    // Patron encadenadmiento metodos (cada metodo devuelve el propio objeto
    // con 'return this') y asi se puede volver a llamar a otro metodo de la
    // misma clase una y otra vez)
    //
    // Las Promesas tienen la siguiente forma (simplificada):
    // new Promise<tipo>().then().catch()
    return new Promise<Hero[]>( resolve =>
        setTimeout(resolve, 2000) )
      .then( () => this.getHeroes() )
      .catch( (error) => console.log(error) );
  }
}
