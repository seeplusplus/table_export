# Table Export

Notifies you when there's a table on the page. Provides download for tables as a CSV.


## Architecture 

| File | Work |
-------|------
|tables.js| Content script for detecting tables in page and communicating page info to the service worker.|
|background.js| Receives messages from content script.|
|test/| HTML files with different test cases for this extension.|
|build.sh| Zips all the important files for publishing to browser store.|

## TODO

1. Add notifier on extension icon to notify user that tables have been found on page w/ count.
2. Save as dialog
3. Disable Download as CSV when user right clicks on something that isn't a table
4. Handle tfoot, thead, and colspan

# Attribution

Icon for Table Export taken from [Freepik - Flaticon](https://www.flaticon.com/free-icons/scheme).