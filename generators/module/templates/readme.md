# <%= name %>
---

### <%= desc %>

---<% var encodedNPMPackage = encodeURIComponent(scope + slug); %>
[![npm version](https://badge.fury.io/js/<%=encodedNPMPackage%>.svg)](http://badge.fury.io/js/<%=encodedNPMPackage%>) 
[![Build Status](https://travis-ci.org/<%= githubUsername %>/<%=slug%>.svg)](https://travis-ci.org/emiw/<%=slug%>) 
[![Coverage Status](https://coveralls.io/repos/<%= githubUsername %>/<%=slug%>/badge.svg?branch=master&service=github)](https://coveralls.io/github/<%= githubUsername %>/<%=slug%>?branch=master)
[![Dependency Status](https://david-dm.org/<%= githubUsername %>/<%=slug%>.svg)](https://david-dm.org/<%= githubUsername %>/<%=slug%>) 
[![devDependency Status](https://david-dm.org/<%= githubUsername %>/<%=slug%>/dev-status.svg)](https://david-dm.org/<%= githubUsername %>/<%=slug%>#info=devDependencies)
---

## Why?

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget tempus eros. Sed blandit urna risus, fermentum sagittis
massa vestibulum eu. Nulla lacinia ut magna tristique lobortis. Donec a justo dictum magna interdum eleifend. Nunc porta
sem leo, non molestie eros hendrerit vel. Quisque et ante convallis, posuere velit a, pellentesque sapien. Etiam euismod
tellus non justo vehicula efficitur. 

---

## Installation

    npm i -S <%= scope %><%= slug %>


---

## Usage

   var <%=name%> = require('<%=scope%><%=slug%>');
   
   // TODO: Add usage instructions
   


---

## Contributing

PRs are welcome! Although, you'll have to sign the CLA.

Please make sure to add tests for anything you add/fix. Run the tests (and lint your code,) with:

    npm run test


You can build the project with:

    npm run build


---

## License

[http://emiw.xyz/licnese](http://emiw.xyz/licnese)


