let FreddyValidator = {
    handleSubmit:(event) =>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        FreddyValidator.clearErrors();

        for(let i = 0; i<inputs.length;i++) {
            let input = inputs[i];
           let check =  FreddyValidator.checkInput(input);
           if(check !== true) {
            send = false;
            //exibir o erro
           FreddyValidator.showError(input, check);
           }
        }

        
        if(send) {
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == ''){
                            return 'Campo obrigatorio';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Campo tem que ter no minimo '+rDetails[1]+' caracteres';
                        }
                    break;
                    case 'min':
                        if(input.value != ' '){
                            let regex = ' '
                            if(regex.test(input.value.toLowerCase())) {
                              
                                return 'E-mail digitado não é valido!'
                            }
                            
                        }
                    break;
                }
            }
        }
        return true
    },
    showError:(input, error) => {
        input.style.borderColor = "#ff0000";

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },

    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++) {
            errorElements[i].remove();
        }
    }


};


let form = document.querySelector('.freddyvalidator');
form.addEventListener('submit', FreddyValidator.handleSubmit);