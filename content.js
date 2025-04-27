const observer = new MutationObserver((_, observer) => {
	const table = document.querySelector("table.bordered");
	if (!table) return;

	const tbody = table.querySelector("tbody");
	const rows = tbody.querySelectorAll("tr");

	rows.forEach((row) => {
		const totalAulasCell = row.querySelector('td[headers="th_total_aulas"]');
		const totalFaltasCell = row.querySelector('td[headers="th_total_faltas"]');

		if (!totalAulasCell || !totalFaltasCell) return;

		const totalAulas = parseInt(totalAulasCell.textContent.trim());
		const totalFaltas = parseInt(totalFaltasCell.textContent.trim());

		if (isNaN(totalAulas) || isNaN(totalFaltas)) return;

		const faltasPermitidas = Math.floor(totalAulas * 0.25);
		const faltasRestantes = faltasPermitidas - totalFaltas;

		const faltasText = totalFaltasCell.textContent.trim();

		const separador = document.createElement("span");
		separador.textContent = " - ";

		const faltasRestantesSpan = document.createElement("span");
		faltasRestantesSpan.textContent = faltasRestantes;
		faltasRestantesSpan.style.color =
			faltasRestantes < 0 ? "#DE4131" : "#41AE3E";

		totalFaltasCell.textContent = faltasText;
		totalFaltasCell.appendChild(separador);
		totalFaltasCell.appendChild(faltasRestantesSpan);
	});
	observer.disconnect();
});

observer.observe(document.body, { childList: true, subtree: true });
