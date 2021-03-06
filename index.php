<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Simple eTime for ADP</title>

		<script src="https://use.fontawesome.com/a7291476b9.js"></script>

		<script src="https://code.jquery.com/jquery-2.2.4.js"></script>

		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.4/flatly/bootstrap.min.css">

		<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>


		<script src="assets/scripts.js"></script>
		<link rel="stylesheet" href="assets/styles.css">

	</head>
	<body>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-4 col-lg-offset-1 col-lg-3">
					<br />
					<div class="well well-sm text-center">
						<h1><span>Loading...</span><small style="display:block;"></small></h1>
						<button id="action-button" class="btn btn-lg disabled">
							<i class="fa fa-fw fa-square-o" id="button-icon"></i>
							<span>Clock In/Out</span>
						</button>
						<br />&nbsp;
					</div>
					<ul class="list-group" id="timecard-summary">
						<li id="data-payperiod" class="list-group-item">
							<i class="fa fa-fw fa-calendar"></i>
							<span class="data">...</span>
						</li>
						<li id="data-totalhours" class="list-group-item">
							<i class="fa fa-fw fa-clock-o"></i>
							<span class="data">...</span>
						</li>
					</ul>
				</div>
				<div class="hidden-xs col-sm-8 col-lg-7">
					<br />
					<div class="well well-sm">
						<div class="table-responsive">
							<table id="timecard" class="table">
								<thead>
									<tr>
										<th>Date</th>
										<th>Time In</th>
										<th>Time Out</th>
										<th>Shift Total</th>
										<th>Day Total</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td colspan="5" class="text-center">Loading Timecard...</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
