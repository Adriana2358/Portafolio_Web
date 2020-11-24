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
                <h6>${project.cat}</h6>
                <img src="${project.fileurl}" class="img-fluid">
                <p>${project.description}</p>
                <div class="row d-flex justify-content-around">
                    <button class="btn btn-card btn-edit" data-id="${project.id}"><span class="fas fa-edit list-group-item-link" aria-hidden="true"></span></button>  
                    <button class="btn btn-card btn-delete" data-id="${project.id}"><span class="fas fa-trash-alt list-group-item-link" aria-hidden="true"></span></button>          
                </div>
            </div>`;

          const btnDelete = document.querySelectorAll('.btn-delete');
          btnDelete.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                await deleteProject(e.target.dataset.id);
            });
          });

          const btnEdit = document.querySelectorAll('.btn-edit');
          btnEdit.forEach(btn => {
              btn.addEventListener('click', async (e) => {
                const doc = await getProject(e.target.dataset.id);
                const project = doc.data();

                editStatus = true;
                id= doc.id;
               
                $('#modal-add').modal('show');

                ProjectForm['project-title'].value = project.title;
                ProjectForm['project-cat'].value = project.cat;
                ProjectForm['project-description'].value = project.description;
                ProjectForm['btn-project-form'].innerText = "Actualizar";
              });
          });

          const toDisplay = document.querySelectorAll('.project');
          allprojects = toDisplay;
          console.log(toDisplay);
        });
    });
});

ProjectForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = ProjectForm['project-title'];
    const description = ProjectForm['project-description'];
    const cat = ProjectForm['project-cat'];
    const file = ProjectForm['project-img'].files[0];

    let fileurl = null;

    if(file){
        fileurl = await uploadImage(file);
    }

    if(!editStatus) {
        await saveProject(title.value, description.value, cat.value, fileurl);
    } else {
        if(fileurl){
            await updateProject(id, {
                title: title.value,
                description: description.value,
                cat: cat.value,
                fileurl /*equivalente a fileurl: fileurl*/
            });    
        } else {
            await updateProject(id, {
                title: title.value,
                description: description.value,
                cat: cat.value,
            }); 
        }
    

        editStatus = false;
        id = '';
        ProjectForm['btn-project-form'].innerText = "Subir Proyecto";
    }
    $('#modal-add').modal('hide');

   await getProjects();

    ProjectForm.reset()
    fileurl = null;
    title.focus();
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
    for(let i=0; i<allprojects.length; i++){
        allprojects[i].style.display = 'inline-block';   
    }
}

document.getElementById('btn-concept').onclick = function () {
    for(let i=0; i<allprojects.length; i++){
        if(allprojects[i].classList.contains("Concept")){
            allprojects[i].style.display = 'inline-block';
        } else {
            allprojects[i].style.display = 'none';
        }
    }
}

document.getElementById('btn-ilustracion').onclick = function () {
    for(let i=0; i<allprojects.length; i++){
        if(allprojects[i].classList.contains("Digital")){
            allprojects[i].style.display = 'inline-block';
        } else {
            allprojects[i].style.display = 'none';
        }
    }
}

document.getElementById('btn-modelado').onclick = function () {
    for(let i=0; i<allprojects.length; i++){
        if(allprojects[i].classList.contains("3D")){
            allprojects[i].style.display = 'inline-block';
        } else {
            allprojects[i].style.display = 'none';
        }
    }
}

document.getElementById('btn-animacion').onclick = function () {
    for(let i=0; i<allprojects.length; i++){
        if(allprojects[i].classList.contains("Animación")){
            allprojects[i].style.display = 'inline-block';
        } else {
            allprojects[i].style.display = 'none';
        }
    }
}

document.getElementById('btn-tinta').onclick = function () {
    for(let i=0; i<allprojects.length; i++){
        if(allprojects[i].classList.contains("Tinta")){
            allprojects[i].style.display = 'inline-block';
        } else {
            allprojects[i].style.display = 'none';
        }
    }
}

/*------------------ */

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