import { Response } from '@angular/http';
// import { HEROES } from './mock-heroes';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
  ) {}

  private handleError(error: any): Promise<any> {
    console.error('An error ocurred', error);
    return Promise.reject(error.name || error);
  }

  getHeroes(): Promise<Hero[]> {
    return this.http
      .get(this.heroesUrl)
      .toPromise()  // Por defecto Http.get devuelve un Observable
      .then(response => response.json().data as Hero[])  // El as <tipo> no es mas que un casting.
      .catch(this.handleError);                          // Se hace asi pq <Hero[]>Response.json().data puede dar problemas con JSX
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

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;    // Hace una cadena interpolando variables ?? WTF !! :S

    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers}) // usa PUT stringifycando en JSON el heroe
      .toPromise()                                             // y pasandole los headers (objeto crado arriba)
      .then( () => hero)                                       // lo hace promesa y lo resuelve
      .catch(this.handleError);
  }

  create(name: String): Promise<Hero> {  // TODO: ¿y como mantiene el orden del ID?
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers}) // usamos POST
      .toPromise()                                                                 // la mecanica es la misma que antes
      .then(res => res.json().data)                                                // solo que la url es la 'normal'
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> { // EH ! devuelve una promesa VACIA !!!
    const url = `${this.heroesUrl}/${id}`;  // Genera la URL con el ID que le pasamos

    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then( () => null)      // Ojo !! aqui no hacemos nada con la promesa !
      .catch(this.handleError);
  }
}
