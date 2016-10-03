import { Component, Input } from '@angular/core';

import { Hero } from '../app/hero';

@Component({
  selector: 'my-hero-detail',
  template: `
              <div *ngIf="hero">
                <h2>{{hero.name}} details!</h2>

                <div *ngIf="hero">
                  <label>id: </label> {{hero.id}}
                </div>
                <div>
                  <label>name: </label>
                  <input [(ngModel)]="hero.name" placeholder="name">
                </div>
              </div>`
})
export class HeroDetailComponent {
  @Input()
  hero: Hero;
 }
