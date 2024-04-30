let tbody = document.querySelector("tbody");
let sortAtoZ = document.querySelector("#sort-a-z");
let sortZtoA = document.querySelector("#sort-z-a");
let sortMark = document.querySelector("#sort-mark");
let sortPass = document.querySelector("#sort-pass");
let sortClass = document.querySelector("#sort-class");
let sortGender = document.querySelector("#sort-gender");
let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#search");
let searchSubmit = document.querySelector("#submit");
let searchDiv = document.querySelector("#search-div");

let notFound = document.createElement("div");
notFound.innerHTML = `<p class="text-red-500 font-semibold text-xl"> Data Not Found !!!</p>`;
notFound.style.display = "none";
searchDiv.appendChild(notFound);

let students = [];

async function getData() {
  try {
    let res = await fetch(
      "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
    );
    let data = await res.json();
    students = data;
    loadData(students);
  } catch (error) {
    console.log(error);
  }
}

async function studentManagement() {
  await getData();
}

studentManagement();

function loadData(students) {
  tbody.innerHTML = "";
  students.map((student) => {
    tbody.innerHTML += `
    <tr class="bg-[#D9D9D9]">
                <td
                  class="px-2 py-2 border border-gray-400 max-w-max"
                >
                  ${student.id}
                </td>
                <td
                  class="px-2 py-2 border border-gray-400 max-w-max"
                >
                <div class="flex flex-row justify-start items-center">
                  <div class="mr-1">
                    <img src="${
                      student.img_src
                    }" class="rounded-full border-[1px] border-black w-8 h-8 object-center object-fit-cover " />
                  </div>
                  <div>
                    <p>${student.first_name} ${student.last_name}</p>
                  </div>
                </div>
                </td>
                <td
                  class="px-2 py-2 border border-gray-400 max-w-max"
                >
                  ${student.gender}
                </td>
                <td
                  class="px-2 py-2 border border-gray-400 max-w-max"
                >
                  ${student.class}
                </td>
                <td
                  class="px-2 py-2 border border-gray-400 max-w-max"
                >
                  ${student.marks}
                </td>
                <td
                  class="px-2 py-2 border border-gray-400 max-w-max"
                >
                  ${!student.passing ? "Fail" : "Pass"}
                </td>
                <td
                  class="px-2 py-2 border border-gray-400 max-w-max"
                >
                  ${student.email.trim()}
                </td>
              </tr>
    `;
  });
}

function aToZsort() {
  let data = [...students];
  data.sort((a, b) => (a.first_name > b.first_name ? 1 : -1));
  loadData(data);
}

function zToAsort() {
  let data = [...students];
  data.sort((a, b) => (a.first_name < b.first_name ? 1 : -1));
  loadData(data);
}

function markSort() {
  let data = [...students];
  data.sort((a, b) => (a.marks < b.marks ? 1 : -1));
  loadData(data);
}

function passSort() {
  let data = [...students];
  data = data.filter((student) => student.passing === true);
  loadData(data);
}

function classSort() {
  let data = [...students];
  data.sort((a, b) => (a.class > b.class ? 1 : -1));
  loadData(data);
}

function genderSort() {
  let data = [...students];
  data.sort((a, b) => (a.gender > b.gender ? 1 : -1));
  loadData(data);
}

function formSearch(e) {
  e.preventDefault();
  let data = [...students];
  let searchData = searchInput.value.toLowerCase();
  if (searchData !== "") {
    notFound.style.display = "none";
    data = data.filter((student) => {
      return (
        student.id === parseInt(searchData) ||
        student.first_name.toLowerCase().includes(searchData) ||
        student.last_name.toLowerCase().includes(searchData) ||
        (
          student.first_name.toLowerCase() +
          " " +
          student.last_name.toLowerCase()
        ).includes(searchData) ||
        student.email.toLowerCase().includes(searchData) ||
        student.class === parseInt(searchData) ||
        student.gender.toLowerCase() === searchData ||
        (student.passing ? "pass" : "fail").includes(searchData)
      );
    });
    loadData(data);
  } else {
    notFound.style.display = "block";
  }
}

sortAtoZ.addEventListener("click", aToZsort);

sortZtoA.addEventListener("click", zToAsort);

sortMark.addEventListener("click", markSort);

sortPass.addEventListener("click", passSort);

sortClass.addEventListener("click", classSort);

sortGender.addEventListener("click", genderSort);

searchForm.addEventListener("submit", formSearch);
