function validator(){
    this.checkEmpty = function(input){
        const inputVal = input.trim();
		
		if(input === null || input === undefined || inputVal.length === 0 || inputVal === ''){
			return false;
		}else{
			return inputVal;
		}
    }
    
	this.mailValidator = function(input){
		const inputVal = input.trim();
		
		const threeDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
		const oneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
		const twoDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
		
		const threeDotFormat = threeDot.test(inputVal);
		const oneDotFormat = oneDot.test(inputVal);
		const twoDotFormat = twoDot.test(inputVal);
		const emailFormats = threeDotFormat || twoDotFormat || oneDotFormat;
		
		if(!emailFormats){
			return false;
		}else{
			return inputVal;
		}
	}

    this.nameValidator = function(input){
        const inputVal = input.trim();

        if(inputVal.length < 3){
            return false;
        }else{
			return inputVal;
		}
    }

    this.pwdValidator = function(input){
        const inputVal = input.trim();
        
        if(inputVal.length < 8){
            return false;
        }else{
			return inputVal;
		}
    }

    this.pwdMatchValidator = function(input, input2){
        const inputVal = input.trim();
        const inputVal2 = input2.trim();
		
        if(inputVal !== inputVal2){
            return false;
        }
		
		return true;
    }
	
}

export default validator;
