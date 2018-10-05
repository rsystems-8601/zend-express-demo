  $(document).ready(function() {
    var state = "";
    var closureReason = "";

    var client = AmeyoClient.init();
    $("#cancel").click(function() {
      closePopup();
    });
    $("#closureComment").on("change keyup paste", function() {
      closureReason = $(this).val();
      validateData();

    });
    $("#ticketStateList").change(function() {
      state = $("#ticketStateList option:selected").val();
      validateData();
    });

    $("#done").click(function() {
      var ticketUpdateData = {
        externalState: state,
        closureReason: closureReason
      }
      client.contextData.action("ticket", "sendEmailAndUpdate", {
        showSystemNotification: true,
        updateData: ticketUpdateData
      });
      closePopup();
    });

    client.globalData.get("ticketStates").then(function(data) {
      var closedStates = data["CLOSED"];
      closedStates.sort(function(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      populateTicketStates(closedStates);

    }).catch(function(data){
    	var notificationData = {
    		  type:"error",
    			content:"failed to get ticketStates"
    	};
    	client.interface.trigger("toastNotification",notificationData);
    	closePopup();
    });

    function populateTicketStates(closedStates) {
      var stateList = document.getElementById('ticketStateList');
      for (var i = 0; i < closedStates.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = closedStates[i];
        opt.value = closedStates[i];
        stateList.appendChild(opt);
      }
      $("#ticketStateList").material_select();
      $("#ticketStateList").change();
      validateData();
    }

    function closePopup() {
      client.instance.close("self");

    }

    function disableDoneButton(disable) {
      if (disable) {
        $("#done").prop("disabled", true);
      } else {
        $("#done").prop("disabled", false);
      }
    }

    function validateData() {
      if (closureReason.trim() == "" || state.trim() == "") {
        disableDoneButton(true);
      } else {
        disableDoneButton(false);

      }
    }

  });
