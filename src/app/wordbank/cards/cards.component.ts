import {Component, inject, OnInit} from '@angular/core';
import {BackLinkComponent} from "../../back-link/back-link.component";
import {NgIcon} from "@ng-icons/core";
import {Card} from "../../models";
import {ApiService} from "../../api.service";
import {ActivatedRoute} from "@angular/router";
import {concatMap} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    BackLinkComponent,
    NgIcon,
    NgIf
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit{
  private readonly ApiService = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  showNewCard = true;
  cardsList: Card[] = [];

  ngOnInit(): void {
    this.route.params.pipe(concatMap(params => this.ApiService.getCards(params['id']))).subscribe(cards => this.cardsList = cards);
  }

}
