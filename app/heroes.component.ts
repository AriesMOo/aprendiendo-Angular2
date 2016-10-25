import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../app/hero';
import { HeroService } from '../app/hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero; // = new Hero(1, 'Windstorm');
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  /** Consigue un listado de heroes del servicio y los mete en un array */
  private getHeroes(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }

    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);  // Lo mete al array inicial de heroes
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        // Se elimina del array de heroes, generando uno nuevo filtrando los que no sean iguales al heroa a borrar
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }
}
