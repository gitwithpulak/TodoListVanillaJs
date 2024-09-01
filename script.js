console.log("hello world");
console.log();
const addBtn = document.querySelector("#addBtn");
const inputElem = document.querySelector("#inputElem");

// addNote function
addBtn.addEventListener("click", () => {
  let notes = localStorage.getItem("notes");
  let blankArr = [];
  if (notes == null) {
    blankArr.push(inputElem.value);
    localStorage.setItem("notes", JSON.stringify(blankArr));
  } else {
    blankArr = [...JSON.parse(notes)];
    blankArr.push(inputElem.value);
    localStorage.setItem("notes", JSON.stringify(blankArr));
  }
  inputElem.value = "";
  showNote();
});

// shownote function
const showNote = () => {
  let notes = localStorage.getItem("notes");
  let snippt = "";
  if (notes) {
    let noteArr = JSON.parse(notes);
    noteArr.forEach((element, index) => {
      snippt += `<div id="${index}" class="noteCard"  style="background-color:#${Math.ceil(
        Math.random() * 100
      )}${Math.ceil(Math.random() * 100)}${Math.ceil(Math.random() * 100)}" >
          <p class="title" style="margin:0px"  >
            ${element?.length > 20 ? element?.slice(0, 30) + "..." : element}
          </p>
          <div  style="display: flex; align-items: center; justify-content: center; gap:0.8rem" >
                  <input
                  style="width: 80%;  padding: 3px; font-size: 0.8rem; display:none; border-radius:5px; border:none;outline:none "
                  type="text"
                  name=""
                  id="SubmitElem"
                />
                <button style="display:none" class="submitBtn"  >
                      <img class="btnImg" src="./media/save.png" alt="" />
                </button>
          </div>
          <div
            style="display: flex; align-items: center; justify-content: center; gap: 10px;"
            class=""
          >
            <button id="${index}" class="editBtn" >
                <img class="btnImg" src="./media/edit.png" alt="">
            </button>
            <button class="delBtn" onclick="delnote(${index})" >
                <img class="btnImg" src="./media/delete.png" alt="">
            </button>
          </div>
        </div>`;
    });
    document.querySelector("#noteContainer").innerHTML = snippt;
  } else {
    document.querySelector("#noteContainer").innerHTML =
      "<h2 style='color:white' >Noting is show here</h2>";
  }
};

showNote();

// delete note function
const delnote = (arg) => {
  let notes = localStorage.getItem("notes");
  if (notes) {
    let localData = JSON.parse(notes);
    localData.splice(arg, 1);
    localStorage.setItem("notes", JSON.stringify(localData));
  }
  showNote();
};

// set EventListener all edit button
let setAllEditBtn = () => {
  let allEditBtns = document.querySelectorAll(".editBtn");
  allEditBtns.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      let title =
        e.target.parentNode.parentNode.parentNode.children[0].innerText;
      let topParentNode = e.target.parentNode.parentNode.parentNode;
      topParentNode.children[0].style.display = "none";
      topParentNode.children[1].children[0].value = title;
      topParentNode.children[1].children[0].style.display = "block";
      topParentNode.children[1].children[1].style.display = "block";
    });
  });
};

setAllEditBtn();

// set EventListener all submit button
let setAllSubmitBtn = () => {
  let submitBtns = document.querySelectorAll(".submitBtn");
  submitBtns.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      let topParentNodeId = e.target.parentNode.parentNode.parentNode.id;
      let editValue = e.target.parentNode.parentNode.children[0].value;
      let notes = localStorage.getItem("notes");
      if (notes) {
        let fetchNote = JSON.parse(notes);
        fetchNote.splice(topParentNodeId, 1, editValue);
        localStorage.setItem("notes", JSON.stringify(fetchNote));
        showNote();
        setAllEditBtn();

        // recall the function for reset EventListener
        setAllSubmitBtn();
      }
    });
  });
};
setAllSubmitBtn();

// seacrh note function
let allNoteCards = document.querySelectorAll(".noteCard");
document.getElementById("serchInput").addEventListener("input", (e) => {
  allNoteCards.forEach((elem) => {
    if (!elem.children[0].innerText.includes(e.target.value)) {
      elem.style.display = "none";
    } else {
      elem.style.display = "flex";
    }
  });
});
