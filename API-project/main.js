const loadallphone=(condition,brandname) =>{

    // console.log(brandname);
    document.getElementById('spinner').style.display="none"
    fetch(`https://openapi.programming-hero.com/api/phones?search=${brandname?brandname:'iphone'}`)
    .then(res=>res.json())
    .then(data=>{
       const box=data.data;
       const phoneContainer=document.getElementById('phone-container')
       phoneContainer.innerHTML=""
        if(box.length===0){
          phoneContainer.innerHTML=`
         <div class="flex justify-center items-center h-full w-full">
    <h2 class="text-center text-red-700 text-3xl font-bold">
        No data found
    </h2>
</div>
          `
          document.getElementById('showallbtn').style.display='none'
          return ;
        }
        // console.log(data);
        if(condition){
            displayalldata(data.data)
            document.getElementById("showallbtn").style.display="none"

            }else{
        displayalldata(data.data.slice(0,6)).style.display='block'
            }
       
          }
    );


}
  
const searchdata=()=>{
    const searchtext=document.getElementById('searchtext').value;
   
    document.getElementById('spinner').style.display="block"
    setTimeout(function(){
        loadallphone(false,searchtext)
    },3000)
}
const displayalldata=(phones)=>{
   const phoneContainer=document.getElementById("phone-container")
   phones.forEach(phone => {
    const {brand,image,slug}=phone
    const div=document.createElement('div');
    div.innerHTML=`
    <div class="card m-2 lg:grid-cols-4 bg-base-100 w-96 shadow-sm">
  <figure class="px-10 pt-10">
    <img
      src="${image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions">
      <button  onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
    `
    phoneContainer.appendChild(div);
   });
}
const showall=()=>{
    loadallphone(true)
}

const phoneDetails=async(slugs)=>{
const res=await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`)
const data=await res.json()
// console.log(data.data);
const {brand,image,slug,mainFeatures}=data.data
const modalcontainer=document.getElementById('modal-container')
modalcontainer.innerHTML=`
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">${brand}</h3>
     <p class="py-4">${mainFeatures.memory}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
`



my_modal_1.showModal()
}
loadallphone(false,'iphone')