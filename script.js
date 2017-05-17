$(document).ready(function () {
    var game = new guessingGameConstructor()
    game.initialize();
});

function guessingGameConstructor() {
    this.prices = {};
    this.initialize = function () {
        this.eventHandlers();
        this.declareModal();
        this.server();
    };

    this.convertXML = function (xml) {
        var obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for(var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof(obj[nodeName]) == "undefined") {
                    obj[nodeName] = this.convertXML(item);
                } else {
                    if (typeof(obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.convertXML(item));
                }
            }
        }
        return obj;
    };


    this.eventHandlers = function () {
        $(document).on('input', '#diesel-slider', function() {
            $('#userDieselAmount').text('$'+ parseFloat($(this).val()).toFixed(2));
        });

        $(document).on('input', '#gas-slider', function() {
            $('#userGasAmount').text('$'+ parseFloat($(this).val()).toFixed(2));
        });

        $('.subscribe').click(function(){
            $('#modal1').modal('open');
        });

        $('.submitBtn').click(function () {
            this.validateUserInput($(this).attr('name'));
        }).bind(this);
    };

    this.server = function () {
        $.ajax({
            url : 'http://www.fueleconomy.gov/ws/rest/fuelprices',
            type : 'GET',
            success : function (serverObj) {
                console.log(this);
                this.prices = this.convertXML(serverObj);
            }.bind(this),
            error : function (serverObj) {
                console.log(serverObj);
            }
        });
    };

    this.declareModal = function () {
        $('.modal').modal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 200, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute
            }
        );
    };

    this.validateUserInput = function (type) {
        console.log(type)
    }

}