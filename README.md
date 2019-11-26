On a Debian and Ubuntu systems, there is a file called /var/lib/dpkg/status that holds information about software packages that the system knows about. This small program exposes some key information about packages in the file via an HTML interface.

If the file was not found (e.g. app is running on Windows) or the user has no rights to read it, the app shows content of a mock file, stored on server.

You can check it online at https://fathomless-ravine-74752.herokuapp.com/.

To run locally:
1. Git clone
2. Node server.js
The app will run on port 3000
