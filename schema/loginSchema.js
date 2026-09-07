const LoginSchema = {
    type : 'object',
    required : ['accessToken', 'refreshToken', 'id', 'username'],
    properties : {
        accessToken : {type : 'string'},
        refreshToken : {type : 'string'},
        id : {type : 'number'},
        username : {type : 'string'},
        email : {type : 'string'},
        firstName : {type : 'string'},
        lastName : {type : 'string'},
        gender : {type : 'string'},
        image : {type : 'string'}
    }
}

module.exports = LoginSchema;