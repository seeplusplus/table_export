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
        console.log(message.payload.as_csv);
    }
});
