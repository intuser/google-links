# google-link
Conkeror page mode cleaning redirecting search links

Don't give google everything they want.

Google since quite some time provides in its search results links
which redirect you through google. So every time you visit a link you
first pass by google ...

If you use the conkeror useragent or have javascript disabled they
return a page where the referer-links are embedded into the href
tags. In this case, this script doesn't work!

If you have javascript enabled and have a useragent recognized by
google as firefox or chrome (others?) the href tag contains a clean
link and the referer-link is created on the fly using javascript if
you visit the link. This is prevented by this script.

Usage: Just put the script into your conkeror script
folder. Alternatively you can put it into the folder
.conkerorrc/modules, use
http://jaderholm.com/paste/%2521add_user_modules_path.js.html and put
require("google-clean-links"); somewhere into your configuration
file(s).

Please note, that this script does not provide a mechanism to revert
its effect: But why would you like to first go to google before
visiting the link you are interested in?

The script uses code from the greasemonkey userscript 121923.
