/* eslint-disable */

$(function() {

    $.validator.addMethod("checkLotteryNumber", function(value, element) {
        return this.optional(element) || value > 0 && value <= 52;
    }, 'Please, write numbers from 1 to 52 only');

    $.validator.addMethod("checkDrawsNumber", function(value, element) {
        return this.optional(element) || value < 100000;
    }, 'You can play not more than 99.999 draws');

    var rules = {
        draw_number: {
            checkDrawsNumber: true,
            required: true
        }
    }

    var messages = {
        draw_number: {
            checkDrawsNumber: 'You can play not more than 99.999 draws',
            required: 'This field is required'
        }
    };

    var inputCheck = function() {
        $("input[id^='user_number']").each(function() {
            rules[$(this).attr('id')] = {
                checkLotteryNumber: true,
                required: true
            };
        });
        $("input[id^='user_number']").each(function() {
            messages[$(this).attr('id')] = {
                checkLotteryNumber: 'Please, write numbers from 1 to 52 only',
                required: 'This field is required'
            };
        });
    }
    console.log(rules, messages);
    inputCheck();   

    $('form.user-input').validate({
        rules: rules,    
        messages: messages,
        submitHandler: function() { 
                var userInput = {
                  numbers: [],
                  draws: parseInt($('.draw-number').val(), 10),
                };
            
                $('.lottery-number').each(function() {
                  userInput.numbers.push(parseInt($(this).val(), 10));
                });
            
                $.ajax({
                  url: '/simulate',
                  type: 'POST',
                  data: JSON.stringify(userInput),
                  dataType: 'json',
                  contentType: 'application/json',
                  success: function(data) {
            
                    var userMatchesResults = [];
                    data.results.matches.forEach((element, index) => {
                      userMatchesResults.push('<h1 class="user-matches_result">' + 'Matches ' + index + ' number: ' + JSON.stringify(element) + '</h1>')
                    });
            
                    var $userMoneySpent = '<h1 id="user-money_spent">Money spent: ' + JSON.stringify(data.results.spent).toLocaleString() + '</h1>';
                    var $userMoneyWon = '<h1 id="user-money_won">Money won: ' + JSON.stringify(data.results.won).toLocaleString() + '</h1>';
            
                    var $results = $('<div>' + '<h1 id="results-header">YOUR RESULTS:</h1>' + userMatchesResults.join("") + '<br>' + $userMoneySpent + $userMoneyWon + '</div>');
                    $('.user-results').addClass('blackBorder').html($results);
                  },
            
                  error: function(data) {
                    $('.user-results').html(`<h1>${JSON.stringify(data.responseJSON)}</h1>`);
                  },
            
                });
        }

    })

})

