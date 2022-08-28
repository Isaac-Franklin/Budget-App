/** @format */

let option = document.querySelector(".options").value;
let description = document.querySelector(".description").value;
let amount = document.querySelector(".amount").value;

function showData() {
	console.log(description);
	let element = budgetController2.getInputs();
	console.log(element.description);
}
showData;

addEventListener("keypress", (event) => {
	if (event.keyCode === 13 || event.which === 13) {
		showData();
	}
});
///////////////////////////////////////////////////

let budgetController2 = (function () {
	return {
		// METHOD TO COLLECT ENTERED DATA
		getInputs: () => {
			return {
				option: document.querySelector(".options").value,
				description: document.querySelector(".description").value,
				amount: parseFloat(document.querySelector(".amount").value),
			};
		},
	};
})();
//////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//START OF INTIAL DATA
/*

let desc = document.querySelector(".description").value;
console.log(desc);

addEventListener("keypress", (event) => {
	if (event.keyCode === 13 || event.which === 13) {
		activateBudget2();
	}
});

function activateBudget2() {
	let collectData = function () {
		return {
			option: document.querySelector(".options").value,
			description: document.querySelector(".description").value,
			amount: parseFloat(document.querySelector(".amount").value),
		};
	};
	let dataPack = collectData();
	console.log(dataPack);
	// dataPack.description.innerHTML = "WORK";
	////LOCAL STORAGE SETTINGS BELOW
	// let showDataBtn = document.querySelector(".showalldata");

	////
	let dataObject, key, keyvalue, keyvaluesection, keyvaluesection2;
	keyvaluesection = document.querySelector(".keyvaluesection");
	keyvaluesection2 = document.querySelector(".keyvaluesection2");

	dataObject = {
		amount: dataPack.amount,
	};

	keyvalue = JSON.parse(localStorage.getItem(dataObject));

	localStorage.setItem(dataPack.description, JSON.stringify(dataObject.amount));
	// START MAIN LOOP SECTION FOR LOCAL STORAGE
	for (let i = 0; i < localStorage.length; i++) {
		// location.reload();
		if (dataPack.option === "income") {
			key = localStorage.key(i);
			keyvalue = JSON.parse(localStorage.getItem(key));
			keyvaluesection2.insertAdjacentHTML(
				"beforeend",
				`${key}:       ${keyvalue}<br/>`
			);
		}
		if (dataPack.option === "expense") {
			key = localStorage.key(i);
			keyvalue = JSON.parse(localStorage.getItem(key));
			keyvaluesection.insertAdjacentHTML(
				"beforeend",
				`${key}:       ${keyvalue}<br/>`
			);
		}
	}
}

////

// showDataBtn.onclick = function (dataPack) {
// 	//
// 	let dataObject, key, keyvalue, keyvaluesection, keyvaluesection2;
// 	keyvaluesection = document.querySelector(".keyvaluesection");
// 	keyvaluesection2 = document.querySelector(".keyvaluesection2");
// 	dataObject = {
// 		amount: dataPack.amount,
// 	};
// 	keyvalue = JSON.parse(localStorage.getItem(dataObject));
// 	localStorage.setItem(dataPack.description, JSON.stringify(dataObject.amount));
// 	// START MAIN LOOP SECTION FOR LOCAL STORAGE
// 	for (let i = 0; i < localStorage.length; i++) {
// 		// location.reload();
// 		if (dataPack.option === "income") {
// 			key = localStorage.key(i);
// 			keyvalue = JSON.parse(localStorage.getItem(key));
// 			keyvaluesection2.insertAdjacentHTML(
// 				"beforeend",
// 				`${key}:       ${keyvalue}<br/>`
// 			);
// 		}
// 		if (dataPack.option === "expense") {
// 			key = localStorage.key(i);
// 			keyvalue = JSON.parse(localStorage.getItem(key));
// 			keyvaluesection.insertAdjacentHTML(
// 				"beforeend",
// 				`${key}:       ${keyvalue}<br/>`
// 			);
// 		}
// 	}
// 	////
// };
// keyValueSetup;

// //END OF LOCAL STORAGE SETTINGS BELOW


*/

//END OF INITIAL DATA
