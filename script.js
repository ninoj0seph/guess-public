$(document).ready(function () {
   var game = new guessingGameConstructor()
    game.initialize();
});

function guessingGameConstructor() {
    this.prices = {};
    this.initialize = function () {
        this.eventHandlers();
        this.server();
    }

    this.eventHandlers = function () {
        $(document).on('input', '#diesel-slider', function() {
            $('.userSelectDiesel').text('$'+ parseFloat($(this).val()).toFixed(2));
        });

        $(document).on('input', '#gas-slider', function() {
            $('.userSelectGas').text('$'+ parseFloat($(this).val()).toFixed(2));
        });
    }

    this.server = function () {
        $.ajax({
            url : 'http://www.fueleconomy.gov/ws/rest/fuelprices',
            type : 'GET',
            success : function (serverObj) {
                var xmlDoc = $.parseXML( serverObj )
                $xml = $( xmlDoc );
                $title = $xml.find( "title" );
                var xmlResult = serverObj.find( "diesel" );
                // this.prices.diesel = xmlResult.find( "diesel" );
                console.log(xmlResult);
            },
            error : function (serverObj) {
                console.log(serverObj);
            }


        })
    }


}