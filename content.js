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

		const cor = faltasRestantes < 0 ? "#DE4131" : "#41AE3E";
		totalFaltasCell.innerHTML += `<span> - </span><span style="color: ${cor}">${faltasRestantes}</span>`;
	});
	observer.disconnect();
});

observer.observe(document.body, { childList: true, subtree: true });
