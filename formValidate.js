/*
	Survey Form Validation
	Today's Date
	Alan Simpson
 */


function validate(e) {
	
	hideAllErrors();

	
	if (formHasErrors()) {
		
		e.preventDefault();
		return false;
	}

	return true;
}

function resetForm(e) {
	
	if (confirm('Clear order?')) {
		
		hideAllErrors();

		document.getElementById("fullname").focus();

		return true;
	}

	e.preventDefault();

	return false;
}

function formHasErrors() {
	
	let errorFlag = false;

	let requiredFields = ["fullname", "address", "city", "phone", "email"];
	for(let i=0; i<requiredFields.length; i++)
	{
		let textField = document.getElementById(requiredFields[i]);

		if(!formFieldHasInput(textField))
		{
			document.getElementById(requiredFields[i] + "_error").style.display = "block";

			if (!errorFlag)
			{
				textField.focus();
				textField.select();
			}

		errorFlag = true;
		}
	}

	let phoneErrorEmpty = document.getElementById("phone_error");
	if (phoneErrorEmpty.style.display !== "block") 
	{
		let phoneRegex = /^\d{10}$/;
		let phoneNumber = document.getElementById("phone").value.replace(/[-\s]/g, '');

		if (!phoneRegex.test(phoneNumber)) {
			document.getElementById("phoneformat_error").style.display = "block";

			if (!errorFlag) {
				document.getElementById("phone").focus();
				document.getElementById("phone").select();
			}

			errorFlag = true;
		}
	}

	let emailErrorEmpty = document.getElementById("email_error");
	if(emailErrorEmpty.style.display != "block")
	{
		let emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
		let emailAddress = document.getElementById("email").value;

		if(!emailRegex.test(emailAddress))
		{
			document.getElementById("emailformat_error").style.display = "block";

			if(!errorFlag)
			{
				document.getElementById("email").focus();
				document.getElementById("email").select();
			}

				errorFlag = true;
		}

	}

	
	return errorFlag;
}


function hideAllErrors() {
	let errorFields = document.getElementsByClassName("error");

	for(let i=0; i<errorFields.length; i++ )
	{
		errorFields[i].style.display = "none";
	}

}


function formFieldHasInput(fieldElement) {
	
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		
		return false;
	}


	return true;
}


function load() {
	
	document.getElementById("order_form").addEventListener("submit", validate);

	document.getElementById("order_form").reset();

	document.getElementById("order_form").addEventListener("reset", resetForm);

}

document.addEventListener("DOMContentLoaded", load);
