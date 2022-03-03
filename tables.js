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

function createCsvFileFromString(string_data, name) {
	return new File(string_data.split(), name, { type: 'text/csv' });
}

function bootstrapTableDetection(state) {
    let tables = document.querySelectorAll('table');
    tables.forEach(t =>
        t.addEventListener('contextmenu', function(event) {
            state.last_table_targeted = event.currentTarget;
            chrome.runtime.sendMessage({
                type: 'table_clicked',
            })
        })
    );
}

function bootstrapMessageListener(state) {
    chrome.runtime.onMessage.addListener(
        function (message) {
            console.table(message);
            if (message.type === 'generate_file') {

                const csv = getCsvFromTableElement(state.last_table_targeted);
                const file = createCsvFileFromString(csv);

                chrome.runtime.sendMessage({
                    type: 'start_download',
                    payload: {
                        url: URL.createObjectURL(file)
                    }
                });
            }
        }
    );
}

let contentState = {
    last_table_targeted: undefined
};

bootstrapTableDetection(contentState);
bootstrapMessageListener(contentState);