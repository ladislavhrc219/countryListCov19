class Country{
constructor (name, status, category){
this.name = name;
this.status = status;
this.category = category;
}
} 

class UI {
    static displayCountries(){
    const StoredCountries = [
            {
        name: "UK",
        status: "Amber",
        category: "Not safe"
        },
        {
        name: "Spain",
        status: "Red",
        category: "Not safe"
        }];

    //this reaches into local storage
    const countries = StoredCountries;
    countries.forEach(country => UI.addCountryToList(country)); //calling a method on that country!!!! METHOD!!!
    }
    //<td> ${country.name}</td>
    static addCountryToList(country){
        const list = document.querySelector('#country-list');
        const row = document.createElement('tr');
        row.innerHTML =`<th> ${country.name}</th>
        
        <td> ${country.status}</td>
        <td> ${country.category}</td>
        <td> <a href="#" class="btn btn-warning  btn-sm delete"> XXX </a></td>
        `;
        list.appendChild(row);
    }
    // static deleteCountry(el) {
    //     if(el.classList.contains('delete')) {
    //     el.parentElement.parentElement.remove();
    //     }
    // }
    
    static showAlert(message, className) {
        const div = document.createElement('div');
        const alert = document.createAttribute('alert');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#country-form');
        container.insertBefore(div, form);
    
        // Vanish in 3 seconds
        // goes white!!!! .container
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }
    //wnana target that elemtn with the argument given to deleteCountry.UI
    static deleteCountry(el){
        //without argument, cant access anything in other parts. 
        //accessing the parant element of the parent elemtne. 
        //not the td but the tr
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields(){
    document.querySelector('#name').value ='';
    document.querySelector('#status').value ='';
    document.querySelector('#category').value ='';
    }
}
//Event dispaly countries: mst use addEventlistener 
document.addEventListener('DOMContentLoaded', UI.displayCountries);
//add  a country
document.querySelector("#country-form").addEventListener('submit', (e)=> {
e.preventDefault();
//get form values
const name = document.querySelector("#name").value;
const status = document.querySelector("#status").value;
const category = document.querySelector("#category").value;

// validate:
if ( name === "" || status ==="" || category === "") {
    // alert(" ")
    const message ="Please fill in the fields...";
    setTimeout(()=> alert(message), 1000);  
} else {
    // alert("Splendid job you doing great ! ! ! ")
    //instantiate a country 
        const country = new Country(name, status, category);
       // console.log(country)  

        //add boook to ui
        UI.addCountryToList(country);

        // Store.addCountry(country);

        UI.clearFields();

        UI.showAlert("Contry added to the list!", 'info');

        
        }
    });

// Event: Remove a country
document.querySelector('#country-list').addEventListener('click', (e) => {
    //consoling the clicked elemtne from DOM
// console.log(e.target)
// Remove country from UI
UI.deleteCountry(e.target);


//  Store.removeCountry(e.target.parentElement.previousElementSibling.textContent);

UI.showAlert("Country not on the list anymore!", 'danger');

// NOT DDONE YET!!!
// Remove countrty from store
// Store.removeCountry(e.target.parentElement.parentElement.textContent);

// Show success message
// UI.showAlert('Country Removed', 'success');
});