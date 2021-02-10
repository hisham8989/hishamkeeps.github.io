const addButton = document.querySelector("#add")

const updateLSData = ()=>{
    const textAreaData = document.querySelectorAll('textarea')
    const notes = [];

    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    })
    
    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote = (text='')=>{
    const note = document.createElement('div');
    note.classList.add('note');
    
    const htmlData = `
    <div class="operation">
    <button class="edit"><i class="far fa-edit fa-2x"></i></button>
    <button class="delete"><i class="fas fa-trash fa-2x"></i></button>
  </div>

  <div class="main ${text ? "":"hidden"}"></div>
  <textarea autofocus name="" id="" class="${text ? "hidden":""}" cols="40" rows="10" ></textarea>`
    note.insertAdjacentHTML('afterbegin',htmlData);



    // getting the references

    const editButton = note.querySelector('.edit');

    const delButton = note.querySelector('.delete');

    const mainDiv = note.querySelector('.main');

    const textArea = note.querySelector('textarea');
    // finish -referencing



    delButton.addEventListener('click',()=>{
        note.remove();
        updateLSData();
    })

    // toggle editing button

    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');

    })

    textArea.addEventListener('change',(event)=>{
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    })


    document.body.appendChild(note)

}
// getting data back from localStorage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){ notes.forEach((note)=>addNewNote(note))};


addButton.addEventListener('click',()=>addNewNote());
