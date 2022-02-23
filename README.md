# Table Export

Notifies you when there's a table on the page. Provides download for tables as a CSV.


## Architecture 

| File | Work |
-------|------
|tables.js| Content script for detecting tables in page and communicating page info to the service worker.|
|backgroun.js| Receives messages from content script|

# Attribution

Icon for Table Export taken from [Freepik - Flaticon](https://www.flaticon.com/free-icons/scheme).