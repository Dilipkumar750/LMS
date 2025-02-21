import mongoose from "mongoose";

const employeeDetailsSchema = new mongoose.Schema({
    employee_id: {type:String,ref:"User",required:true,unique:true},
    personalInfo:{
        name:{type:String,required:true},
        email:{type:String,required:true, unique: true },
        mobile:{type:Number,required:true},
        dateOfBirth:{type:String,required:true},
        gender:{type:String,required:true},
        dateOfJoining:{type:String,required:true},
        bloodGroup:{type:String},
        fatherName:{type:String,required:true},
        alternateNumber:{type:Number,required:false},
        aadharNumber:{type:Number,required:true},
        panNumber:{type:String,required:true},
        contactPersonName:{type:String,required:true},
        contactPersonRelationship:{type:String,required:true},
        image:{type:String,required:true}
    },
    education:{
        tenthMarks:{type:Number,required:true},
        twelfthMarks:{type:String,required:false},
        ugDomain:{type:String,required:true},
        ugPassedOutYear:{type:Number,Number:true},
        pgDomain:{type:String,required:false},
        pgPassedOutYear:{type:Number,required:false}
        },
    experiences:{
        companyName:{type:String},
        jobDescription:{type:String},
        startDate:{type:String},
        eventDate:{type:String}
    },
    documents:{
        fileName: { type: String, required: true },
        fileUrl: { type: String, required: true },
        fileType: { type: String, required: true },
        fileSize: { type: String, required: true }, // Stored in KB
        uploadedAt: { type: Date, default: Date.now },
    },
    address:{
        permanentAddress:{type:String,required:true},
        presentAddress:{type:String,required:false},
        city:{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
        zipCode:{type:Number,required:true}
    },
    bank:{
        accountName:{type:String,required:false},
        accountNumber:{type:Number,required:false},
        bankBranch:{type:String,required:false},
        IFScode:{type:String,required:false},
    },
    archived: {type: Boolean,default: false}
});

const EmployeeDetails = mongoose.model('employeeDetailsSchema', employeeDetailsSchema);

export default EmployeeDetails;