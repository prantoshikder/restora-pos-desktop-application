// let category = [
//   {
//     cat_id: 1,
//     name: "Chicken",
//   },
//   {
//     cat_id: 2,
//     name: "Pizza",
//   }
// ]

// let subcategory = [
//   {
//     id: 3,
//     name: "Chicken fry",
//     sub_cat_id: 1
//   },
//   {
//     id: 5,
//     name: "CABC",
//     sub_cat_id: 1
//   },

//   {
//     id: 4,
//     name: "xyz",
//     sub_cat_id: 2
//   },

// ]

// // let arr = []
// subcategory.map((s) => {
//   category.map((c, index) => {
//     if (c.cat_id === s.sub_cat_id) {
//       // arr.push(s)
//       category[index]['subcategory'] = []
//       category[index]['subcategory'].concat(s)

//     }
//   })
// })

// console.log(category[0].subcategory);
// // console.log(arr);


// let category = [
//   {
//     cat_id: 1,
//     name: 'Chicken',
//     // sub_cats: [],
//   },
//   {
//     cat_id: 2,
//     name: 'Pizza',
//     // sub_cats: [],
//   },
// ];

// let subcategory = [
//   {
//     id: 3,
//     name: 'Chicken fry',
//     sub_cat_id: 1,
//   },
//   {
//     id: 5,
//     name: 'CABC',
//     sub_cat_id: 1,
//   },
//   {
//     id: 6,
//     name: 'www',
//     sub_cat_id: 1,
//   },

//   {
//     id: 4,
//     name: 'xyz',
//     sub_cat_id: 2,
//   },
//   {
//     id: 4,
//     name: '1111',
//     sub_cat_id: 2,
//   },
// ];

// subcategory.map((s) => {
//   category.map((c) => {
//     if (c.cat_id === s.sub_cat_id) {
//       let sub_cat = {
//         id: s.id,
//         name: s.name,
//       };
//       if (Array.isArray(c.subCategories)) {
//         c.subCategories.push(sub_cat);
//       }
//       else {
//         c.subCategories = [{ ...sub_cat }];
//       }
//     }
//   });
// });

// console.log(category);


var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 10000, "foo");
});

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});
