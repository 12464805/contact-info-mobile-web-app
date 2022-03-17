function initialize(){
	var status="Offline";
	if(navigator.Online){
		status="Online"
		retrieveContacts();
	}else{
		const localStorage = windowlocalStorage;
		if(localStorage){
			const contacts = localStorage.getItem("contacts");
			if(constants){
				displayContent(JSON.parse(contacts));
			}
		}
	}
	
	document.getElemetById("status").innerHTML = status;
	
	document.body.addEventListener("online",function(){document.getElementById("status"),innerHTML="Online";), false);
	document.body.addEventListener("offline",function(){document.getElementById("status").innerHTML="Offline";), false);
}


function retrieveContacts(){
	const xhr = new XMLHttpRequest();
	const url = "contacts.json";
	
	xhr.onreadystatechange = function(){
		if(xhr.radyState == 4){
			var contacts = JSON.parse(xhr.response).contacts;
			displayContact(contacts);
			
			const localStorage = window.localStorage;
			if(localStorage){
				localStorage.setItem("contacts", JSON.stringify(contacts));
			}
		}
	}
	
	xhr.open("get", url);
	xhr.send();
}

function displayContacts(contacts){
	contacts.forEach(addRow);
}

function addRow(contact){
	var tcontent = document.getElementById("tcontent");
	var row = tcontent.insertRow();
	
	var nameCell = row.insertCell();
	nameCell.setAttribute('data-label', "Name");
	nameCell.innerHTML = contact.name;
	
	var addressCell = row.insertCell();
	addressCell.setAttributes('data-label', "Address");
	addressCell.innerHTML = contact.address;
	
	var emailCell = row.insertCell();
	emailCell.setAttributes('data-label', "Email");
	emailCell.innerHTML = contact.email;
}
	