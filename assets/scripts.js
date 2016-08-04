function loadTimeCard() {
	$.ajax({
		url: 'adp-etime-api/adp.php',
		method: 'GET',
		data: {
			method: 'view-timecard'
		},
		success: function(data) {

			$("#data-payperiod .data").text(data.period);
			$("#data-totalhours .data").text(data.total.replace(":", " hours and ") + " minutes");

			$("#timecard tbody").empty();
			
			var rowType = 1;
			
			$.each(data.shifts, function(i, day) {
				var dayInserted = false;
				$.each(day.shifts, function(j, shift) {
					var row = $("<tr class='rowType"+ rowType +"'></tr>");
					if (!dayInserted) {
						row.append("<td><strong>" + i + "</strong></td>");
						dayInserted = true;
					}
					else {
						row.append("<td></td>");
					}
					row.append("<td>" + shift.timeIn + "</td>");
					row.append("<td>" + shift.timeOut + "</td>");
					row.append("<td>" + shift.shiftTotal + "</td>");
					row.append("<td></td>");
					$("#timecard tbody").append(row);
				});
				
				var timeLabel = $("<span class='label label-success'></span>")
					.append("<i class='fa fa-clock-o'></i>&nbsp;")
					.append(day.dayTotal);
				
				$("#timecard tbody tr:last-of-type td:last-of-type")
					.html(timeLabel);
					
				rowType = (rowType === 1 ? 2 : 1);
				
			});
		}
	});
}

function checkClocked() {
	$.ajax({
		url: 'adp-etime-api/adp.php',
		method: 'GET',
		data: {
			method: 'clocked-in'
		},
		success: function(data) {
			loadTimeCard();

			if (data.status === 'FAILED') {
				$("h1 span").text("Error Checking status");
				if (data.message) {
					$("h1 small").text(data.message);
				}
			}
			else if (data.clockedIn) {
				$("h1 span").text("Clocked In");
				$("h1 small").text("Since " + data.at);

				$("#action-button")
					.removeClass("disabled")
					.removeClass("btn-success")
					.addClass("btn-danger")
					.find("span").text("Clock Out Now");

				$("#button-icon")
					.removeClass("fa-square-o")
					.removeClass("fa-sign-in")
					.removeClass("fa-exclamation-triangle")
					.addClass("fa-sign-out");
			}
			else {
				$("h1").text("Clocked Out");

				$("#action-button")
					.removeClass("disabled")
					.removeClass("btn-danger")
					.addClass("btn-success")
					.find("span").text("Clock In Now");

				$("#button-icon")
					.removeClass("fa-square-o")
					.removeClass("fa-sign-out")
					.removeClass("fa-exclamation-triangle")
					.addClass("fa-sign-in");
			}
		}
	});
}


$(document).ready(function() {
	checkClocked();

	$("#action-button").click(function(){
		$.ajax({
			url: 'adp-etime-api/adp.php',
			method: 'GET',
			data: {
				method: 'record-stamp'
			},
			success: function(data) {
				if (data.status === 'FAILED') {
					$("#action-button")
						.addClass("disabled")
						.removeClass("btn-danger")
						.removeClass("btn-success")
						.find("span").text("Error!");
					$("#button-icon")
						.removeClass("fa-square-o")
						.removeClass("fa-sign-in")
						.removeClass("fa-sign-out")
						.addClass("fa-exclamation-triangle");
					$("h1 span").text("Error clocking in/out");
					if (data.message) {
						$("h1 small").text(data.message);
					}
				}
				else {
					checkClocked();
				}
			}
		});
	});

});
