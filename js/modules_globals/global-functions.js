// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8SK2mGkNe94GArg6e3PRL79i0Rfsb2Dw",
    authDomain: "gestor-de-tickets.firebaseapp.com",
    projectId: "gestor-de-tickets",
    storageBucket: "gestor-de-tickets.appspot.com",
    messagingSenderId: "957970651054",
    appId: "1:957970651054:web:233b254361606129a05a3f"
};
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();


//Get Element 
const $id = selector => document.getElementById(selector);
const getPasswords = async () => {
    const querySnapshot = await db.collection("tickets").get().then((querySnapshot) => querySnapshot);
    let passwordExits = new Array;
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        passwordExits = [...passwordExits,...doc.data().password]
    });
    return passwordExits;

}
//Creat Password;
const ramdon = () => Math.floor(Math.random() * 999999);

const verifyPassword = (newPasswords, passwordExits, password) => {
    if(newPasswords.includes(password) || passwordExits.includes(password) || password < 1000){
        verifyPassword(newPasswords,passwordExits, ramdon()) 
    }
    return password;
}
const creatPassword = async (acount) => {
    const passwordExits = await getPasswords();
    let newPasswords = new Array;

    for (let n = 0; n < acount; n++) {
        const password = verifyPassword(newPasswords,passwordExits, ramdon());
        newPasswords.push(password);
    }
    return newPasswords;
}

//Get Date;
const getDate = () => {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const fecha = month < 10? `${day}-0${month}-${year}`:`${day}-${month}-${year}`;
    
    return fecha;
}

//Exports
export {app, $id, creatPassword, getDate};