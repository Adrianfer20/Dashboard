//Imports
import * as UI from "./modules_read-tickets/ui.js";


//Events
document.querySelector('body').addEventListener('click', (e) => {
    const getAttributeData = e.target.dataset;
    if (!!(getAttributeData.id))
        return UI.showAndHideDetails(e.target);
    if (getAttributeData.print)
        return UI.printPDF(getAttributeData.print);

    if (getAttributeData.terminal)
        return UI.copyCMD(getAttributeData.terminal);

    if(e.target.id = 'closeModal')
        return UI.deleteModal();
    
})


window.addEventListener('DOMContentLoaded', async (e) => {
    UI.showTicketList();
})