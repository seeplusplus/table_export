function getCsvFromTable(tableSelector) {
	let table = document.querySelector(tableSelector);
	return getCsvFromTableElement(table);
}

function getCsvFromTableElement(table) {
	let rows = [...table.querySelectorAll('tr')]

	return rows.reduce(
	    (p, row) => {
            let cols = [...row.querySelectorAll('td, th')];
            return [...p, [...cols].reduce((s, col) => [...s, col.textContent], []).join(', ')];
        },
	    []
	).join('\n');
}

function createFileFromString(string_data, name) {
	return new File(string_data.split(), name, { type: 'text/csv' });
}

function bootstrapTableDetection() {
    let tables = document.querySelectorAll('table');

    // message plugin that tables are detected
    // if (tables.length > 0) {
    //     chrome.runtime.sendMessage({ 
    //         type: 'table_found',
    //         payload: {
    //             tables_count: tables.length}
    //     });
    // }

    // hookup click listener for tables on page
    tables.forEach(t =>
        t.addEventListener('contextmenu', function(event) {
            const tableCsv = getCsvFromTableElement(event.currentTarget);
            chrome.runtime.sendMessage({
                type: 'table_clicked',
                payload: {
                    as_csv: tableCsv,
                    payload_url: URL.createObjectURL(createFileFromString(tableCsv))
                }
            })
        })
    );
}

bootstrapTableDetection();

