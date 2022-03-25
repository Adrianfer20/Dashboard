//Imports
import * as UI from "./modules_creat-tickets/ui.js";

//Variabls
const $id = selector => document.getElementById(selector);
const $container = document.getElementById('container');

//Events;
$container.addEventListener('click',(e) => {
    e.preventDefault();
    const id = e.target.id;
    if (id === 'btn-init'){
        UI.showTitle();
    }
    else if (id === 'btn_save-title'){
        const $input = document.querySelector('input'); 
        if($input.value === '') return
        localStorage.setItem('title', $input.value);
        UI.showServer()
    }
    else if (id === 'btn_save-server'){
        const $select = document.querySelector('select');
        localStorage.setItem('server', $select.value);
        UI.showTimeProfile()
    }
    else if (id === 'btn_save-time-profile'){
        const $select = document.querySelector('select');
        const $option = $id(`${$select.value}`);
        localStorage.setItem('uptime', $select.value);
        localStorage.setItem('profile', $option.textContent);
        UI.showAcount()
    }
    else if (id === 'btn_save-acount'){
        const $select = document.querySelector('select');
        localStorage.setItem('acount', $select.value);
        UI.showSaveSetting()
    }
})

$container.addEventListener('keyup', (e)=> {
    if (e.target.tagName === 'INPUT' && e.target.value != '') {
        UI.setInput(true);
    } else if (e.target.tagName === 'INPUT' && e.target.value == '') {
        UI.setInput(false);
    }
})

window.addEventListener('DOMContentLoaded', async (e) => {
        UI.showInit()
})
