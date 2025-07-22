import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule,FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  doSearch(value:String){
    this.router.navigateByUrl(`search/${value}`);
  }

  

}
