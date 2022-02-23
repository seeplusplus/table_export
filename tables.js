function getCsvFromTable(tableSelector) {
	let table = document.querySelector(tableSelector);
	return getCsvFromTableElement(table);
}

function getCsvFromTableElement(table) {
	let rows = [...table.querySelectorAll('tr')]

	return rows.reduce(
	    (p, row) => {
            let cols = [...row.querySelectorAll('td')];
            return [...p, [...cols].reduce((s, col) => [...s, col.textContent], []).join(', ')];
        },
	    []
	).join('\n');
}

function bootstrapTableDetection() {
    let tables = document.querySelectorAll('table');

    // message plugin that tables are detected
    if (tables.length > 0) {
        chrome.runtime.sendMessage({ 
            type: 'table_found',
            payload: {
                tables_count: tables.length}
        });
    }

    // hookup click listener for tables on page
    tables.forEach(t =>
        t.addEventListener('click', function(event) {
            chrome.runtime.sendMessage({
                type: 'table_clicked',
                payload: {
                    as_csv: getCsvFromTableElement(event.currentTarget)
                }
            })
        })
    );
}

bootstrapTableDetection();

