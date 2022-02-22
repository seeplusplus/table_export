function getCsvFromTable(tableSelector) {
	let table = document.querySelector(tableSelector);
	var z = table.querySelectorAll('tr')
	o = [...z]
	var f = o.reduce(
	    (p, r) => [...p,
		[...r.querySelectorAll('td')].reduce((s, d) => [...s, d.textContent], [])],
	    []
	)
	return f.reduce((w,q) => [...w, q.join(',')], []).join('\n');
}

function createFileFromString(string_data, name) {
	return new File(string_data.split(), name, { type: 'text/csv' });
}

function openFile(file) {
	window.open(URL.createObjectURL(file));
}
