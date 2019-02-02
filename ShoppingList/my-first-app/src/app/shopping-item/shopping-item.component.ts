import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { DataService } from '../data.service';
@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  providers: [DataService]
})
export class ShoppingItemComponent implements OnInit {
  shoppingItemList : Item[]=[];
  selectedItem: Item;
  toggleForm: boolean = false;
  constructor(private dataService: DataService) { }

  getItems(){
    this.dataService.getShoppingItems()
    .subscribe(items => {
      this.shoppingItemList = items;
      //console.log('data from dataservice : ' + this.shoppingItemList[0].itemName);
    });
  }

  addItem(form){
    let newItem: Item= {
      itemName : form.value.itemName,
      itemQuantity : form.value.itemQuantity,
      itemBought : false
    }
    this.dataService.addShoppingItem(newItem)
    .subscribe(item => {
      console.log(item);
      this.getItems();
    })
  }

  deleteItem(id){
    this.dataService.deleteShoppingItem(id)
    .subscribe(data => {
      if(data.n==1){
        console.log('Items deleted')
        this.getItems();
      }
    })
  }

  showEditForm(item){
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm;
  }

  editItem(form){
    let newItem: Item= {
      _id : this.selectedItem._id,
      itemName : form.value.itemName,
      itemQuantity : form.value.itemQuantity,
      itemBought : this.selectedItem.itemBought
    }
    this.dataService.updateShoppingItem(newItem)
    .subscribe(result =>{
      console.log('original item to be updated ' + result);
      this.getItems();
    });
    this.toggleForm = !this.toggleForm;
  }

  updateItemCheckbox(item){
    item.itemBought = !item.itemBought;
    this.dataService.updateShoppingItem(item)
    .subscribe(result =>{
      console.log('Item state updated');
      this.getItems();
    });
  }

  ngOnInit() {
    this.getItems();
  }

}
