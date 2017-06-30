import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-treeview',
	templateUrl: './treeview.component.html',
	styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {
	nodes =[{
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
}];
	constructor() { }

	ngOnInit() {
  }

}
