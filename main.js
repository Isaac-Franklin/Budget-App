/** @format */

/*
A budget application:
we'll have a budget controller section and a UI display controller secgtion.
The budget contrpller section interacts with the unseen action of the app and the
UI controller interacts with what the user sees on the FE..
*/

// BUDGET CONTROLLER
let budgetController = (function () {
	let option, description, amount, data;

	//ARRAY FOR DATA STORAGE
	data = {
		option: {
			income: [],
			expense: [],
		},

		totals: {
			income: 0,
			expense: 0,
		},
		generalBudget: 0,
	};
	// OBJECT CONSTRUCTORS
	let income = function (id, description, amount) {
		this.id = id;
		this.description = description;
		this.amount = amount;
	};

	let expense = function (id, description, amount) {
		this.id = id;
		this.description = description;
		this.amount = amount;
	};

	return {
		// METHOD TO COLLECT ENTERED DATA
		getInputs: () => {
			return {
				option: document.querySelector(".options").value,
				description: document.querySelector(".description").value,
				amount: parseFloat(document.querySelector(".amount").value),
				totals: data.totals,
				incTotal: data.totals.income,
				expTotal: data.totals.expense,
				dataChioce: data.option,
				dataIncome: data.option[income],
				dataExpense: data.option[expense],
				genBudget: data.generalBudget,
			};
		},

		// METHOD FXN TO DOCUMENT COLLECTED DATA INTO ARRAY
		addToArray: (option, description, amount, which) => {
			let newData, id;
			if (option === "income") {
				id = parseInt(data.option[which].length + 1);
				newData = new income(id, description, amount);
				data.option.income.push(newData);
			} else if (option === "expense") {
				id = parseInt(data.option[which].length + 1);
				newData = new expense(id, description, amount);
				data.option.expense.push(newData);
			}
		},

		ID: (which) => {
			id = parseInt(data.option[which].length + 1);
			// console.log(id);
			return id;
		},

		//METHOD FXN TO CLEAR FIELDS AFTER ENTER IS CLICKED
		clearAndRefresh: () => {
			let allFields, arrAllFields;
			allFields = document.querySelectorAll(".box");
			//CONVERT LIST OF FIELDS INTO AN ARRAY BEFORE I USE ARRAY METHODS ON IT
			arrAllFields = Array.prototype.slice.call(allFields);
			// console.log(arrAllFields);
			arrAllFields.forEach((current) => {
				current.value = "";
			});
			arrAllFields[0].focus();
		},

		test: () => {
			console.log(data);
		},
	};
})();

//UI CONTROLLER SECTION
let UIController = (() => {
	let dataObject, key, keyvalue, keyvaluesection, keyvaluesection2;
	return {
		insertText: (option, id, description, amount) => {
			let text, newText, HTMLTest;

			if (option === "income") {
				HTMLTest = document.querySelector(".incomeUIsectionout");
				text =
					' <div class="incomeUIsectionout"><h2></h2><div class="incomeUIsection" id="income-%id%"><p class="descriptionfigure">%description%</p><p class="incometag"></p><div class = "amountandpercentage"><p class="amountfigure">%amount%</p><p class =""></p></div></div></div>';
			} else if (option === "expense") {
				HTMLTest = document.querySelector(".expenseUIsectionout");
				text =
					' <div class="expenseUIsectionout"><h2></h2><div class="incomeUIsection" id="income-%id%"><p class="descriptionfigure">%description%</p><p class="expensetag"></p><div class = "amountandpercentage"><p class="amountfigure">%amount%</p><p class =""></p></div></div></div>';
			}
			newText = text.replace("%id%", id);
			newText = newText.replace("%description%", description);
			newText = newText.replace("%amount%", amount);
			HTMLTest.insertAdjacentHTML("beforeend", newText);
		},

		//try conditional stmt
		calcTotals: (opt, input, totals) => {
			console.log("TEST");
			let amountTotal = 0,
				amountTotal2 = 0;
			if (opt === "income") {
				console.log("TEST2");
				input[opt].forEach((current) => {
					amountTotal += parseFloat(current.amount);
					// update total value
					incTotal = amountTotal;
					totals.income = amountTotal;
					document.querySelector(".incomeUInum").textContent = incTotal;
				});
			} else if (opt === "expense") {
				console.log("TEST3");
				input[opt].forEach((current) => {
					amountTotal2 += parseFloat(current.amount);
					//update total value
					expTotal = amountTotal2;
					totals.expense = amountTotal2;
					document.querySelector(".expenseUInum").textContent = expTotal;
				});
			}
		},

		updateBudget: (input) => {
			let generalBudget = input.income - input.expense;
			console.log(input.income, input.expense);
			document.querySelector(".mainfigure").textContent = generalBudget;
		},

		///end of trial
		displayAmounts: (opt, value) => {
			console.log("INSERT WORKING!");
			// console.log(value.totalIncome);
			if (opt === "income") {
				document.querySelector(".incomeUInum").textContent = value.totalinc;
			} else if (opt === "expense") {
				document.querySelector(".expenseUInum").textContent = value.totalexp;
			}
		},
	};
})();

//LOCAL STORAGE SECTION
let storageSection = ((budgeSect) => {
	let id = 1;
	let inputs = budgeSect.getInputs();
	let idPack = budgeSect.ID(inputs.option);
	return {
		activate: (input) => {
			let dataObject, key, keyvalue;
			// keyvaluesection = document.querySelector(".keyvaluesection2");
			id = Math.floor(Math.random() * 30000000) + 1;
			// id += id;
			console.log(idPack);
			console.log(id);
			dataObject = {
				Type: input.option,
				Description: input.description,
				Amount: input.amount,
			};

			keyvalue = JSON.parse(localStorage.getItem(dataObject));

			localStorage.setItem(JSON.stringify(id), JSON.stringify(dataObject));
		},

		showData: () => {
			let keyvaluesection, key, keyvalue;
			keyvaluesection = document.querySelector(".keyvaluesection2");
			for (let i = 0; i < localStorage.length; i++) {
				key = localStorage.key(i);
				keyvalue = localStorage.getItem(key);
				keyvaluesection.insertAdjacentHTML(
					"beforeend",
					` ${keyvalue}<br/><br/>`
				);
			}
		},
	};
})(budgetController);

// GENERAL CONTROLLER SECTION
let Controller = (function (uicontroller, budgetcontroller) {
	let activateBudget, inputs, sayID, activateBudget2, values, storageData;

	activateBudget2 = () => {
		let inputs = budgetcontroller.getInputs();
		if (inputs.description && inputs.amount) {
			activateBudget();
			updateUI();
		} else {
			console.log("NO DATA ENTERED");
		}
		// storageSection.activate(inputs);
	};
	activateBudget = () => {
		// showData.onclick = activate(inputs);
		inputs = budgetcontroller.getInputs();
		storageSection.activate(inputs);
		budgetController.test();
		budgetController.clearAndRefresh();
		sayID = budgetController.ID(inputs.option);
		console.log(sayID);
		updateUI();
		uicontroller.insertText(
			inputs.option,
			sayID,
			inputs.description,
			inputs.amount
		);
		// let insertData = uicontroller.insertText();
		if (inputs.amount > 0) {
			budgetController.addToArray(
				inputs.option,
				inputs.description,
				inputs.amount,
				inputs.option
			);
		} else {
			alert("Enter Correct Character Format In Respective Fields");
		}
	};

	let activation = function () {
		addEventListener("keypress", (event) => {
			if (event.keyCode === 13 || event.which === 13) {
				activateBudget2();
			}
		});
	};
	//UPDATE BUDGET
	let updateUI, calcTots;
	updateUI = () => {
		uicontroller.calcTotals(inputs.option, inputs.dataChioce, inputs.totals);
		calcTots = uicontroller.calcTotals();
		uicontroller.displayAmounts(inputs.options, values);
		uicontroller.updateBudget(inputs.totals);
	};
	//END OF UPDATE BUDGET

	return {
		// Activation trigger section
		trigger2: () => {
			document
				.querySelector(".addbtn")
				.addEventListener("click", activateBudget2);
		},
		trigger: () => {
			activation();
		},
	};
})(UIController, budgetController);
Controller.trigger2();
Controller.trigger();
// Controller.showStorageDetail();

// activate();

let inputs = budgetController.getInputs();
document.querySelector(".showalldata").addEventListener("click", showit);
function showit() {
	// location.reload();
	document.querySelector(".storagesection").style.display = "block";
	storageSection.showData();
}

function removeLS() {
	location.reload();
	document.querySelector(".storagesection").style.display = "none";
}
removeLS;
