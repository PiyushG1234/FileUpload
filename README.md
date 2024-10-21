# FileUpload
  # In this project we created routes for uplaoding files like for images and videos with their supported formats this is based on Node.js and express.js and we use mongodb .
- index.js
  - app create
  - port find 
  - adding middlewares
  - db connect
  - cloud connect
  - mount the api route
  - activate server

- create env file 

- folders create 
 - config
   - database.js
     - mongoose instance 
     - mongodb connection
   - cloudinary.js
     -connection with config function

 - controllers
   - fileUpload.js
     - handler function on local-fileupload
     - handler function on imageUpload
     - handler function on videoUpload
     - handler function on imageSizeReducer
     - special feature on mail get mail on every success upload with the help of nodemailer.
   - make files name folder so that our file is uploaded at time of testing

 - models
   - File.js
     - make our schema
     - make pre / post middlewares on schema file

 - routes
   - FileUpload.js
     - define routes with the help of Router function

