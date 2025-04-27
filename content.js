const observer = new MutationObserver((_, observer) => {
	const table = document.querySelector("table.bordered");
	if (!table) return;

	const tbody = table.querySelector("tbody");
	const rows = tbody.querySelectorAll("tr");

	const totalFaltasHeader = table.querySelector("th#th_total_faltas");
	if (
		totalFaltasHeader &&
		totalFaltasHeader.textContent.trim() === "Total de Faltas"
	) {
		const totalFaltasHeaderSpan = document.createElement("span");
		const totalFaltasHeaderSeparator = document.createElement("br");
		totalFaltasHeaderSpan.textContent = " (Faltas disponíveis)";
		totalFaltasHeaderSpan.style.color = "#DE4131";
		totalFaltasHeader.appendChild(totalFaltasHeaderSeparator);
		totalFaltasHeader.appendChild(totalFaltasHeaderSpan);
	}

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

		const faltasRestantesSpan = document.createElement("span");
		faltasRestantesSpan.textContent = ` (${parseInt(faltasRestantes / 2)} dias)`;
		faltasRestantesSpan.style.color = "#DE4131";

		totalFaltasCell.textContent = faltasText;
		totalFaltasCell.appendChild(faltasRestantesSpan);
	});
	observer.disconnect();
});

observer.observe(document.body, { childList: true, subtree: true });
