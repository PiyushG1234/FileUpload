const File = require("../models/File");
const cloudinary = require('cloudinary').v2;

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

function isFileTypeSupported(type , supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    console.log("temp file path" , file.tempFilePath);

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
   return await cloudinary.uploader.upload(file.tempFilePath , options);

}

// image upload handler
exports.imageUpload = async (req,res) => {
    try{
        //data fetch
        const {name , tags , email } = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log("file aai h" , file);

        //validation
        const supportedTypes = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log(fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message: "File format not supported"
            })
        }

        // file format supported
        console.log("uploading problem")
        const response = await uploadFileToCloudinary(file, "piyush");
        console.log(response);
        
        // db m entry save karo

        const fileData = await File.create({
            imageUrl:response.secure_url,
            name,
            tags,
            email
        })

        return res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"file uploaded "
        })

    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    };
}

// video-upload handler

exports.videoUpload = async(req,res) => {
    try{
        // data fetch
        
        const {name,tags, email } = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log("video aai h" , file);

        // validation
        const supportedTypes = ["mov" ,"mp4"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type" , fileType);

        // homework add a upper limit of 5MB for video
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        console.log("uploading problem");
        const response = await uploadFileToCloudinary(file , "piyush")
        console.log(response);
        res.status(200).json({
            success:true,
            message:"Video uploaded successfully",
            videoUrl: response.secure_url,
        })

        const fileData = await File.create({
            name,
            tags,
            videoUrl:response.secure_url,
            email,
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
};

// imageSizeReducer

exports.imageSizeReducer = async(req,res) => {
    try{
        // data fetch
        
        const {name,tags, email } = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log("file aai h" , file);

        // validation
        const supportedTypes = ["jpg" , "jpeg" , "pdf"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type" , fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        console.log("uploading problem");
        const response = await uploadFileToCloudinary(file , "piyush" , 70)
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            videoUrl:response.secure_url,
            email,
        })


        res.status(200).json({
            success:true,
            message:"Image uploaded successfully",
            videoUrl: response.secure_url,
        })
    }

        catch(error){
            console.log(error);
            res.status(400).json({
                success:false,
                message:"Something went wrong"
            })
        }
    };
    



