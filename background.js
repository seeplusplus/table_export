const downloadTableContextMenuId = '100';

var backgroundState = {
    tableCsv: null,
    tableUrl: null,
};

function enableContextMenu() {
    chrome.contextMenus.update(
        downloadTableContextMenuId,
        {
            enabled: true,
            visible: true
        }
    );
}

function setupContextMenu() {
    const contextMenuProperties = {
        id: downloadTableContextMenuId,
        contexts: [
            'page',
        ],
        enabled: false, // TODO: disabled when user doesn't right click on table.
        title: 'Download table as CSV',
        // visible: false,
    }
    chrome.contextMenus.create(contextMenuProperties);
}

function setupEventListeners(state) {

    chrome.runtime.onInstalled.addListener(setupContextMenu);

    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
        if (!state.tableCsv) {
            return;
        }

        const downloadId = await chrome.downloads.download({
            url: state.tableUrl,
           // saveAs: true, // TODO: This never opens nor does it start a download when true.
        });
    });
    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === "table_found") {
            table_count = parseInt(message.payload.tables_count, 10);
            if (isNaN(table_count)) {
                return;
            }
            chrome.action.setBadgeText({
                text: `${table_count}`
            });
            chrome.action.setBadgeBackgroundColor({
                color: '#00FF00'
            });
        } else if (message.type === "table_clicked") {
            enableContextMenu();
            state.tableCsv = message.payload.as_csv;
            state.tableUrl = message.payload.payload_url;
        }
    });    
}

/**
 * Event listeners
 */


setupEventListeners(backgroundState);