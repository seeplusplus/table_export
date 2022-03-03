const downloadTableContextMenuId = 'TABLE_EXPORT_DOWNLOAD_MENU';

var backgroundState = {
    last_sender_id: undefined
};

function updateContextMenu(enabled) {
    chrome.contextMenus.update(
        downloadTableContextMenuId,
        {
            enabled: enabled
        }
    );
}

function setupContextMenu() {
    const contextMenuProperties = {
        id: downloadTableContextMenuId,
        contexts: [
            'page',
        ],
        enabled: false,
        title: 'Download table as CSV',
    }
    chrome.contextMenus.create(contextMenuProperties);
}

function setupEventListeners(state) {
    /**
     * On install
    */
    chrome.runtime.onInstalled.addListener(setupContextMenu);

    /**
     * Context Menu
    */
    chrome.contextMenus.onClicked.addListener(() => {
        chrome.tabs.sendMessage(state.last_sender_id, 
        {
            type: 'generate_file',
        });
        updateContextMenu(false);
    });
    
    /**
     * Message Passing
    */
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
            updateContextMenu(true);
            state.last_sender_id = sender.tab.id;
        } else if (message.type === 'start_download') {
            chrome.downloads.download({
                url: message.payload.url
            })
        }
    });    
}

/**
 * Event listeners
 */
setupEventListeners(backgroundState);