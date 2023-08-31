// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async(resolve) =>{
    //TODO: we will not hard code server URL here
 const response=await fetch(' http://localhost:8080/products');
 //TODO: Server will filter all deleted products
 const data=await response.json();
 resolve({data});
  }
  );
}
export function fetchProductByID(id) {
  return new Promise(async(resolve) =>{
    console.log(id);
    //TODO: we will not hard code server URL here
 const response=await fetch(' http://localhost:8080/products/'+id);
 const data=await response.json();
 resolve({data});
  }
  );
}
export function createProduct(product) {
  return new Promise(async(resolve) =>{
    //TODO: we will not hard code server URL here
 const response=await fetch(' http://localhost:8080/products/',{
  method:'POST',
  body:JSON.stringify(product),
  headers:{'content-type':'application/json'}
 });
 const data=await response.json();
 resolve({data});
  }
  );
}
export function fetchProductsByFilters(filter,sort,pagination) {
  //filter={"category":"smartphone"}
  //sort ={_sort:"price",order='desc'}
  //TODO : on server we will support multi values
  //pagination={_page:1,limit=10}_page=1&_limit=10
  //TODO: Server will filter the deleted products in case of non admin
  let querystring='';
  for(let key in filter){
    const categoryValues=filter[key];
    if(categoryValues.length>0){
      const lastCategoryValue=categoryValues[categoryValues.length-1]
      querystring+=`${key}=${lastCategoryValue}&`
    }
  }
  for(let key in sort){
    querystring+=`${key}=${sort[key]}&`
  }
  for(let key in pagination){
    querystring+=`${key}=${pagination[key]}&`
  }
  return new Promise(async(resolve) =>{
    //TODO: we will not hard code server URL here
 const response=await fetch(' http://localhost:8080/products?'+querystring);
 const data=await response.json();
 const totalItems=await response.headers.get('X-Total-Count');
 console.log(data);
 resolve({data:{products:data,totalItems:+totalItems}});
  }
  );
}
export function fetchCategories() {
  return new Promise(async(resolve) =>{
    //TODO: we will not hard code server URL here
 const response=await fetch(' http://localhost:8080/categories');
 const data=await response.json();
 resolve({data});
  }
  );
}
export function fetchBrands() {
  return new Promise(async(resolve) =>{
    //TODO: we will not hard code server URL here
 const response=await fetch(' http://localhost:8080/brands');
 const data=await response.json();
 resolve({data});
  }
  );
}
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    console.log('data',data);
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}