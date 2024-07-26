import validations from "./validation";

export default class SignupValidations{
    constructor(email, password) {
        this.email=email;
        this.password=password;
    }

    checkValidations(){
        let errors= [];

        //email validation
        if (!validations.checkEmail(this.email)) {
            errors['email']="Email is not valid";

        }
        
        //password validation
        if (!validations.minLength(this.password,8)) {
            errors['password']="Password should be of 8 character";
        }
        return errors;
    }

    static getErrorMessageFromCode(errorCode){
        switch(errorCode){
            case 'EMAIL_EXISTS':
                return 'Email already exists';

            case 'EMAIL_NOT_FOUND':
                return 'Email not found plz check';
            
            case 'INVALID_PASSWORD':
                return 'Invalid Password';
                default:
                    return 'Something went wrong';
        }
    }
}