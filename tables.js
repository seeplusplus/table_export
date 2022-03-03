function getSeparatorFor(node) {
    if (node instanceof Text) {
        return '';
    }
    else if (node instanceof HTMLTableCellElement) {
        return ','
    }
    else if (node instanceof HTMLTableRowElement || node instanceof HTMLTableSectionElement) {
        return '\n'
    }
}

function convertToText(htmlTableElement) {
    return [...htmlTableElement.childNodes].reduce(
        (string, node, index, childNodes) => {
            let inner = '';
            let terminator = '';
            if (node instanceof Text) {
                inner = node.textContent.trim();
            } else {
                inner = convertToText(node);
            }

            if (childNodes.some((node, node_idx) => node_idx > index && !(node instanceof Text))) {
                terminator = getSeparatorFor(node);
            }

            return `${string}${inner}${terminator}`;
        }, 
        ''
    );
}

function getCsvFromTableElement(table) {
    return convertToText(table);
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