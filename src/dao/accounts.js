import Ajax from '../utils/ajax';

class Accounts {
    constructor() {
        return Ajax.get('/accounts');
    }
}

export default Accounts;