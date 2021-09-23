const mongoose=require('mongoose');

const complaints=mongoose.model('complaints',new mongoose.Schema(
    {
      id: Number,
      username: String,
      totalComplaints: String      
    }
),'complaints');

module.exports=complaints;