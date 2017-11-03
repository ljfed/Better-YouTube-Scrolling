## Looks like youtube updated and this doesn't work anymore.
At least they fixed some of the things I addressed

## Better YouTube Scrolling

#### Set Up Instructoins
1. Download the [Tampermonkey chrome extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Click on the Tampermonkey icon and select add new script
3. Delete the defult text and paste the code from the better-youtube-scrolling.js into the editior
4. Save!

#### Current Features
* Keeps youtube video at the top of the screen so you can still see it as you scroll down the page
* Stops the space key from scrolling down the page. Instead it will always play/pause unless the cursor is in the youtube search bar or a comment field
* Scrolls through the video when using the arrow keys even if the player is not selected
* Stops the page from scrolling to the top when clicking on a timelink for the video
* Auto clicks "load more" and "show more" buttons as you near the bottom of a video list or comment section
* Works on all screen sizes
* Works with playlist pannel
* Works with theater mode (requires a page refresh)

#### Issues
* Sometimes parts of the page such as the playlist pannel will not format properly due to run() function being called before they load. Pressing the 'pause/break' key will manually call the run() function which should fix the problem. 
