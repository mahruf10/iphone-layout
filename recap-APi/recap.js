
const showallprocess=(condition,text)=>{
    // console.log(text);
    document.getElementById('spinner').style.display='none'
    fetch(`https://openapi.programming-hero.com/api/phones?search=${text?text:'iphone'}`)
    .then(res=>res.json())
    .then(data=>{
    if(condition){
        showdisplay(data.data)
        document.getElementById("showallbtn").style.display="none"
    }
  else{
    showdisplay(data.data.slice(0,6));
     
  }
})
}

const showdisplay=(data)=>{
const phonedata=document.getElementById("phone-container")
data.forEach(element => {
    const{brand,slug,image}=element
   const div=document.createElement('div');
div.innerHTML=`

<div class="card m-2 mx-auto  p-5 w-100 bg-base-100 shadow-sm">
  <figure class="px-10 pt-10">
    <img
      src="${image}"
      alt="iphone"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions">
      <button class="btn btn-primary">More Details</button>
    </div>
  </div>
</div>

`
phonedata.appendChild(div); 
});

}
const handleshowmore=()=>{
   showallprocess(true)
}

const handlesearch=()=>{
    const text=document.getElementById('btn').value;
    document.getElementById("spinner").style.display="block"
setTimeout(function (){
    showallprocess(false,text)
},3000)
}

showallprocess(false)