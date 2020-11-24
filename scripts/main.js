const db = firebase.firestore();

const ProjectForm = document.getElementById("project-form");
const ProjectContainer = document.getElementById("project-container");

let editStatus = false;
let id = '';

let allprojects = '';

async function uploadImage(file){
    const ref = firebase.storage().ref();
    const name = new Date() + "_" + file.name;
    const metadata = { contentType : file.type};
    const snapshot = await ref.child(name).put(file, metadata);
    const url = await snapshot.ref.getDownloadURL();

    return url;
}

const saveProject = (title, description, cat, fileurl) =>
    db.collection('Projects').doc().set({
            title,
            description,
            cat,
            fileurl
        });

const getProjects = () => db.collection('Projects').get();
const getProject = (id) => db.collection('Projects').doc(id).get();
const onGetProjects = (callback) => db.collection('Projects').onSnapshot(callback);
const deleteProject = id => db.collection('Projects').doc(id).delete();
const updateProject = (id, updatedProject) => db.collection('Projects').doc(id).update(updatedProject);

window.addEventListener('DOMContentLoaded', async (e) => {

    onGetProjects((querySnapshot) => {
        ProjectContainer.innerHTML= ``;
        querySnapshot.forEach((doc) => {

            const project = doc.data();
            project.id = doc.id;

            if(!project.fileurl){
                project.fileurl=""/*asignar url de imagen en storage default */
            }

            /*cambiar background por la imagen del proyecto */
            ProjectContainer.innerHTML += `<div class="card card-body mt-2 bg-prim project ${project.cat}">
                <h3>${project.title}</h3>
                <img src="${project.fileurl}" class="img-fluid">
            </div>`;

          const toDisplay = document.querySelectorAll('.project');
          allprojects = toDisplay;
        });
    });
});

/*-----------------*/

document.getElementById('close-modal').onclick = function () {
    editStatus = false;
    id = '';
    ProjectForm['btn-project-form'].innerText = "Subir Proyecto";
    ProjectForm.reset();
};

/*------------------------*/
document.getElementById('btn-todos').onclick = function () {
    document.querySelector('.btn-prim').classList.replace('.btn-prim', '.btn-sec');
    document.getElementById('btn-todos').classList.replace('.btn-sec', '.btn-prim');
    for(let i=0; i<allprojects.length; i++){
        allprojects[i].style.display = 'inline-block';   
    }
}

document.getElementById('btn-concept').onclick = function () {
    document.querySelector('.btn-prim').classList.replace('.btn-prim', '.btn-sec');
    document.getElementById('btn-concept').classList.replace('.btn-sec', '.btn-prim');
    for(let i=0; i<allprojects.length; i++){
        if(allprojects[i].classList.contains("Concept")){
            allprojects[i].style.display = 'inline-block';
        } else {
            allprojects[i].style.display = 'none';
        }
    }
}

document.getElementById('btn-ilustracion').onclick = function () {
    document.querySelector('.btn-prim').classList.replace('.btn-prim', '.btn-sec');
    document.getElementById('btn-ilustracion').classList.replace('.btn-sec', '.btn-prim');
    for(let i=0; i<allprojects.length; i++){
        if(allprojects[i].classList.contains("Digital")){
            allprojects[i].style.display = 'inline-block';
        } else {
            allprojects[i].style.display = 'none';
        }
    }
}

document.getElementById('btn-modelado').onclick = function () {
    document.querySelector('.btn-prim').classList.replace('.btn-prim', '.btn-sec');
    document.getElementById('btn-modelado').classList.replace('.btn-sec', '.btn-prim');
    for(let i=0; i<allprojects.length; i++){
        if(allprojects[i].classList.contains("3D")){
            allprojects[i].style.display = 'inline-block';
        } else {
            allprojects[i].style.display = 'none';
        }
    }
}

document.getElementById('btn-animacion').onclick = function () {
    document.querySelector('.btn-prim').classList.replace('.btn-prim', '.btn-sec');
    document.getElementById('btn-animacion').classList.replace('.btn-sec', '.btn-prim');
    for(let i=0; i<allprojects.length; i++){
        if(allprojects[i].classList.contains("Animación")){
            allprojects[i].style.display = 'inline-block';
        } else {
            allprojects[i].style.display = 'none';
        }
    }
}

document.getElementById('btn-tinta').onclick = function () {
    document.querySelector('.btn-prim').classList.replace('.btn-prim', '.btn-sec');
    document.getElementById('btn-tinta').classList.replace('.btn-sec', '.btn-prim');
    for(let i=0; i<allprojects.length; i++){
        if(allprojects[i].classList.contains("Tinta")){
            allprojects[i].style.display = 'inline-block';
        } else {
            allprojects[i].style.display = 'none';
        }
    }
}

/* ------------------ */

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    if($(window).width()<780){
        document.getElementById("navigation").style.width = "100%";
        document.getElementById("contenido-body").style.marginLeft = "100%";
    }
    else{
    document.getElementById("navigation").style.width = "18%";
    document.getElementById("contenido-body").style.marginLeft = "18%";
    }
    document.getElementById("navicon").style.opacity = "0%";
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("navigation").style.width = "0";
    document.getElementById("contenido-body").style.marginLeft = "0";
    document.getElementById("navicon").style.opacity = "100%";
  } 

/* Set the width of the side navigation to 250px */
function openNavOver() {
    if($(window).width()<780){
        document.getElementById("navigation").style.width = "100%";
    }
    else{
    document.getElementById("navigation").style.width = "18%";
    }
    document.getElementById("navicon").style.opacity = "0%";

}

/* Set the width of the side navigation to 0 */
function closeNavOver() {
  document.getElementById("navigation").style.width = "0";
  document.getElementById("navicon").style.opacity = "100%";
} 

/*Cerrar navbar al reajustar pantalla*/
$(window).on("orientationchange load resize", function () {
    document.getElementById("navigation").style.width = "0";
    document.getElementById("navicon").style.opacity = "100%";
});
/* ------------------------------------------------------------------------------------ */
/*Registro de Usuarios */
/*const singupForm = document.querySelector('#signupForm');
console.log("presubmit");*/


//singupForm.addEventListener('submit', (e) => {
function registrarUsuario(){
    const singupEmail = $('#signupEmail').val(); //document.querySelector('#signupEmail').value;
    const singupPassword = $('#signupPassword').val(); // document.querySelector('#signupPassword').value;
    const admin = false;

    authF
        .createUserWithEmailAndPassword(singupEmail, singupPassword)
        .then(function(result) {
            captureUID(result.user);
            document.getElementById("signupForm").reset();
            $('#signupModal').modal('hide');
        })

    /*authF
        .createUserWithEmailAndPassword(signupEmail, signupPassword)
        .then(userCredential => {
            singupForm.reset();
            $('signupModal').modal('hide');
        })*/
}

function captureUID(user) {
    var usuario = {
        email: user.email,
        admin: false,
    }
    firebase.database().ref("users/" + user.uid).update(usuario);
}

/*Inicio de Sesión */
/*const singinForm = document.querySelector('#signinForm');

singinForm.addEventListener('submit', (e) => {
    e.preventDefault();*/

function LogIn() {

    let singinEmail = $('#signinEmail').val(); // document.querySelector('#signinEmail').value;
    let singinPassword = $('#signinPassword').val(); // document.querySelector('#signinPassword').value;

    authF
        .signInWithEmailAndPassword(singinEmail, singinPassword)
        .then(userCredential => {
            $('#signinModal').modal('hide');
            document.getElementById("signinForm").reset();
        })
}

/*Cerrar Sesión */
/*const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
    e.preventDefault();*/
function LogOut(){

    authF.signOut().then(() => {
        document.querySelector('.crud').style.display="none";
    })
}

/*Autenticar admin */
authF.onAuthStateChanged(async(user) => {
    if(user){
        firebase.database().ref("users/" + user.uid).once("value").then(function(snapshot){
            var persona = snapshot.val();

            document.getElementById("login").style.display="none";
            document.getElementById("register").style.display="none";
            document.getElementById("logout").style.display="block";

            if(persona.admin){
                document.querySelector('.crud').style.display="block";
            }
            else{
                document.querySelector('.crud').style.display="none"; 
            }
        })
    }else{
        document.querySelector('.crud').style.display="none" ;
        document.getElementById("login").style.display="block";
        document.getElementById("register").style.display="block";
        document.getElementById("logout").style.display="none";
    }
    /*if(db.collection("Users").where("admin", "==", true).where("signupEmail", "==", authF.getInstance().getCurrentUser().getEmail())){
        document.getElementById('#crudnav').style.display;
    }*/
});