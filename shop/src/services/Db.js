export default {
     items : localStorage.items ? JSON.parse(localStorage.items) : [ 
        {id:1666439275441, category:"Loisirs", name:"Pull Gonflable", price:44, image: "http://placeimg.com/101/101/people", quantity:1},{id:1666439275442, category:"Loisirs", name:"Bretelles rigides", price:24, image: "http://placeimg.com/102/102/people",quantity:1},
        {id:1666439275443, category:"Loisirs", name:"Slip en crochet", price:13.5, image: "http://placeimg.com/103/103/people",quantity:1}
      ],
    saveItems () {
         localStorage.items = JSON.stringify(this.items);
     },
    getItems () {
        return this.items;
    }
 };