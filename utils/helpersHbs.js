const moment = require('moment');
module.exports = {
    formatDate : function(date, format){
        return moment(date).format(format);
    },
    check : function(tournament_id,arrayofRequests,options){
        let value = true;
        for(let i=0;i<arrayofRequests.length;i++){
            if(tournament_id == arrayofRequests[i].tournament)
                value = false;
        }
        if( value) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    },
}
