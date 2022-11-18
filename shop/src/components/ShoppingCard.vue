<script setup>
import { computed, onMounted, ref } from "vue";
import Item from "./Item.vue";
import DB from "../services/Db";

const items = ref(DB.getItems());
const select = ref('');
let totalPrice = ref(0);
let deliveryChosen = ref(0);
let promoPrice = ref(0);
const code = ref('');

const deleteOneById = (id) => {
  items.value.splice(
    items.value.findIndex((item) => item.id == id),
    1
  );
  DB.saveItems();
};

 function countItem (){
  let value = 0;
  items.value.forEach(item => {
    return value +=Number(item.quantity);
  });
  return value;
}

function totPrice(){
  let price =0;
  items.value.forEach(item => {
    return price+= Number(item.quantity*item.price);
  });
  totalPrice.value=price;

}
function delivery(event){
  deliveryChosen.value = Number(event.target.value);
}
function changeQuantity(quantity,id){
  const index = items.value.findIndex(item => item.id ==id);
  items.value[index].quantity = Number(quantity);
  totPrice();
  DB.saveItems();
}
totPrice()
function priceTotal() {
  let price = totalPrice.value + deliveryChosen.value - promoPrice.value;
  return price;
  
}
function codePromo(event){
  if(!event.target.value) {
    return promoPrice.value = 0;
  }
  if(event.target.value === "kdo" || event.target.value ==="promo"){
  let initialPrice = totalPrice.value;
  if(deliveryChosen.value) {
    initialPrice += deliveryChosen.value;
  }
  promoPrice.value = initialPrice * 0.1;
}
}
</script>
<template>
    <div class="row">
      <div class="col-md-8 cart">
        <div class="title">
          <div class="row">
            <div class="col">
              <h4><b>Shopping Cart</b></h4>
            </div>
            <div id="count-item" class="col align-self-center text-right text-muted">
               <strong>{{countItem()}} </strong> items
            </div>
          </div>
        </div>
        <div class="list-product">
            <item
          v-for="item in items"
          :key="item.id"
          :item="item"
          @delete="deleteOneById"
          @update="changeQuantity"
        />
        </div>
       
        <div class="back-to-shop">
          <a href="#">&leftarrow;</a
          ><span class="text-muted">Back to shop</span>
        </div>
      </div>
      <div class="col-md-4 summary">
        <div>
          <h5><b>Summary</b></h5>
        </div>
        <hr />
        <div class="row">
          <div id="count-item" class="col" style="padding-left: 0"><strong>{{countItem()}}</strong> ITEMS</div>
          <div class="col text-right" id="sum">&euro; <span>{{totalPrice}}</span></div>
        </div>
        <form action="#">
          <p>SHIPPING</p>
          <select v-model="select" @change="delivery($event)">
            <option class="text-muted" value="0" disabled selected>
              Choose your delivery
            </option>
            <option class="text-muted" value="5">
              Standard-Delivery- &euro;5.00
            </option>
            <option class="text-muted" value="10">
              Express-Delivery- &euro;10.00
            </option>
          </select>
          <p>GIVE CODE [10% reduction]</p>
          <p>CODE PROMO: {{code}}</p>
          <input id="promo" type="text" placeholder="Your code here "  v-model="code" @keyup.enter="codePromo($event)"/>
        </form>
        <div
          class="row"
          style="border-top: 1px solid rgba(0, 0, 0, 0.1); padding: 2vh 0"
        >
          <div class="col">TOTAL PRICE</div>
          <div class="col text-right" id="price">&euro; <span>{{priceTotal()}}</span></div>
        </div>
        <button class="btn">CHECKOUT</button>
      </div>
    </div>
</template>