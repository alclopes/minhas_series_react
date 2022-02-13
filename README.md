# Project - My Series

I've included this project on GitHub to show a ghost API call with no origin defined in the infoSerie canvas.

From what I've identified so far, the generating source is the property: backgroundImage: `url('${data.background}')`,
In the file: src/elements/InfoSerie.js
The return message is: backgroundImage: GET http://localhost:3000/series/undefined 404 (Not Found) 

* **To run:**
  =
  => API Server
    > yarn server

  => App
    > yarn dev