let menuVisible=!1;function mostrarOcultarMenu(){const nav=document.getElementById("nav");nav.classList.toggle("responsive");menuVisible=!menuVisible}
function closeMenu(){const nav=document.getElementById("nav");nav.classList.remove("responsive");menuVisible=!1}
window.onload=function(){ocultarModificar()
listarCanciones()};let listarCanciones=async()=>{const peticion=await fetch("https://apirestsongifyup.onrender.com/api/music/findAll",{method:'GET',headers:{'Accept':'application/json','Content-Type':'application/json',},});const canciones=await peticion.json()
let contenidoTabla="";for(const song of canciones){let contenidoFila=`<tr>
<td>${song.id}</td>
<td>${song.song}</td>
<td>${song.artist}</td>
<td>${song.gender}</td> 
<td>
  <i onClick="borrarCancion(${song.id})" class="material-icons button delete">Borrar</i>
  <i onClick="editarCancion(${song.id})" class="material-icons button edit">Editar</i>
</td>
</tr>`
contenidoTabla+=contenidoFila}
document.querySelector("#tables tbody").outerHTML=contenidoTabla}
let borrarCancion=async(id)=>{const peticion=await fetch("https://apirestsongifyup.onrender.com/api/music/delete/"+id,{method:'DELETE',headers:{'Accept':'application/json','Content-Type':'application/json',},});listarCanciones()}
let idEditar;let editarCancion=async(id)=>{idEditar=id;mostrarModificar();const peticion=await fetch("https://apirestsongifyup.onrender.com/api/music/find/"+id,{method:'GET',headers:{'Accept':'application/json','Content-Type':'application/json',},});const song=await peticion.json();document.getElementsByClassName("formbold-form-input")[0].value=song.song;document.getElementsByClassName("formbold-form-input")[1].value=song.artist;document.getElementsByClassName("formbold-form-input")[2].value=song.gender;let btnModificar=document.getElementById("btnModificar")}
btnModificar.addEventListener("click",evento=>{aplicarActualizacion(idEditar)})
let aplicarActualizacion=async(id)=>{let campos={};campos.id=id;campos.song=document.getElementById("song").value;campos.artist=document.getElementById("artist").value;campos.gender=document.getElementById("gender").value;const peticion=await fetch("https://apirestsongifyup.onrender.com/api/music/update/"+id,{method:'PUT',headers:{'Accept':'application/json','Content-Type':'application/json',},body:JSON.stringify(campos)});listarCanciones()}
function ocultarModificar(){let form=document.getElementById("form").style.visibility="hidden";document.getElementsByTagName("h1")[0].style.visibility="hidden"}
function mostrarModificar(){let form=document.getElementById("form");form.style.visibility="visible";document.getElementsByTagName("h1")[0].style.visibility="visible";form.scrollIntoView({behavior:"smooth"})}