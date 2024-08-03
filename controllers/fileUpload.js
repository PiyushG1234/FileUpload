const File = require("../models/File");

// local-fileupload ka handler function

exports.localFileUpload = async (req,res) => {
    try{
        // fetch the file from request
        const file = req.files.file;
        console.log("File aa gayi" , file);

        // create path where file need to be stored on server

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path" , path);
        
        //add path to the move function
        file.mv(path , (err) => {
            //console.log(err)
        });

        res.json({
            success:true,
            message:"File Upload successfully",
        });
    }
    catch(error){
        console.log(error);
    }
}