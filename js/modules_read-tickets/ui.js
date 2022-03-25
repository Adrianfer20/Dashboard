//Import
import {app, $id} from "../modules_globals/global-functions.js";
import * as UI from "../modules_globals/ui.js";


//Variabls Globals
const db = app.firestore();
let closeingModal;

//User Interfaces
const deleteModal = () => {
    const isModal = $id('modal'); 
    if(isModal){isModal.remove()}
}
const createPasswordContainer = passwords => {
    const $main = document.createElement('div');
    passwords.forEach(password => {
        $main.innerHTML += `
        <span class="bg-slate-400 rounded-full shadow-lg mx-1 md:mx-2 my-1 px-2 py-1">${password}</span>
        `;
    });
    return $main;
}
const cretatModal = text => {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'fixed left-6 right-6 bottom-5 md:max-w-5xl bg-indigo-200 h-98 p-4 rounded-md shadow-lg p-2 mx-auto';
    const p = document.createElement('p');
    p.textContent = text;

    const btnClose = document.createElement('button');
    btnClose.id = 'closeModal';
    btnClose.className = 'absolute -right-3 -top-3 h-7 w-7 bg-slate-800 bg-cover bg-no-repeat rounded-md shadow p-2';
    btnClose.style.backgroundImage = 'url(./svg/close_white_24dp.svg)';

    modal.appendChild(p);
    modal.appendChild(btnClose);
    return modal;
}
const showAndHideDetails = button => {
    if ($id(button.dataset.id).classList.contains('hidden')) {
        const isShow = document.querySelector('div[show=""]');
        if (isShow) {
            isShow.classList.add('hidden');
            isShow.removeAttribute('show');
            document.querySelector(`button[data-id="${isShow.id}"]`).textContent = 'Ver más';
        }

        button.textContent = 'Ver menos';
        $id(button.dataset.id).classList.remove('hidden');
        $id(button.dataset.id).setAttribute('show', '');
    }
    else {
        button.textContent = 'Ver más';
        $id(button.dataset.id).classList.add('hidden');
        $id(button.dataset.id).removeAttribute('show', '');
    }
}
const orderTickets = (arr)=> {
    arr.sort((a, b) => {if(a.order == b.order) {return 0;}if(a.order > b.order) {return -1;}return 1;});
    return arr;
}
const getCollectionTickets = async () => {
    const collection = await db.collection("tickets").get();
    let tickets = new Array;
    collection.forEach(doc => {tickets.push({id:doc.id, ...doc.data()})});
    const newOrderTickets = orderTickets(tickets);
    return newOrderTickets;
}
const showTicketList = async () => {
    const $frament = document.createDocumentFragment();
    const tickets = await getCollectionTickets();

    tickets.forEach((ticket) => {
        // doc.data() is never undefined for query doc snapshots
        const $fila = document.createElement('div');
        $fila.className = 'w-full grid grid-cols-12';
        $fila.innerHTML = `
        <div class="col-span-4 sm:col-span-3 text-sm text-slate-900 px-6 py-3 whitespace-nowrap">
                    <span>${ticket.acount}</span> ticket
                  </div>
                  <div class="col-span-4 sm:col-span-4 text-sm text-slate-900 px-6 py-3 whitespace-nowrap">
                  ${ticket.date}
                  </div>
                  <div class="col-span-4 sm:col-span-3 text-sm text-slate-900 px-6 py-3 whitespace-nowrap"><span
                      class="flex items-center justify-center text-xs leading-5 font-semibold uppercase rounded-full bg-green-100 text-green-800 px-2">
                      ${ticket.status}
                    </span></div>
                  <div
                    class="col-span-12 sm:col-span-2 flex items-center justify-center text-sm text-slate-900 px-6 py-3 whitespace-nowrap">
                    <button data-id='${ticket.id}' class="text-indigo-600 hover:text-indigo-900 text-center">Ver más</button>
                  </div>

                  <div id="${ticket.id}" class="col-span-12 bg-slate-100 px-6 py-3 hidden whitespace-nowrap">
                    <div class="flex items-center justify-between">
                      <span class="uppercase">Perfil de <strong>${ticket.profile}</strong></span>
                      <ul class="flex items-center">
                        <button data-print="${ticket.id}" style="background-image: url('./svg/print_white_24dp.svg');" class="h-8 w-8 bg-center bg-no-repeat mx-2"></button>
                          
                        <button data-terminal="${ticket.id}" style="background-image: url('./svg/terminal_white_24dp.svg');" class="h-8 w-8 bg-center bg-no-repeat mx-2"></button>
                      </ul>
                    </div>
                    <div class='col-span-12 flex flex-wrap items-center justify-around py-2'>
                    ${createPasswordContainer(ticket.password).innerHTML}
                    </div>
                  </div>
        `;
        $frament.appendChild($fila)
    });

    const $datashett = $id('datasheet');
    $datashett.innerHTML = '';
    $datashett.appendChild($frament);
    UI.deleteSpinner();
}
const showModal = text => {
    deleteModal()
    const modal = cretatModal(text);
    document.querySelector('body').appendChild(modal);

    closeingModal = setTimeout(() => {
        deleteModal()
    }, 6000);
}

//functions
const printPDF = async id => {
    console.log(id);
    var docRef = db.collection("tickets").doc(id);
    docRef.get().then((doc) => {
        if (doc.exists) {
            const $frament = document.createDocumentFragment();
            const $print = $id('print');
            $print.style.width = '793px';
            $print.innerHTML = `<h2 class="col-span-7 text-center pt-2">${doc.data().date}</h2>`;

            doc.data().password.forEach(password => {
                const $div = document.createElement('div');
                $div.className = 'col-span-1 text-sm text-center p-1';
                $div.innerHTML = `
                <h4><strong>${doc.data().title}</strong></h4>
                <h4>Codigo <span>${password}</span></h4>
                <h5>Valido por <span>${doc.data().profile}</span></h5>
            `;
                $frament.appendChild($div);
            });
            $print.appendChild($frament);
            setTimeout(() => {
                const screenPrint = window;
                screenPrint.document.title = doc.data().acount + ' tickets - ' + doc.data().date;
                screenPrint.print();
            }, 1000);
        } else {
            // doc.data() will be undefined in this case
            console.log("No hay tal documento!");
        }
    }).catch((error) => {
        console.log("Error al obtener el documento:", error);
    });
}

const  copyCMD = async id => {
    var docRef = db.collection("tickets").doc(id);
    docRef.get().then((doc) => {
        if (doc.exists) {
            const $textarea = $id('textarea');
            $textarea.textContent = '/ip hotspot user \n';
            doc.data().password.forEach(password => {
                $textarea.textContent += `add name="${password}" server="${doc.data().server}" profile="${doc.data().profile}" limit-uptime="${doc.data().uptime}" \n`;
            });

            var content = document.getElementById('textarea').textContent;
            navigator.clipboard.writeText(content)
                .then(() => {
                    showModal('Se ah copiado el codigo de la terminal mikrotik en el portapapeles sadisfactoriamente!')
                })
                .catch(err => {
                    console.log('Something went wrong', err);
                })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error al obterner el documento:", error);
    });

}

export {createPasswordContainer, showAndHideDetails, showTicketList,showModal, deleteModal, printPDF, copyCMD}