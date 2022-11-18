<script setup>
import { ref, defineProps, defineEmits } from "vue";
import DB from "../services/Db";

const props = defineProps({
  item: Object,
});

const emits = defineEmits(["delete","update"]);

</script>

<template>
<div class="product row border-top border-bottom">
    <div class="row main align-items-center" data-id="{{item.id}}">
      <div class="col-2">
        <img
          class="img-fluid"
          v-bind:src="item.image"
        />
      </div>
      <div class="col">
        <div class="row text-muted">{{item.category}}</div>
        <div class="row">{{item.name}}</div>
      </div>
      <div class="col">
        <select v-model="item.quantity"
                @change="emits('update',item.quantity,item.id)">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div class="col" id="somme">&euro; <span>{{item.quantity*item.price}}</span></div>
      <div>
        <a href="#">
          <i class="destroy fa-solid fa-circle-xmark"  @click="emits('delete', item.id)"></i>
        </a>
      </div>
    </div>
    </div>
  </template>
