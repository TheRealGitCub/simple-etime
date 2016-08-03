function checkClocked() {
	$.ajax({
		url: '/devl/markt06/sandbox/adp-etime-api/adp.php',
		method: 'GET',
		data: {
			method: 'clocked-in'
		},
		success: function(data) {
			loadTimeCard();

			if (data.status == 'FAILED') {
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

function loadTimeCard() {
	$.ajax({
		url: '/devl/markt06/sandbox/adp-etime-api/adp.php',
		method: 'GET',
		data: {
			method: 'view-timecard'
		},
		success: function(data) {

			$("#data-payperiod .data").text(data.period);
			$("#data-totalhours .data").text(data.total);

			$("#timecard tbody").empty();
			$.each(data.shifts, function(i, day) {
				var dayInserted = false;
				$.each(day.shifts, function(j, shift) {
					var row = $("<tr></tr>");
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
					row.append("<td>" + day.dayTotal + "</td>");
					$("#timecard tbody").append(row);
				})
			});
		}
	})
}

$(document).ready(function() {
	checkClocked();

	$("#action-button").click(function(){
		$.ajax({
			url: '/devl/markt06/sandbox/adp-etime-api/adp.php',
			method: 'GET',
			data: {
				method: 'record-stamp'
			},
			success: function(data) {
				if (data.status == 'FAILED') {
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
