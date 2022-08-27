// Subsciption

const email = document.getElementById("email");
const dob = document.getElementById("dob");

email.addEventListener("input", function(event) {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("This is not a valid  address!");
        email.reportValidity();
    } else {
        email.setCustomValidity("");
    }
});
// dob.addEventListener("input", (event) => {
//     let date = new Date();
//     let parts = dob.value.split('-');
//     let dobDate = new Date(parts[0], parts[1] - 1, parts[2]);
//     let difference = (date - dobDate) / (1000 * 60 * 60 * 24);
//     console.log(dobDate, date, difference)
//     if (!(difference >= 6574.5 && difference <= 20088.8)) {
//         dob.setCustomValidity("Age should be between 18 and 55!");
//         dob.reportValidity();
//     } else {
//         dob.setCustomValidity("");
//     }
// });

let userEntries = [];

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

const displayEntries = () => {
    const savedUserEntries = retrieveEntries();
    userEntries = savedUserEntries;
    const tableEntries = savedUserEntries
        .map((entry) => {
            const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
            const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
            const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
            const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
            const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTermsAndConditions}</td>`;
            const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
            return row;
        })
        .join("\n");

    const table = `<table class="table-auto w-full"><tr>
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">dob</th>
    <th class="px-4 py-2">accepted terms?</th>
  </tr>${tableEntries} </table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
};

let form = document.getElementById("user-form");

const saveUserForm = (event) => {
    event.preventDefault();
    console.log("Submitted 1");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTermsAndConditions =
        document.getElementById("acceptTerms").checked;

    const userDetails = {
        name,
        email,
        password,
        dob,
        acceptTermsAndConditions,
    };
    userEntries.push(userDetails);
    console.log("Submitted 2");
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    console.log("Submitted 3");

    displayEntries();
    form.reset();
};

form.addEventListener("submit", saveUserForm);

window.onload = function() {
    displayEntries();
};
