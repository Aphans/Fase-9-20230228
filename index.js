//Importamos las funciones desde firebase.js
import { 
        dameTalleres, 
        onDameTalleres, 
        anadeReserva,
        borraReserva,
        buscaDoc,
        actualizaReserva 
        } from "./firebase.js"

const formulario = document.getElementById("form-registro")
const lista = document.getElementById("lista-reservas")
const btnCancelar = document.getElementById("boton-cancelar")

//Creamos una variable global para saber si estamos Editando

let editando = false
let idglobal = ""


btnCancelar.addEventListener("click", () => {
    btnCancelar.style.visibility = "hidden"
    formulario["boton-grabar"].innerHTML="Salvar"
    editando = false
    formulario.reset()
})


// Cargamos el listado de talleres reservados nada más abrir la aplicación

window.addEventListener('DOMContentLoaded', async() => {
    onDameTalleres('talleres',(reservas) => { 
    let html = ""
       //Cargamos esta vez las reservas y estamos atentos a cualquier cambio 
    reservas.forEach( doc => {
        const {horas, profesor, taller} = doc.data()
        const id = doc.id //Aquí vamos a utilizar ya el id
        html += `<div>
                <h2>${taller}</h2>
                <p>${profesor}</p>
                <p>${horas}</p>
                <button class="btn-eliminar" data-id="${id}">Eliminar</button>
                <button class="btn-actualizar" data-id="${id}">Actualizar</button>
                </div>`                      
    })
    lista.innerHTML = html

    //Implementamos el eliminar

    const btnsEliminar = lista.querySelectorAll('.btn-eliminar')
    
    btnsEliminar
    .forEach(btn => btn
        .addEventListener('click', async (e)=>{
            //console.log(e.target.dataset.id) 
            await borraReserva('talleres',e.target.dataset.id)
         })
        ) //prueba a {target: {dataset:{id}}}
    
    const btnsActualizar = lista.querySelectorAll('.btn-actualizar')
    
    btnsActualizar
    .forEach(btn => btn
        .addEventListener('click',  async (e)=>{
            const doc = await buscaDoc('talleres',e.target.dataset.id)
            const { horas, taller, profesor } = doc.data()
            formulario['nom-profesor'].value = profesor
            formulario['num-horas'].value = horas
            formulario['nom-taller'].value = taller

            //Cambiamos el modo a Actualizar y pasamos el id para poder modificar el id adecuado
            editando = true
            idglobal = e.target.dataset.id
            btnCancelar.style.visibility = "visible"
            formulario["boton-grabar"].innerHTML="Actualizar"
            
        })
    )     
    }) //final onDameTalleres       
          
})

// Capturamos el submit del formulario

formulario.addEventListener("submit", (event) => {
     event.preventDefault()

    const profesor = formulario['nom-profesor'].value
    const taller = formulario['nom-taller'].value
    const horas = formulario['num-horas'].value
    //Actualizamos o grabamos dependiendo del estado de edición
    editando 
    ? actualizaReserva('talleres', idglobal, {profesor, taller, horas})
    : anadeReserva('talleres', {profesor,taller,horas})
    formulario.reset()
    editando = false 
    btnCancelar.style.visibility = "hidden"
    formulario["boton-grabar"].innerHTML="Salvar"    
})
