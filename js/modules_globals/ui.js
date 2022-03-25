const $id = selector => document.getElementById(selector);
const deleteSpinner = () => {
    const $container = document.getElementById('container');
    document.querySelector('#spinner').remove();
    if($container.classList.contains('hidden')){
        $container.classList.remove('hidden');
    }
}
const creatSpinner = () => {
    const main = document.createElement('main');
    main.id = 'spinner';
    main.className = 'fixed top-0 left-0 bottom-0 right-0 bg-slate-100 flex items-center justify-center';

    const spinner = document.createElement('div');
    spinner.className = 'spinner';

    main.appendChild(spinner);
    return main;
}

const showSpinner = () => {
    const spinner = creatSpinner();
    document.querySelector('body').appendChild(spinner);
}

export {$id, showSpinner,deleteSpinner}