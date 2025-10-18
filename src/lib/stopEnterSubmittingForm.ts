export default function stopEnterSubmittingForm(form: HTMLFormElement) {
	form.addEventListener("keydown", (event) => {
		if (event.key == "Enter") {
			event.preventDefault();
		}
	});
}
