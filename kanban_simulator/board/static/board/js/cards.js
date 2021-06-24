var card_list = [];


// html template creation function
function createCardTemplate(card_model){
    var card_element = '<div class="card kanban_card draggable no_droppable_card" id="kb_card_' + card_model["pk"] +'">' +
    '<div class="card-body">' +
        '<h5 class="card-title">' + card_model["title"] + '</h5>' +
        '<p class="card-text"></p>' +
    '</div>' +
    '</div>';
    return card_element;
}

// in process...
function start_new_day(){
    // effort calculation + completing the task
    // ...

    current_day ++;
    var data = {"room": 0, "team": 1};
    var anl_comp = 0;
    var dev_comp = 0;
    var test_comp = 0;
        for (card in card_list){
            if (card["ready_day"] == current_day){
                if (card["analytic_remaining"] == card["analytic_completed"]
                && card["develop_remaining"] != card["develop_completed"]){
                    anl_comp += 1;
                    continue;
                }

                if (card["develop_remaining"] == card["develop_completed"]
                && card["test_remaining"] != card["test_completed"]){
                    dev_comp += 1;
                    continue;
                }

                if (card["test_remaining"] == card["test_completed"]){
                    test_comp += 1;
                    continue;
                }
            }
        }
}

// droppable behavior for sub_containers
$(function() {
    $('.droppable_anl_proc').droppable({
        accept: '.draggable',
        drop: function(event, ui){
            $(this).append(ui.draggable[0]);
            var child = $(this).children().last();
            child.removeAttr("style");
            child.removeClass("draggable");
            child.addClass("draggable_anl");

            var id = getIdByCardModel(child);
            var column_num = 1;
            var row_num = $(this).children().length - 1;
            moveCard(column_num, row_num, id);
            abilityToAddCharacters(child);

            $('.draggable_anl').draggable({revert: 'invalid'});
            }
    });

    $('.droppable_dev_proc').droppable({
        accept: '.draggable_anl_comp',
        drop: function(event, ui){
            $(this).append(ui.draggable[0]);
            var child = $(this).children().last();
            child.removeAttr("style");
            child.removeClass("draggable_anl_comp");
            child.addClass("draggable_dev");

            $('.draggable_dev').draggable({revert: 'invalid'});
            }
    });

    $('.droppable_test_proc').droppable({
        accept: '.draggable_dev_comp',
        drop: function(event, ui){
            $(this).append(ui.draggable[0]);
            var child = $(this).children().last();
            child.removeAttr("style");
            child.removeClass("draggable_dev_comp");
            child.addClass("draggable_test");

            $('.draggable_test').draggable({revert: 'invalid'});
            }
    });
});

// function which calls after moving card to the given position (server interaction)
function moveCard(column_number, row_number, id){
    changePositionInList(id, column_number, row_number);
    data = {"col_num": column_number,
            "row_num": row_number,
            "id": id,
            "team_id": team_id};
    $.ajax({
        type: "POST",
        url: "move_card",
        data: data,
        success: function(response){
            current_version += 1;
            console.log(current_version);
        },error: function(xhr, status, error) {
            alert("Error");
            console.log("error");
        }
    });

}

// function which adds to card an ability to 'accept' characters
function abilityToAddCharacters(card){
    card.removeClass("no_droppable_card");
    card.addClass("droppable_card");

    $('.droppable_card').droppable({
        accept: '.players',
        drop: function(event, ui){
            $(this).append(ui.draggable[0]);
            var child = $(this).children().last();
            child.removeAttr("style");
            child.css("position", "relative");

            var card_id = getIdByCardModel($(this));
            var role = characterDistinguish(child);
            if (players_list[role] != card_id){
                moveCharacter(role, card_id);
                players_list[role] = card_id;
            }

    }});
}

// function which is need for adding specific draggable classes to card,
// since card initially created with just 'draggable' class
function addDraggableAbility(card, card_template){
    $(card_template).removeClass("draggable");
    if (card["test_completed"] == card["test_remaining"]){
        $(card_template).addClass("no_draggable");
    }else if (card["develop_completed"] == card["develop_remaining"]){
        $(card_template).addClass("draggable_dev");
        abilityToAddCharacters($(card_template))
    }else if (card["analytic_completed"] == card["analytic_remaining"]){
        $(card_template).addClass("draggable_anl");
        abilityToAddCharacters($(card_template))
    }else if (card["analytic_completed"] == 0 && card["column_number"] != 0){
        $(card_template).addClass("draggable_anl");
        abilityToAddCharacters($(card_template))
    }else{
        $(card_template).addClass("draggable");
    }

    $('.draggable_anl').draggable({revert: 'invalid'});
    $('.draggable_dev').draggable({revert: 'invalid'});
    $('.draggable_test').draggable({revert: 'invalid'});
    $('.draggable').draggable({revert: 'invalid'});

}

// function which is responsible for changing the row position of the specified card (only in the list)
function changePositionInList(id, column_number, row_number){
    for (card in card_list){
        if (card["id"] == id){
            card["row_number"] = row_number;
            card["column_number"] = column_number;
            break;
        }
    }
}

function getIdByCardModel(card){
    return card.attr("id").substring(card.attr("id").lastIndexOf('_') + 1);

}

function test(){

}


