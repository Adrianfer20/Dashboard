//Imports
import {$id, deleteSpinner, showSpinner} from "../modules_globals/ui.js"
import {app,creatPassword,getDate} from "../modules_globals/global-functions.js";

//Variabls Globals
const db = app.firestore();

const maxOrder = async () =>{
    const collection = await db.collection("tickets").get();
    let order = new Array;
    collection.forEach(doc => {order.push(doc.data().order)});
    const maxOrder = Math.max(...order);
    return 1 + maxOrder;
}

//User Interface
const setHero = (title,description) => {
    const $title = $id('title-hero');
    $title.textContent = title;
    const $description = $id('description-hero');
    $description.textContent = description;
} 

const setInput = status => {
    if(status){
        const $btn = $id('btn_save-title'); 
        $btn.classList.replace('bg-slate-300','bg-indigo-600');
        $btn.classList.replace('border-slate-300','border-indigo-600');
        $btn.parentElement.classList.replace('border-slate-300', 'border-indigo-600');
    }else{
        const $btn = $id('btn_save-title'); 
        $btn.classList.replace('bg-indigo-600','bg-slate-300');
        $btn.classList.replace('border-indigo-600','border-slate-300');
        $btn.parentElement.classList.replace('border-indigo-600','border-slate-300');
    }
}


const creatInputTitle = () => {
    const $div = document.createElement('div');
    $div.className = 'mt-8 px-4';
    $div.innerHTML = `
    <div class="flex items-center justify-between border-b-2 border-slate-300 text-xl p-2 mb-4">
          <!-- <h4 class="text-indigo-600 font-semibold uppercase">Empezar</h4> -->
          <input type="text" placeholder="Ingresar aqui..." class="w-full bg-transparent text-indigo-600 font-semibold p-1 focus:outline-none">
          <button id="btn_save-title" class="h-8 w-8 bg-slate-300 border-2 border-slate-300 bg-center bg-no-repeat rounded-full transform rotate-180" style="background-image: url(./svg/chevron_left_white_24dp.svg"></button>
        </div>`;
        return $div;
}
const creatOptionsServer = () => {
    const $div = document.createElement('div');
    $div.className = 'mt-8 px-4';
    $div.innerHTML = `
    <div class="flex items-center justify-between border-b-2 border-indigo-600 text-xl p-2 mb-4">
            <div class="flex flex-wrap items-center justify-center w-full sm:w-auto relative text-left text-lg sm:mr-4" id="main-options">
                <h4 class="inline-flex justify-center uppercase pl-4 py-2">Opciones disponibles:</h4>
                <select class="bg-slote-50 font-medium text-gray-700 focus:outline-none cursor-pointer" id="options" name="server" selected=""><option class="block text-gray-700 hover:bg-slate-900 hover:text-white transition duration-300 ease-in-out px-4 py-2" value="Wifi Por Hora" id="Wifi Por Hora">Wifi Por Hora</option><option class="block text-gray-700 hover:bg-slate-900 hover:text-white transition duration-300 ease-in-out px-4 py-2" value="Default" id="Default">Default</option></select></div>
            <button id="btn_save-server" class="h-8 w-8 bg-indigo-600 border-2 border-indigo-600 bg-center bg-no-repeat rounded-full transform rotate-180" style="background-image: url(./svg/chevron_left_white_24dp.svg"></button>
        </div>`;
        return $div;
}
const creatTimeProfile = () => {
    const $div = document.createElement('div');
    $div.className = 'mt-8 px-4';
    $div.innerHTML = `
    <div class="flex items-center justify-between border-b-2 border-indigo-600 text-xl p-2 mb-4">
    <div class="flex flex-wrap items-center justify-center w-full sm:w-auto relative text-left text-lg sm:mr-4" id="main-options">
        <h4 class="inline-flex justify-center uppercase pl-4 py-2">Opciones disponibles:</h4>
        <select class="bg-slote-50 font-medium text-gray-700 focus:outline-none cursor-pointer" id="options" name="time" selected="">
        <option class="block text-gray-700 hover:bg-slate-900 hover:text-white transition duration-300 ease-in-out px-4 py-2" value="01:00:00" id="01:00:00">1hr</option>
        </select>
    </div>
            <button id="btn_save-time-profile" class="h-8 w-8 bg-indigo-600 border-2 border-indigo-600 bg-center bg-no-repeat rounded-full transform rotate-180" style="background-image: url(./svg/chevron_left_white_24dp.svg"></button>
        </div>`;
        return $div;
}
const creatAcount = () => {
    const $div = document.createElement('div');
    $div.className = 'mt-8 px-4';
    $div.innerHTML = `
    <div class="flex items-center justify-between border-b-2 border-indigo-600 text-xl p-2 mb-4">
        <div class="flex flex-wrap items-center justify-center w-full sm:w-auto relative text-left text-lg sm:mr-4" id="main-options">
            <h4 class="inline-flex justify-center uppercase pl-4 py-2">Opciones disponibles:</h4>
            <select class="bg-slote-50 font-medium text-gray-700 focus:outline-none cursor-pointer" id="options" name="amount" selected="">
            <option class="block text-gray-700 hover:bg-slate-900 hover:text-white transition duration-300 ease-in-out px-4 py-2" value="98" id="98">98 tickets</option>
            </select>
        </div>
        <button id="btn_save-acount" class="h-8 w-8 bg-indigo-600 border-2 border-indigo-600 bg-center bg-no-repeat rounded-full transform rotate-180" style="background-image: url(./svg/chevron_left_white_24dp.svg"></button>
    </div>`;
        return $div;
}


const showInit = () => {
    deleteSpinner();
}
const showTitle = () => {
    setHero('Ingresar Titulo','El titulo que ingreses es el que mostrará al imprimir el ticket del servicio de internet; por ejemplo "Wifi Por Hora"');
    const $form = $id('form_creat-tickets');
    const $input = creatInputTitle();
    $form.innerHTML = '';
    $form.appendChild($input);
    document.querySelector('input').focus();
}

const showServer = () => {
    setHero('Sevidor mikrotik','Seleciona el nombre del servidor de Mikrotik; este es el que permite la conexion a internet de los usuario; por defecto es "Wifi Por Hora"');
    const $form = $id('form_creat-tickets');
    const $options = creatOptionsServer();
    $form.innerHTML = '';
    $form.appendChild($options);
}

const showTimeProfile = ()=> {
    setHero('tiempo del ticket','El tiempo selecionado es el limite de navegacion de los tickets creado bajo este tiempo estipulado.');
    const $form = $id('form_creat-tickets');
    const $options = creatTimeProfile();
    $form.innerHTML = '';
    $form.appendChild($options);
}

const showAcount = () => {
    setHero('cantidad de tickets','Ya existen varias cantidades de tickes prederteminada que entran en una pagina A4; solo debes de encargarte de selecionar una.');
    const $form = $id('form_creat-tickets');
    const $options = creatAcount();
    $form.innerHTML = '';
    $form.appendChild($options);
}

const showSaveSetting = async () => {
    setHero('Cargando...','Guardando configurarión.');
    $id('form_creat-tickets').remove();
    const title = localStorage.getItem('title');
    const server = localStorage.getItem('server');
    const uptime = localStorage.getItem('uptime');
    const profile = localStorage.getItem('profile');
    const acount = localStorage.getItem('acount');
    const passwords = await creatPassword(+acount);
    const order = await maxOrder();
    const date = getDate();

    // Add a new document with a generated id.
    db.collection("tickets").add({
        'title': title,
        'server': server,
        'uptime': uptime,
        'profile': profile,
        'acount': acount,
        'password': passwords.sort((a, b) =>  a - b),
            "order": order,
        'date': date,
        status: 'Sin Activar'
    })
        .then((docRef) => {
            localStorage.clear();
            window.location = `details-ticket.html`;
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}
export {setInput,showInit, showTitle, showServer, showTimeProfile, showAcount,showSaveSetting}