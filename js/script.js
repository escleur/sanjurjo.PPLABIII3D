import {crearTabla} from './tabla.js'
import Anuncio from "./anuncio.js"
import Anuncio_Mascota from "./anuncio_mascota.js"
import {obtenerAnuncio, mostrarAnuncio, onCambioId} from './frmcontroler.js'

// const btnTabla = document.getElementById('btnTabla');
// btnTabla.addEventListener('click', function(){
//     const divTabla = document.getElementById('divTabla');
//     divTabla.appendChild(crearTabla(listaPersonas));
// })


let lista;
let frm;
let proximoId;
let divTabla;

window.addEventListener('load', inicializarManejadores);

function inicializarManejadores(){
    lista = obtenerAnuncios();
    //console.log(listaPersonas);
    
    divTabla = document.getElementById('divTabla');
    
    actualizarTabla();
    frm = document.forms[0];
    proximoId = obtenerId();
    onCambioId(frm);
    frm.cancelar.addEventListener('click', e=>{
        frm.id.value = '';
        onCambioId(frm);
    })
    frm.addEventListener('submit', e=>{
        e.preventDefault();
        // console.log(frmPersona.nombre.value);
        // console.log(document.querySelector('#apellido').value);
        // console.log(document.getElementById("email").value);
        // console.log(frmPersona.gender.value);
        //console.log(e.submitter.id);
        //----------------Alta-----------------
        if(e.submitter.id == "alta"){
            const nuevoAnuncio = obtenerAnuncio(proximoId, frm);
            if(nuevoAnuncio){
                lista.push(nuevoAnuncio);
                proximoId++;
                guardarDatos();
                actualizarTabla();
                frm.reset();
            }

        }
        if(e.submitter.id == "modificar"){
            const nuevoAnuncio = obtenerAnuncio(Number(frm.id.value), frm);
            console.log(nuevoAnuncio);
            lista = lista.map(function(obj){
                if(obj.id == nuevoAnuncio.id){
                    //console.log(obj.id);
                    //console.log(nuevaPersona.id);
                    return nuevoAnuncio;
                }else{
                    return obj;
                }
            });
            guardarDatos();
            actualizarTabla();
            frm.reset();
            frm.id.value = '';
            onCambioId(frm);
        }
        if(e.submitter.id == "baja"){
            const id = Number(frm.id.value);
            //console.log(nuevaPersona);
            lista = lista.filter(function(obj){
                return obj.id != id;
            });
            guardarDatos();
            actualizarTabla();
            frm.reset();
            frm.id.value = '';
            onCambioId(frm);
        }
        
    })

}



function obtenerAnuncios(){
    return JSON.parse(localStorage.getItem('anuncio')) || [];
}

function obtenerId(){
    return JSON.parse(localStorage.getItem('nextId')) || 20000;
}



function guardarDatos(){
    localStorage.setItem('anuncio', JSON.stringify(lista));
    localStorage.setItem('nextId', proximoId);
}

function actualizarTabla(){
    console.log(divTabla);
    vaciarElemento(divTabla);
    insertarSpinner(divTabla);
    
    setTimeout(() => {
        
        vaciarElemento(divTabla);
        divTabla.appendChild(crearTabla(lista));
    }, 3000);
}

function vaciarElemento(elemento){
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
      }
}
function insertarSpinner(elemento){
    const span = document.createElement('span');
    span.className = 'spinner';
    elemento.appendChild(span);
}
