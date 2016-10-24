import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes';

  constructor(
    private http: Http
  ) {}

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()  // Por defecto Http.get devuelve un Observable
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }

  /* Se va a utilizar un nuevo getHeroes() para el cliente HTTP ;)
  getHeroes(): Promise<Hero[]> {
    // Resolvemos la promesa y enviamos el array tal cual de objetos HEROES
    return Promise.resolve(HEROES);
  }*/

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

  getHero(id: Number): Promise<Hero> {
    // GetHeroes devuelve una promesa con un array de heroes
    // El metodo find es un metodo de los array JS. Encuentra el primer elemento
    // que coincida con la expresion booleana (creo)
    return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
  }
}
