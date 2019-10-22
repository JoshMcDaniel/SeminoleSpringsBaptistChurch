import { Doctrine } from './doctrine.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-doctrine',
  templateUrl: './doctrine.component.html',
  styleUrls: ['./doctrine.component.scss']
})
export class DoctrineComponent implements OnInit {

  readonly doctrineURL = '../assets/doctrine.json'
  doctrine: Doctrine;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getData(this.doctrineURL).subscribe((result: Doctrine) => {
      this.doctrine = result;
    });
  }

}
