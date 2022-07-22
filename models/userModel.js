const moongoose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcryptjs');

/**How access and token works only we are perfoming just restructuring****/

var UserSchema =  new moongoose.Schema({
   userToken:{
  type:String,
  default:null
   },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        

    },
    mobile:{

        type:String,
        default:null
    },
    image:{
        type:String,
        default:null
    },
    password:{
        type:String,
        required:true
    },
    created_at: { 
        type: Date,
        default: new Date()
    },
    updated_at: {

            type: Date,
            default: new Date()
    },
    email_varified: {
        type:String,
        default:"true"

   },
    isApproved: {
        type: String,
        default:"approved"
     },

    status:{

        type:String,
        default:'active'

    },
    user_role:{

        type:String,
        enum: ['user','admin'],
        default:'user'

    },
    last_name:{

        type:String,
        default:null
    }, 
    username:{

        type:String,
        default:null
    }, 
    // wallet_address:{
    //     type:String,
    //     default:null
    // },
    // description:{
    //     type:String,
    //     default:null
    // },
    // instagram:{
    //     type:String,
    //     default:null
    // },
    // twitter:{
    //     type:String,
    //     default:null
    // },
    // website:{
    //     type:String,
    //     default:null
    // },
    // subscription:{
    //     type:String,
    //     default:null
    // },
    // private_key:{
    //    type:String,
    //    default:null,
    //   },
    
    // created_by: {

    //         type:Number,
    //         default:0
    // },


    // updated_by: {

    //         type:String,
    //         default:0
    // },
   
});


var UserInfo =  moongoose.model('users',UserSchema);

module.exports = {UserInfo:UserInfo};
