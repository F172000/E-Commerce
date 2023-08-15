// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async(resolve) =>{
    //TODO: we will not hard code server URL here
 const response=await fetch(' http://localhost:8080/products');
 const data=await response.json();
 resolve({data});
  }
  );
}
export function fetchProductsByFilters(filter,sort) {
  //filter={"category":"smartphone"}
  //sort ={_sort:"price",order='desc'}
  //TODO : on server we will support multi values
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
  return new Promise(async(resolve) =>{
    //TODO: we will not hard code server URL here
 const response=await fetch(' http://localhost:8080/products?'+querystring);
 const data=await response.json()
 console.log(data);
 resolve({data});
  }
  );
}
