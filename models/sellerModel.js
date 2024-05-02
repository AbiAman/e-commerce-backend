const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var sellerSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
      
    },
    lastname:{
        type:String,
        required:true,
    
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    shopName:{
        type:String,
        required:true,
    },
    shopAddress:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        default: "seller",
      },
      sellerStatus:{
        type: String,
        default:"Pending",
    
    },
},
{
  timestamps: true,
});
sellerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
  
      const salt = await bcrypt.genSaltSync(10);
      this.password = await bcrypt.hash(this.password, salt);
  });
  sellerSchema.methods.isPasswordMatched = async function (enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    };
    sellerSchema.methods.createPasswordResetToken = async function () {
      const resettoken = crypto.randomBytes(32).toString("hex");
      this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resettoken)
        .digest("hex");
      this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
      return resettoken;
    };
//Export the model
module.exports = mongoose.model('Seller', sellerSchema);