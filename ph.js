const loaddata=()=>{
 fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
 .then(res=>res.json())
 .then(data=>displaycategories(data.categories))
 .catch(Error=>console.log(Error))
}
const removeactivebtn=()=>{
const buttons=document.getElementsByClassName("btn categorybtn")
for(const btn of buttons){
  btn.classList.remove('active')
}
}

const videobtn=(id)=>{
fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
 .then(res=>res.json())
 .then(data=>{
  const activebtn=document.getElementById(`btn-${id}`)
removeactivebtn();
 activebtn.classList.add('active')
  displayvideos(data.category)

})
 .catch(Error=>console.log(Error))
}

const displaycategories=(data)=>{
const categoriecontainer=document.getElementById('category')
for(const content of data){
    // console.log(content);
    const divcontainer=document.createElement('div')
    divcontainer.innerHTML=`
    <button id="btn-${content.category_id}" onclick="videobtn(${content.category_id})" class="btn categorybtn">${content.category} </button>
    `
    categoriecontainer.append(divcontainer);
}

}
const loadvideo=()=>{
 fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
 .then(res=>res.json())
 .then(result=> displayvideos(result.videos))
 .catch(Error=>console.log(Error))
}

const displayvideos=(video)=>{ 
  
const videocontainer=document.getElementById('videos')
videocontainer.innerHTML=''
if(video.length===0){
  videocontainer.innerHTML=`
  <div class="flex justify-center md:ml-52 lg:ml-100">
  <div class="flex items-center  gap-4 px-4" >
  <img  src="icon.png">
   <p class="whitespace-nowrap font-bold text-gray-700">No content here</p> 
  </div>
 
  </div>
  
  `
  return;
}
for(const content of video){
    // console.log(content);
    const card=document.createElement('div')
    card.classList='card card-compact'
    
    card.innerHTML=`
    <figure class="h-[200px] object-cover">
    <img class="h-full w-full"
    src=${content.thumbnail}
      alt="Shoes"/>
  </figure>
      <div class="px-0 py-2 flex gap-5">
     <div class="card-actions justify-end">
      <div> <img class="w-8 h-8 rounded-full" src=${content.authors[0].profile_picture}/> </div>
      <div>
     <h2 class="font-bold">${content.title} </h2>
     <div class="flex items-center gap-1"> <p class="text-gray-400 ">${content.authors[0].profile_name} </p>
      ${
     content.authors[0].verified==true ? '<img class="h-4 w-4" src="https://cdn-icons-png.flaticon.com/128/9195/9195920.png" >':''

     }
   </div>
      </div>
      </div>
     </div>
</div>
 `
   videocontainer.append(card);
}
}
loaddata();
loadvideo();
displayvideos();