$(document).ready(function () {
	/*
	* Dom is ready to manipulate
	*/

	let list = new Array();// to maintain booking spaces list
	let bookedSlots=list.length;// total booking slots
	let availableSlots=218;// total avaialble slots
	if($.cookie('parkopedia')){ 
		//to handle refresh event
		$("#userid").val('user@gmail.com');
		$('#pwd').val('password');
		setTimeout(function(){ $('#login').click()}, 100);
	}else{
		// if no cookie redirect to login page
		$("#container").show();
	}
	// Ajax Call to get the booking slots
	$.ajax({
        url: "http://localhost:8080/parkopedia/v1/slots",
        type: 'GET',
        dataType: 'json',
        success: function(res) {
			list=res;
			bookedSlots=list.length;
			availableSlots=218-bookedSlots;
        }
	});
	
	$("#login").on("click", function (event) {
		// login functionality handling
		event.preventDefault();
		let userid = $("#userid").val();
		let pwd = $("#pwd").val();
		let user = new Object();
		user.username = userid;
		user.password = pwd;
		$("#container").show();
		if ($("#userid").val() && $("#pwd").val()) {
			// Authenticate User
			var saveData = $.ajax({
				type: "POST",
				url: "http://localhost:8080/parkopedia/v1/user/auth",
				data: JSON.stringify(user),
				contentType: "application/json",
				async:false,
				success: function (resultData) {
					if(resultData==="Success"){
						$.cookie('parkopedia', 'QM987CFDRTBHUKOES81234', { expires: 7 });
					} else{
						$("#loginError").show();
						$("#loginError").text("Please provide valid credentials");
						return false;
					}
				},
			});
		} else {
			$("#loginError").show();
			return false;
		}
		if(saveData.responseText !== "Success"){
			return false;
		}

		// After Login Nav Bar Html
		$(".header").append(
			'<nav class="navbar navbar-expand-md navbar-light"><p class="navbar-brand">Vicarge Street</p> <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse"><span class="navbar-toggler-icon"></span>    </button>  <div class="collapse navbar-collapse" id="navbarCollapse">  <div class="navbar-nav">  <p id = "about" class="nav-item nav-link active">About</p>    <p id = "book-parking" class="nav-item nav-link">Book Parking</p>  <p id = "booking-list" class="nav-item nav-link">Booking List</p>       <p  id = "pricing" class="nav-item nav-link">Pricing</p>     <p id = "feedback" class="nav-item nav-link">Feedback</p><p  id = "reachus" class="nav-item nav-link">Reach Us</p> </div><div class="navbar-nav ml-auto"><p id = "logout" class="nav-item nav-link">Logout</p>    </div>  </div></nav>'
		);
		
		// main Container Html
		$("#container").html(
			'<br/><div class="LocationDetailsSection"><h3 class="LocationDetailsSection__title">Features</h3><div class="LocationDetailsFeatures"><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 62 80" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M60.598 36.244c-.95-.982-2.278-1.5-3.634-1.426l-16.417.92 9.035-10.367c1.287-1.475 1.655-3.444 1.157-5.203-.264-1.206-.988-2.302-2.1-3.003C48.604 17.14 27.042 4.52 27.042 4.52c-1.76-1.03-3.98-.804-5.498.56l-10.533 9.467c-1.94 1.744-2.11 4.743-.38 6.698 1.732 1.955 4.708 2.127 6.65.382l7.984-7.176 6.6 3.863-11.65 13.37c-4.833.795-9.18 3.038-12.593 6.273l6.085 6.13c2.75-2.52 6.403-4.057 10.405-4.057 8.536 0 15.48 6.996 15.48 15.597 0 4.032-1.525 7.712-4.026 10.483l6.084 6.13c4.054-4.34 6.542-10.182 6.542-16.613 0-3.83-.883-7.455-2.453-10.677l6.354-.356L50.548 63.7c-.21 2.61 1.72 4.9 4.31 5.112.13.01.26.016.388.016 2.427 0 4.487-1.88 4.688-4.36l1.984-24.528c.11-1.367-.37-2.714-1.32-3.696zm-8.72-20.322c4.352 0 7.88-3.556 7.88-7.94 0-4.387-3.528-7.942-7.88-7.942-4.354 0-7.882 3.555-7.882 7.94 0 4.386 3.528 7.942 7.88 7.942zM24.112 71.225c-8.536 0-15.48-6.997-15.48-15.598 0-3.242.986-6.254 2.672-8.752l-6.15-6.196C1.95 44.8.034 49.985.034 55.626c0 13.4 10.78 24.26 24.078 24.26 5.6 0 10.746-1.93 14.836-5.158l-6.152-6.198c-2.478 1.698-5.468 2.693-8.685 2.693z"></path></svg>Disabled spots</div><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 80 56" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M14.84 31.318c0-1.225-.436-2.273-1.308-3.144-.872-.872-1.92-1.308-3.144-1.308-1.224 0-2.272.436-3.144 1.308-.872.87-1.308 1.92-1.308 3.144 0 1.224.436 2.272 1.308 3.144.872.872 1.92 1.308 3.144 1.308 1.224 0 2.272-.436 3.144-1.308.872-.872 1.308-1.92 1.308-3.144zm.543-9.54h30.29l-2.654-10.643c-.04-.16-.18-.333-.42-.522-.237-.19-.446-.283-.625-.283H19.08c-.18 0-.388.094-.626.283-.24.19-.378.363-.418.522l-2.653 10.643zm38.04 9.54c0-1.225-.436-2.273-1.307-3.144-.872-.872-1.92-1.308-3.145-1.308-1.223 0-2.27.436-3.143 1.308-.872.87-1.308 1.92-1.308 3.144 0 1.224.435 2.272 1.307 3.144.872.872 1.92 1.308 3.144 1.308 1.226 0 2.274-.436 3.146-1.308.87-.872 1.307-1.92 1.307-3.144zm5.936 8.586c0 .278-.088.506-.262.685-.174.178-.396.268-.666.268H55.65v3.816c0 1.59-.542 2.94-1.624 4.054-1.082 1.113-2.396 1.67-3.942 1.67-1.546 0-2.86-.557-3.942-1.67-1.082-1.113-1.623-2.464-1.623-4.054v-3.816H14.84v3.816c0 1.59-.54 2.94-1.623 4.054-1.082 1.113-2.396 1.67-3.942 1.67-1.546 0-2.86-.557-3.942-1.67-1.082-1.113-1.623-2.464-1.623-4.054v-3.816H.927c-.27 0-.492-.09-.666-.27-.173-.178-.26-.406-.26-.684V28.456c0-1.85.633-3.424 1.898-4.725 1.266-1.3 2.797-1.952 4.594-1.952h.812l3.043-12.49c.445-1.87 1.45-3.435 3.015-4.697C14.927 3.33 16.656 2.7 18.55 2.7h22.26c1.893 0 3.622.63 5.188 1.893 1.565 1.263 2.57 2.828 3.014 4.697l3.043 12.49h.812c1.797 0 3.328.652 4.594 1.954 1.266 1.302 1.9 2.877 1.9 4.726v11.448zM72.356 0c-.156 0-.32.08-.46.235l-7.015 9.45c-.283.31-.064.582.39.582h4.818V45.64h-4.765c-.453 0-.673.272-.39.582l7.085 9.45c.17.31.514.31.797 0l7.085-9.45c.227-.31.046-.58-.407-.58h-4.87V10.266h4.816c.455 0 .675-.27.39-.58L72.818.234C72.677.08 72.513 0 72.357 0z"></path></svg>Height restrictions: 2.05m</div><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 81 81" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M81 25.018c0 1.628-.568 3.025-1.705 4.193L60.82 47.64l5.496 5.496c.78.78.786 2.044.002 2.828l-5.96 5.96c-5.006 5.006-10.987 7.87-17.945 8.592-6.957.72-13.276-.822-18.96-4.63L11.018 78.322c-2.343 2.342-6.144 2.338-8.484-.002l.146.147c-2.344-2.343-2.347-6.14-.003-8.484l12.438-12.437c-3.81-5.683-5.352-12.002-4.63-18.96.72-6.957 3.585-12.938 8.592-17.945l5.96-5.958c.78-.78 2.05-.775 2.827.002l5.496 5.496L51.79 1.705C52.956.568 54.353 0 55.98 0c1.628 0 3.01.568 4.147 1.705 1.135 1.136 1.703 2.526 1.703 4.17 0 1.643-.568 3.033-1.704 4.17L41.7 28.52 52.48 39.3l18.476-18.43c1.167-1.135 2.565-1.703 4.193-1.703 1.627 0 3.01.568 4.145 1.704C80.432 22.01 81 23.39 81 25.02z"></path></svg>Electric Car Charging</div><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 80 58" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M80 4.35v49.3c0 1.27-.58 2.16-1.74 2.673-.388.15-.76.227-1.117.227-.804 0-1.473-.287-2.01-.86l-17.99-18.262v7.522c0 3.595-1.258 6.668-3.772 9.22-2.514 2.554-5.543 3.83-9.084 3.83h-31.43c-3.54 0-6.57-1.276-9.084-3.83C1.257 51.62 0 48.546 0 44.95v-31.9c0-3.595 1.257-6.668 3.772-9.22C6.287 1.275 9.315 0 12.857 0h31.43c3.54 0 6.57 1.276 9.084 3.83 2.515 2.552 3.773 5.625 3.773 9.22v7.477L75.133 2.31c.537-.573 1.206-.86 2.01-.86.357 0 .73.076 1.116.227C79.42 2.19 80 3.08 80 4.35z"></path></svg>CCTV</div><div class="LocationDetailsFeatures__others"><span class="LocationDetailsFeatures__others --title">More features: </span><span>Lit</span></div></div></div><div class="LocationDetailsSection"><h3 class="LocationDetailsSection__title">Info</h3><p class="LocationDetailsInfo" style="color:white">Annual Reserved Ticket: &pound;1055.</p></div>'
		);

		$("#about").on("click", function () {
			// Menu About Click Functionality
			$(".nav-item").removeClass("active");
			$("#container").html(
				'<br/><div class="LocationDetailsSection"><h3 class="LocationDetailsSection__title">Features</h3><div class="LocationDetailsFeatures"><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 62 80" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M60.598 36.244c-.95-.982-2.278-1.5-3.634-1.426l-16.417.92 9.035-10.367c1.287-1.475 1.655-3.444 1.157-5.203-.264-1.206-.988-2.302-2.1-3.003C48.604 17.14 27.042 4.52 27.042 4.52c-1.76-1.03-3.98-.804-5.498.56l-10.533 9.467c-1.94 1.744-2.11 4.743-.38 6.698 1.732 1.955 4.708 2.127 6.65.382l7.984-7.176 6.6 3.863-11.65 13.37c-4.833.795-9.18 3.038-12.593 6.273l6.085 6.13c2.75-2.52 6.403-4.057 10.405-4.057 8.536 0 15.48 6.996 15.48 15.597 0 4.032-1.525 7.712-4.026 10.483l6.084 6.13c4.054-4.34 6.542-10.182 6.542-16.613 0-3.83-.883-7.455-2.453-10.677l6.354-.356L50.548 63.7c-.21 2.61 1.72 4.9 4.31 5.112.13.01.26.016.388.016 2.427 0 4.487-1.88 4.688-4.36l1.984-24.528c.11-1.367-.37-2.714-1.32-3.696zm-8.72-20.322c4.352 0 7.88-3.556 7.88-7.94 0-4.387-3.528-7.942-7.88-7.942-4.354 0-7.882 3.555-7.882 7.94 0 4.386 3.528 7.942 7.88 7.942zM24.112 71.225c-8.536 0-15.48-6.997-15.48-15.598 0-3.242.986-6.254 2.672-8.752l-6.15-6.196C1.95 44.8.034 49.985.034 55.626c0 13.4 10.78 24.26 24.078 24.26 5.6 0 10.746-1.93 14.836-5.158l-6.152-6.198c-2.478 1.698-5.468 2.693-8.685 2.693z"></path></svg>Disabled spots</div><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 80 56" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M14.84 31.318c0-1.225-.436-2.273-1.308-3.144-.872-.872-1.92-1.308-3.144-1.308-1.224 0-2.272.436-3.144 1.308-.872.87-1.308 1.92-1.308 3.144 0 1.224.436 2.272 1.308 3.144.872.872 1.92 1.308 3.144 1.308 1.224 0 2.272-.436 3.144-1.308.872-.872 1.308-1.92 1.308-3.144zm.543-9.54h30.29l-2.654-10.643c-.04-.16-.18-.333-.42-.522-.237-.19-.446-.283-.625-.283H19.08c-.18 0-.388.094-.626.283-.24.19-.378.363-.418.522l-2.653 10.643zm38.04 9.54c0-1.225-.436-2.273-1.307-3.144-.872-.872-1.92-1.308-3.145-1.308-1.223 0-2.27.436-3.143 1.308-.872.87-1.308 1.92-1.308 3.144 0 1.224.435 2.272 1.307 3.144.872.872 1.92 1.308 3.144 1.308 1.226 0 2.274-.436 3.146-1.308.87-.872 1.307-1.92 1.307-3.144zm5.936 8.586c0 .278-.088.506-.262.685-.174.178-.396.268-.666.268H55.65v3.816c0 1.59-.542 2.94-1.624 4.054-1.082 1.113-2.396 1.67-3.942 1.67-1.546 0-2.86-.557-3.942-1.67-1.082-1.113-1.623-2.464-1.623-4.054v-3.816H14.84v3.816c0 1.59-.54 2.94-1.623 4.054-1.082 1.113-2.396 1.67-3.942 1.67-1.546 0-2.86-.557-3.942-1.67-1.082-1.113-1.623-2.464-1.623-4.054v-3.816H.927c-.27 0-.492-.09-.666-.27-.173-.178-.26-.406-.26-.684V28.456c0-1.85.633-3.424 1.898-4.725 1.266-1.3 2.797-1.952 4.594-1.952h.812l3.043-12.49c.445-1.87 1.45-3.435 3.015-4.697C14.927 3.33 16.656 2.7 18.55 2.7h22.26c1.893 0 3.622.63 5.188 1.893 1.565 1.263 2.57 2.828 3.014 4.697l3.043 12.49h.812c1.797 0 3.328.652 4.594 1.954 1.266 1.302 1.9 2.877 1.9 4.726v11.448zM72.356 0c-.156 0-.32.08-.46.235l-7.015 9.45c-.283.31-.064.582.39.582h4.818V45.64h-4.765c-.453 0-.673.272-.39.582l7.085 9.45c.17.31.514.31.797 0l7.085-9.45c.227-.31.046-.58-.407-.58h-4.87V10.266h4.816c.455 0 .675-.27.39-.58L72.818.234C72.677.08 72.513 0 72.357 0z"></path></svg>Height restrictions: 2.05m</div><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 81 81" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M81 25.018c0 1.628-.568 3.025-1.705 4.193L60.82 47.64l5.496 5.496c.78.78.786 2.044.002 2.828l-5.96 5.96c-5.006 5.006-10.987 7.87-17.945 8.592-6.957.72-13.276-.822-18.96-4.63L11.018 78.322c-2.343 2.342-6.144 2.338-8.484-.002l.146.147c-2.344-2.343-2.347-6.14-.003-8.484l12.438-12.437c-3.81-5.683-5.352-12.002-4.63-18.96.72-6.957 3.585-12.938 8.592-17.945l5.96-5.958c.78-.78 2.05-.775 2.827.002l5.496 5.496L51.79 1.705C52.956.568 54.353 0 55.98 0c1.628 0 3.01.568 4.147 1.705 1.135 1.136 1.703 2.526 1.703 4.17 0 1.643-.568 3.033-1.704 4.17L41.7 28.52 52.48 39.3l18.476-18.43c1.167-1.135 2.565-1.703 4.193-1.703 1.627 0 3.01.568 4.145 1.704C80.432 22.01 81 23.39 81 25.02z"></path></svg>Electric Car Charging</div><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 80 58" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M80 4.35v49.3c0 1.27-.58 2.16-1.74 2.673-.388.15-.76.227-1.117.227-.804 0-1.473-.287-2.01-.86l-17.99-18.262v7.522c0 3.595-1.258 6.668-3.772 9.22-2.514 2.554-5.543 3.83-9.084 3.83h-31.43c-3.54 0-6.57-1.276-9.084-3.83C1.257 51.62 0 48.546 0 44.95v-31.9c0-3.595 1.257-6.668 3.772-9.22C6.287 1.275 9.315 0 12.857 0h31.43c3.54 0 6.57 1.276 9.084 3.83 2.515 2.552 3.773 5.625 3.773 9.22v7.477L75.133 2.31c.537-.573 1.206-.86 2.01-.86.357 0 .73.076 1.116.227C79.42 2.19 80 3.08 80 4.35z"></path></svg>CCTV</div><div class="LocationDetailsFeatures__others"><span class="LocationDetailsFeatures__others --title">More features: </span><span>Lit</span></div></div></div><div class="LocationDetailsSection"><h3 class="LocationDetailsSection__title">Info</h3><p class="LocationDetailsInfo">Annual Reserved Ticket: &pound;1055.</p></div>'
			);
			$("#about").addClass("active");
		});

		$("#feedback").on("click", function () {
		// Menu FeedBack Click Functionality
		$(".nav-item").removeClass("active");
			$("#container").html(
				'<label for="story" class="feedback-title">Feedback:</label> <br /><textarea id="story" name="story" rows="5" cols="33"></textarea> <br /> <button id="feedback-textarea" class="btn btn-primary">Submit</button>'
			);

			$("#feedback").addClass("active");

			$("#feedback-textarea").on("click", function () {
				let story = $("#story").val();
				let feedBack = new Object();
				feedBack.message = story;
				if (story) {

					// Saving the Feedback
					$.ajax({
						type: "POST",
						url: "http://localhost:8080/parkopedia/v1/feedback",
						data: JSON.stringify(feedBack),
						contentType: "application/json",
						success: function (resultData) {
						},
					});
					$("#story").val("");
					$("#container").html(
						'<label for="story" class="feedback-title">Feedback:</label> <br /><p style="color:#42b672">Thanks for feedback</p><textarea id="story" name="story" rows="5" cols="33"></textarea> <br /> <button id="feedback-textarea" class="btn btn-primary">Submit</button>'
					);
				}
			});
		});

		$("#reachus").on("click", function () {
			//Menu Reach Us Functionality
			$(".nav-item").removeClass("active");
			$("#container").html(
				'<br /> <img src="images/map.svg"/>Luton Borough Council <br /> &nbsp;&nbsp;&nbsp;Vicarage Street <br /> &nbsp;&nbsp;&nbsp;Luton <br /> &nbsp;&nbsp;&nbsp;LU1 3HZ <br /> <img width="16px" src="images/telephone.svg"/><a href="tel:+44 1582547272">+44 1582547272</a>'
			);
			$("#reachus").addClass("active");
		});

		$("#logout").on("click", function () {
			// Menu Logout Functionality
			$(".nav-item").removeClass("active");
			$.cookie('parkopedia', null);
			$.removeCookie("parkopedia");
			$("nav").html("");
			$("#container").html(
				'<div class="center-align"><br />logout was successful<br /> <a href="index.html">login again</a></div>'
			);
			$("#logout").addClass("active");
		});

		$("#book-parking").on("click", function () {
			// Menu Book Parking Functionality
			$(".nav-item").removeClass("active");

			let buttonHtml = 
				'<div class="center-align"><table><tr style="text-align:left"><td><img src="images/arrow.png"/>Total Number of Spaces </td><td>&nbsp;&nbsp;&nbsp;</td><td>'+218+'</td>'+
				'</tr><tr style="text-align:left"><td><img src="images/arrow.png"/>Total Number of Booked Spaces </td><td>&nbsp;&nbsp;&nbsp;</td><td><span id="bookedSlots">'+bookedSlots+'</span></td>'+
				'</tr><tr style="text-align:left"><td><img src="images/arrow.png"/>Total Number of Availabe Spaces </td><td>&nbsp;&nbsp;&nbsp;</td><td><span id="availableSlots">'+availableSlots+'</span></td>'+
				'</tr></table></div><div class="alert alert-success alert-dismissible fade show" role="alert"><strong></strong> Booking was successful<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span> </button></div></div> <br />';
			for (let i = 1; i <= 218; i++) {
				if (i < 10)
					buttonHtml +=
						'<button class="btn btn-primary space" id=' +
						i +
						' data-toggle="modal" data-id=' +
						i +
						' data-target="#myModal"" >00' +
						i +
						"</button>&nbsp; &nbsp;";
				else if (i < 100)
					buttonHtml +=
						'<button class="btn btn-primary space" id=' +
						i +
						" data-id=" +
						i +
						' data-toggle="modal" data-target="#myModal"" >0' +
						i +
						"</button>&nbsp; &nbsp;";
				else
					buttonHtml +=
						'<button class="btn btn-primary space" id=' +
						i +
						" data-id=" +
						i +
						' data-toggle="modal" data-target="#myModal"" >' +
						i +
						"</button>&nbsp; &nbsp;";
			}

			$("#container").html(
				buttonHtml +
				'<div class="modal fade" id="myModal">    <div class="modal-dialog">		<div class="modal-content">			<div class="modal-header">				<h2 class="modal-title">Book A Slot</h2>				<button type="button" class="close" data-dismiss="modal">x</button>			</div> 			<div class="modal-body">			<div class="">			<p class="modelerrormessage" style="color:red"></p>		<div class="form-group">						<input type="hidden" name="hiddenValue" id="hiddenValue" value="" />						<label for="customerName">Customer Name <sup style="color: red;">*</sup> </label>						<input type="text" required class="form-control" id="customerName" >					</div>					<div class="form-group">						<input type="hidden" name="hiddenValue" id="hiddenValue" value="" />						<label for="customerType">Type <sup style="color: red;">*</sup> </label>						<select class="custom-select" id="customerType">							<option selected="Student">Student</option>							<option value="Staff">Staff</option>						  </select>					</div>										<div class="form-group">						<input type="hidden" name="hiddenValue" id="hiddenValue" value="" />						<label for="regNum">Vehicle Registration<sup style="color: red;">*</sup> </label>						<input type="text" required class="form-control" id="regNum" maxlength="8" minlength="8" >					</div>										<div class="form-group">						<input type="hidden" name="hiddenValue" id="hiddenValue" value="" />						<label for="startime">Start Time <sup style="color: red;">*</sup></label>						<input type="datetime-local" onkeydown="return false" required class="form-control" id="fromtime" >					</div>					<div class="form-group">                    <label for="endtime">End Time <sup style="color: red;">*</sup> </label><input type="datetime-local" onkeydown="return false" required class="form-control" id="endtime" >					</div>                <form>				  <div class="card-details">					<h3 class="title">Credit Card Details</h3>					<div class="row">					  <div class="form-group col-sm-7">					   <div class="inner-addon right-addon">						<label for="card-holder">Card Holder <sup style="color: red;">*</sup> </label>                        <i class="far fa-user"></i>						<input id="card-holder" type="text" class="form-control" placeholder="Card Holder" aria-label="Card Holder" aria-describedby="basic-addon1">					   </div>						  </div>					  <div class="form-group col-sm-5">						<label for="">Expiration Date <sup style="color: red;">*</sup> </label>						<div class="input-group expiration-date">						  <input type="text" class="form-control" placeholder="MM" aria-label="MM" id = "expiration-month" aria-describedby="basic-addon1">						 					  <input type="text" class="form-control" id = "expiration-year" placeholder="YY" aria-label="YY" aria-describedby="basic-addon1">						</div>					  </div>					  <div class="form-group col-sm-8">					   <div class="inner-addon right-addon">						<label for="card-number">Card Number <sup style="color: red;">*</sup> </label>                        <i class="far fa-credit-card"></i>						<input id="card-number" type="text" class="form-control" placeholder="Card Number" aria-label="Card Holder" aria-describedby="basic-addon1">					   </div>						  </div>					  <div class="form-group col-sm-4">						<label for="cvc">CVC <sup style="color: red;">*</sup> </label>						<input id="cvc" type="password" class="form-control" placeholder="CVC" aria-label="Card Holder" aria-describedby="basic-addon1">					  </div>					</div>				  </div>				</form>  </div>        <div class="modal-footer">         <button type="button"  id="booksubmit" class="btn btn-primary" data-dismiss="modal">Submit</button>  <button type="button" class="close-button btn btn-danger" data-dismiss="modal">Cancel</button>        </div>              </div>    </div>  </div>'
			);

			for (let slot of list) {
				$("#" + slot.parkingSpace).removeClass("btn-primary");

				$("#" + slot.parkingSpace).addClass("btn-warning");
			}
			$("#booksubmit").on("click", function (event) {
				// Populating,Saving and Validating Parking Slot Object
				let id = $("#hiddenValue").val();
				let startTime = $("#fromtime").val();
				let endTime = $("#endtime").val();
				let customerName = $("#customerName").val();
				let type = $("#customerType").val();
				let regNum = $("#regNum").val();
				let cardHolder = $("#card-holder").val();
				let expirationMonth = $("#expiration-month").val();
				let expirationYear = $("#expiration-year").val();
				let cardNumber = $("#card-number").val();
				let cvc = $("#cvc").val();

				var parkingslot = new Object();

				if (
					id &&
					startTime &&
					endTime &&
					customerName &&
					type &&
					regNum &&
					cardHolder &&
					expirationMonth &&
					expirationYear &&
					cardNumber &&
					cvc
				) {
				} else {
					$(".modelerrormessage").text("Please provide the required fields");
					return false;
				}
				if (regNum.length < 8) {
					$(".modelerrormessage").text(
						"Vehicle Registration Number must be 8 characters"
					);
					return false;
				}
				$(".modelerrormessage").text("");
				parkingslot.parkingSpace = id;
				parkingslot.startTime = startTime;
				parkingslot.endTime = endTime;
				parkingslot.customerName = customerName;
				parkingslot.type = type;
				parkingslot.regNum = regNum;
				bookedSlots=bookedSlots+1;
				availableSlots=availableSlots-1;
				$('#bookedSlots').text(bookedSlots);
				$('#availableSlots').text(availableSlots);
				list.push(parkingslot);
				$.ajax({
					type: "POST",
					url: "http://localhost:8080/parkopedia/v1/slots",
					data: JSON.stringify(parkingslot),
					contentType: "application/json",
					success: function (resultData) {
						console.log(resultData.id);
					},
				});
				
				$(".alert").show();
			});

			$(".space").on("click", function (event) {
				// Showing the Model popup to Book Slot
				$("#fromtime").val("");
				$("#endtime").val("");
				$("#customerName").val("");
				$("#regNum").val("");
				$("#card-holder").val("");
				$("#expiration-month").val("");
				$("#expiration-year").val("");
				$("#card-number").val("");
				$("#cvc").val("");
				if ($(this).hasClass("btn-warning")) {
					return false;
				}
				let data_id = $(this).data("id");
				$(".modal-body #hiddenValue").val(data_id);
				$(this).addClass("btn-warning");
			});

			$(".close-button, .close").on("click", function (event) {
				//Close Button Functionality
				let id = $("#hiddenValue").val();
				$("#" + id).removeClass("btn-warning");
				$("#" + id).addClass("btn-primary");
			});

			$("#book-parking").addClass("active");
		});

		$("#pricing").on("click", function () {
			//Menu Pricing CLick Event Handling
			$(".nav-item").removeClass("active");

			$("#container").html(
				'<div><p class="prices">Prices</p><p class="pricessubheading">Mon-Fri 08:00 - 18:00</p><table><tr><td>1 Hour..........................&pound;1.10</td></tr><tr><td>2 Hours........................&pound;1.70</td></tr><tr><td>3 Hours........................&pound;2.20</td></tr><tr><td>4 Hours........................&pound;2.70</td></tr><tr><td>5 Hours........................&pound;3.90</td></tr><tr><td>Max...............................&pound;7.70</td></tr><tr><td>Week.............................&pound;31.00</td></tr><tr><td>4 Weeks........................&pound;104.50</td></tr><tr><td>Quarter..........................&pound;275.00</td></tr><tr><td>Year..................................&pound;1000.00</td></tr><tr><td>Holiday..........................&pound;1.10</td></tr></table><br/><br/><p class="pricessubheading">Sat 08:00 - 18:00</p><table><tr><td>10 Hours.......................&pound;2.70</td></tr><tr><td>Holiday..........................&pound;1.10</td></tr><table><br/><br/><p class="pricessubheading">Sun 08:00 - 18:00</p><table><tr><td>10 Hours........................&pound;1.10</td></tr></table><br /><br /><p class="free">Free outside these hours</p></div>'
			);
			$("#pricing").addClass("active");
		});

		$("#booking-list").on("click", function () {
			// Menu Bookig List Click Event Handling
			$(".nav-item").removeClass("active");

			let html =
				" <br /><div class='md-form active-cyan active-cyan-2 mb-3'><input id='myInput' class='form-control' type='text' placeholder='Search..'></div><br/><table id = 'booking-list-table'>";
			html +=
				'<thead><tr class="booking-list-row"><th>Parking Space</th><th>Customer Name</th><th>Type</th><th>Vehicle Registration Number</th><th>Start Time</th><th>End Time</th></tr></thead><tbody id = "myTable">';
			for (let slot of list) {
				html +=
					'<tr class="booling-list-row"><td>' +
					slot.parkingSpace +
					"</td><td>" +
					slot.customerName +
					"</td><td>" +
					slot.type +
					"</td><td>" +
					slot.regNum +
					"</td><td>" +
					slot.startTime +
					"</td><td>" +
					slot.endTime +
					"</td></tr>";
			}
			html += "</tbody></table>";

			$("#container").html(html);
			$("#booking-list").addClass("active");
			// Search Functionality
			$("#myInput").on("keyup", function () {
				var value = $(this).val().toLowerCase();
				$("#myTable tr").filter(function () {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
				});
			});
		});
	});
});
$(document).ready(function () {
	let list = new Array();
	let bookedSlots=list.length;
	let availableSlots=218;
	if($.cookie('parkopedia')){
		$("#userid").val('user@gmail.com');
		$('#pwd').val('password');
		setTimeout(function(){ $('#login').click()}, 100);
	}else{
		$("#container").show();
	}
	$.ajax({
        url: "http://localhost:8080/parkopedia/v1/slots",
        type: 'GET',
        dataType: 'json',
        success: function(res) {
			list=res;
			bookedSlots=list.length;
			availableSlots=218-bookedSlots;
        }
	});
	
	$("#login").on("click", function (event) {
		event.preventDefault();
		let userid = $("#userid").val();
		let pwd = $("#pwd").val();
		let user = new Object();
		user.username = userid;
		user.password = pwd;
		$("#container").show();
		if ($("#userid").val() && $("#pwd").val()) {
			var saveData = $.ajax({
				type: "POST",
				url: "http://localhost:8080/parkopedia/v1/user/auth",
				data: JSON.stringify(user),
				contentType: "application/json",
				async:false,
				success: function (resultData) {
					if(resultData==="Success"){
						$.cookie('parkopedia', 'QM987CFDRTBHUKOES81234', { expires: 7 });
					} else{
						$("#loginError").show();
						$("#loginError").text("Please provide valid credentials");
						return false;
					}
				},
			});
		} else {
			$("#loginError").show();
			return false;
		}
		if(saveData.responseText !== "Success"){
			return false;
		}
		$(".header").append(
			'<nav class="navbar navbar-expand-md navbar-light"><p class="navbar-brand">Vicarge Street</p> <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse"><span class="navbar-toggler-icon"></span>    </button>  <div class="collapse navbar-collapse" id="navbarCollapse">  <div class="navbar-nav">  <p id = "about" class="nav-item nav-link active">About</p>    <p id = "book-parking" class="nav-item nav-link">Book Parking</p>  <p id = "booking-list" class="nav-item nav-link">Booking List</p>       <p  id = "pricing" class="nav-item nav-link">Pricing</p>     <p id = "feedback" class="nav-item nav-link">Feedback</p><p  id = "reachus" class="nav-item nav-link">Reach Us</p> </div><div class="navbar-nav ml-auto"><p id = "logout" class="nav-item nav-link">Logout</p>    </div>  </div></nav>'
		);

		$("#container").html(
			'<br/><div class="LocationDetailsSection"><h3 class="LocationDetailsSection__title">Features</h3><div class="LocationDetailsFeatures"><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 62 80" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M60.598 36.244c-.95-.982-2.278-1.5-3.634-1.426l-16.417.92 9.035-10.367c1.287-1.475 1.655-3.444 1.157-5.203-.264-1.206-.988-2.302-2.1-3.003C48.604 17.14 27.042 4.52 27.042 4.52c-1.76-1.03-3.98-.804-5.498.56l-10.533 9.467c-1.94 1.744-2.11 4.743-.38 6.698 1.732 1.955 4.708 2.127 6.65.382l7.984-7.176 6.6 3.863-11.65 13.37c-4.833.795-9.18 3.038-12.593 6.273l6.085 6.13c2.75-2.52 6.403-4.057 10.405-4.057 8.536 0 15.48 6.996 15.48 15.597 0 4.032-1.525 7.712-4.026 10.483l6.084 6.13c4.054-4.34 6.542-10.182 6.542-16.613 0-3.83-.883-7.455-2.453-10.677l6.354-.356L50.548 63.7c-.21 2.61 1.72 4.9 4.31 5.112.13.01.26.016.388.016 2.427 0 4.487-1.88 4.688-4.36l1.984-24.528c.11-1.367-.37-2.714-1.32-3.696zm-8.72-20.322c4.352 0 7.88-3.556 7.88-7.94 0-4.387-3.528-7.942-7.88-7.942-4.354 0-7.882 3.555-7.882 7.94 0 4.386 3.528 7.942 7.88 7.942zM24.112 71.225c-8.536 0-15.48-6.997-15.48-15.598 0-3.242.986-6.254 2.672-8.752l-6.15-6.196C1.95 44.8.034 49.985.034 55.626c0 13.4 10.78 24.26 24.078 24.26 5.6 0 10.746-1.93 14.836-5.158l-6.152-6.198c-2.478 1.698-5.468 2.693-8.685 2.693z"></path></svg>Disabled spots</div><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 80 56" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M14.84 31.318c0-1.225-.436-2.273-1.308-3.144-.872-.872-1.92-1.308-3.144-1.308-1.224 0-2.272.436-3.144 1.308-.872.87-1.308 1.92-1.308 3.144 0 1.224.436 2.272 1.308 3.144.872.872 1.92 1.308 3.144 1.308 1.224 0 2.272-.436 3.144-1.308.872-.872 1.308-1.92 1.308-3.144zm.543-9.54h30.29l-2.654-10.643c-.04-.16-.18-.333-.42-.522-.237-.19-.446-.283-.625-.283H19.08c-.18 0-.388.094-.626.283-.24.19-.378.363-.418.522l-2.653 10.643zm38.04 9.54c0-1.225-.436-2.273-1.307-3.144-.872-.872-1.92-1.308-3.145-1.308-1.223 0-2.27.436-3.143 1.308-.872.87-1.308 1.92-1.308 3.144 0 1.224.435 2.272 1.307 3.144.872.872 1.92 1.308 3.144 1.308 1.226 0 2.274-.436 3.146-1.308.87-.872 1.307-1.92 1.307-3.144zm5.936 8.586c0 .278-.088.506-.262.685-.174.178-.396.268-.666.268H55.65v3.816c0 1.59-.542 2.94-1.624 4.054-1.082 1.113-2.396 1.67-3.942 1.67-1.546 0-2.86-.557-3.942-1.67-1.082-1.113-1.623-2.464-1.623-4.054v-3.816H14.84v3.816c0 1.59-.54 2.94-1.623 4.054-1.082 1.113-2.396 1.67-3.942 1.67-1.546 0-2.86-.557-3.942-1.67-1.082-1.113-1.623-2.464-1.623-4.054v-3.816H.927c-.27 0-.492-.09-.666-.27-.173-.178-.26-.406-.26-.684V28.456c0-1.85.633-3.424 1.898-4.725 1.266-1.3 2.797-1.952 4.594-1.952h.812l3.043-12.49c.445-1.87 1.45-3.435 3.015-4.697C14.927 3.33 16.656 2.7 18.55 2.7h22.26c1.893 0 3.622.63 5.188 1.893 1.565 1.263 2.57 2.828 3.014 4.697l3.043 12.49h.812c1.797 0 3.328.652 4.594 1.954 1.266 1.302 1.9 2.877 1.9 4.726v11.448zM72.356 0c-.156 0-.32.08-.46.235l-7.015 9.45c-.283.31-.064.582.39.582h4.818V45.64h-4.765c-.453 0-.673.272-.39.582l7.085 9.45c.17.31.514.31.797 0l7.085-9.45c.227-.31.046-.58-.407-.58h-4.87V10.266h4.816c.455 0 .675-.27.39-.58L72.818.234C72.677.08 72.513 0 72.357 0z"></path></svg>Height restrictions: 2.05m</div><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 81 81" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M81 25.018c0 1.628-.568 3.025-1.705 4.193L60.82 47.64l5.496 5.496c.78.78.786 2.044.002 2.828l-5.96 5.96c-5.006 5.006-10.987 7.87-17.945 8.592-6.957.72-13.276-.822-18.96-4.63L11.018 78.322c-2.343 2.342-6.144 2.338-8.484-.002l.146.147c-2.344-2.343-2.347-6.14-.003-8.484l12.438-12.437c-3.81-5.683-5.352-12.002-4.63-18.96.72-6.957 3.585-12.938 8.592-17.945l5.96-5.958c.78-.78 2.05-.775 2.827.002l5.496 5.496L51.79 1.705C52.956.568 54.353 0 55.98 0c1.628 0 3.01.568 4.147 1.705 1.135 1.136 1.703 2.526 1.703 4.17 0 1.643-.568 3.033-1.704 4.17L41.7 28.52 52.48 39.3l18.476-18.43c1.167-1.135 2.565-1.703 4.193-1.703 1.627 0 3.01.568 4.145 1.704C80.432 22.01 81 23.39 81 25.02z"></path></svg>Electric Car Charging</div><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 80 58" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M80 4.35v49.3c0 1.27-.58 2.16-1.74 2.673-.388.15-.76.227-1.117.227-.804 0-1.473-.287-2.01-.86l-17.99-18.262v7.522c0 3.595-1.258 6.668-3.772 9.22-2.514 2.554-5.543 3.83-9.084 3.83h-31.43c-3.54 0-6.57-1.276-9.084-3.83C1.257 51.62 0 48.546 0 44.95v-31.9c0-3.595 1.257-6.668 3.772-9.22C6.287 1.275 9.315 0 12.857 0h31.43c3.54 0 6.57 1.276 9.084 3.83 2.515 2.552 3.773 5.625 3.773 9.22v7.477L75.133 2.31c.537-.573 1.206-.86 2.01-.86.357 0 .73.076 1.116.227C79.42 2.19 80 3.08 80 4.35z"></path></svg>CCTV</div><div class="LocationDetailsFeatures__others"><span class="LocationDetailsFeatures__others --title">More features: </span><span>Lit</span></div></div></div><div class="LocationDetailsSection"><h3 class="LocationDetailsSection__title">Info</h3><p class="LocationDetailsInfo" style="color:white">Annual Reserved Ticket: &pound;1055.</p></div>'
		);

		$("#about").on("click", function () {
			$(".nav-item").removeClass("active");
			$("#container").html(
				'<br/><div class="LocationDetailsSection"><h3 class="LocationDetailsSection__title">Features</h3><div class="LocationDetailsFeatures"><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 62 80" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M60.598 36.244c-.95-.982-2.278-1.5-3.634-1.426l-16.417.92 9.035-10.367c1.287-1.475 1.655-3.444 1.157-5.203-.264-1.206-.988-2.302-2.1-3.003C48.604 17.14 27.042 4.52 27.042 4.52c-1.76-1.03-3.98-.804-5.498.56l-10.533 9.467c-1.94 1.744-2.11 4.743-.38 6.698 1.732 1.955 4.708 2.127 6.65.382l7.984-7.176 6.6 3.863-11.65 13.37c-4.833.795-9.18 3.038-12.593 6.273l6.085 6.13c2.75-2.52 6.403-4.057 10.405-4.057 8.536 0 15.48 6.996 15.48 15.597 0 4.032-1.525 7.712-4.026 10.483l6.084 6.13c4.054-4.34 6.542-10.182 6.542-16.613 0-3.83-.883-7.455-2.453-10.677l6.354-.356L50.548 63.7c-.21 2.61 1.72 4.9 4.31 5.112.13.01.26.016.388.016 2.427 0 4.487-1.88 4.688-4.36l1.984-24.528c.11-1.367-.37-2.714-1.32-3.696zm-8.72-20.322c4.352 0 7.88-3.556 7.88-7.94 0-4.387-3.528-7.942-7.88-7.942-4.354 0-7.882 3.555-7.882 7.94 0 4.386 3.528 7.942 7.88 7.942zM24.112 71.225c-8.536 0-15.48-6.997-15.48-15.598 0-3.242.986-6.254 2.672-8.752l-6.15-6.196C1.95 44.8.034 49.985.034 55.626c0 13.4 10.78 24.26 24.078 24.26 5.6 0 10.746-1.93 14.836-5.158l-6.152-6.198c-2.478 1.698-5.468 2.693-8.685 2.693z"></path></svg>Disabled spots</div><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 80 56" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M14.84 31.318c0-1.225-.436-2.273-1.308-3.144-.872-.872-1.92-1.308-3.144-1.308-1.224 0-2.272.436-3.144 1.308-.872.87-1.308 1.92-1.308 3.144 0 1.224.436 2.272 1.308 3.144.872.872 1.92 1.308 3.144 1.308 1.224 0 2.272-.436 3.144-1.308.872-.872 1.308-1.92 1.308-3.144zm.543-9.54h30.29l-2.654-10.643c-.04-.16-.18-.333-.42-.522-.237-.19-.446-.283-.625-.283H19.08c-.18 0-.388.094-.626.283-.24.19-.378.363-.418.522l-2.653 10.643zm38.04 9.54c0-1.225-.436-2.273-1.307-3.144-.872-.872-1.92-1.308-3.145-1.308-1.223 0-2.27.436-3.143 1.308-.872.87-1.308 1.92-1.308 3.144 0 1.224.435 2.272 1.307 3.144.872.872 1.92 1.308 3.144 1.308 1.226 0 2.274-.436 3.146-1.308.87-.872 1.307-1.92 1.307-3.144zm5.936 8.586c0 .278-.088.506-.262.685-.174.178-.396.268-.666.268H55.65v3.816c0 1.59-.542 2.94-1.624 4.054-1.082 1.113-2.396 1.67-3.942 1.67-1.546 0-2.86-.557-3.942-1.67-1.082-1.113-1.623-2.464-1.623-4.054v-3.816H14.84v3.816c0 1.59-.54 2.94-1.623 4.054-1.082 1.113-2.396 1.67-3.942 1.67-1.546 0-2.86-.557-3.942-1.67-1.082-1.113-1.623-2.464-1.623-4.054v-3.816H.927c-.27 0-.492-.09-.666-.27-.173-.178-.26-.406-.26-.684V28.456c0-1.85.633-3.424 1.898-4.725 1.266-1.3 2.797-1.952 4.594-1.952h.812l3.043-12.49c.445-1.87 1.45-3.435 3.015-4.697C14.927 3.33 16.656 2.7 18.55 2.7h22.26c1.893 0 3.622.63 5.188 1.893 1.565 1.263 2.57 2.828 3.014 4.697l3.043 12.49h.812c1.797 0 3.328.652 4.594 1.954 1.266 1.302 1.9 2.877 1.9 4.726v11.448zM72.356 0c-.156 0-.32.08-.46.235l-7.015 9.45c-.283.31-.064.582.39.582h4.818V45.64h-4.765c-.453 0-.673.272-.39.582l7.085 9.45c.17.31.514.31.797 0l7.085-9.45c.227-.31.046-.58-.407-.58h-4.87V10.266h4.816c.455 0 .675-.27.39-.58L72.818.234C72.677.08 72.513 0 72.357 0z"></path></svg>Height restrictions: 2.05m</div><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 81 81" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M81 25.018c0 1.628-.568 3.025-1.705 4.193L60.82 47.64l5.496 5.496c.78.78.786 2.044.002 2.828l-5.96 5.96c-5.006 5.006-10.987 7.87-17.945 8.592-6.957.72-13.276-.822-18.96-4.63L11.018 78.322c-2.343 2.342-6.144 2.338-8.484-.002l.146.147c-2.344-2.343-2.347-6.14-.003-8.484l12.438-12.437c-3.81-5.683-5.352-12.002-4.63-18.96.72-6.957 3.585-12.938 8.592-17.945l5.96-5.958c.78-.78 2.05-.775 2.827.002l5.496 5.496L51.79 1.705C52.956.568 54.353 0 55.98 0c1.628 0 3.01.568 4.147 1.705 1.135 1.136 1.703 2.526 1.703 4.17 0 1.643-.568 3.033-1.704 4.17L41.7 28.52 52.48 39.3l18.476-18.43c1.167-1.135 2.565-1.703 4.193-1.703 1.627 0 3.01.568 4.145 1.704C80.432 22.01 81 23.39 81 25.02z"></path></svg>Electric Car Charging</div><div class="LocationDetailsFeatures__feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 80 58" class="LocationDetailsFeatures__feature__icon"><path fill="white" d="M80 4.35v49.3c0 1.27-.58 2.16-1.74 2.673-.388.15-.76.227-1.117.227-.804 0-1.473-.287-2.01-.86l-17.99-18.262v7.522c0 3.595-1.258 6.668-3.772 9.22-2.514 2.554-5.543 3.83-9.084 3.83h-31.43c-3.54 0-6.57-1.276-9.084-3.83C1.257 51.62 0 48.546 0 44.95v-31.9c0-3.595 1.257-6.668 3.772-9.22C6.287 1.275 9.315 0 12.857 0h31.43c3.54 0 6.57 1.276 9.084 3.83 2.515 2.552 3.773 5.625 3.773 9.22v7.477L75.133 2.31c.537-.573 1.206-.86 2.01-.86.357 0 .73.076 1.116.227C79.42 2.19 80 3.08 80 4.35z"></path></svg>CCTV</div><div class="LocationDetailsFeatures__others"><span class="LocationDetailsFeatures__others --title">More features: </span><span>Lit</span></div></div></div><div class="LocationDetailsSection"><h3 class="LocationDetailsSection__title">Info</h3><p class="LocationDetailsInfo">Annual Reserved Ticket: &pound;1055.</p></div>'
			);
			$("#about").addClass("active");
		});

		$("#feedback").on("click", function () {
			$(".nav-item").removeClass("active");
			$("#container").html(
				'<label for="story" class="feedback-title">Feedback:</label> <br /><textarea id="story" name="story" rows="5" cols="33"></textarea> <br /> <button id="feedback-textarea" class="btn btn-primary">Submit</button>'
			);

			$("#feedback").addClass("active");

			$("#feedback-textarea").on("click", function () {
				let story = $("#story").val();
				let feedBack = new Object();
				feedBack.message = story;
				if (story) {
					$.ajax({
						type: "POST",
						url: "http://localhost:8080/parkopedia/v1/feedback",
						data: JSON.stringify(feedBack),
						contentType: "application/json",
						success: function (resultData) {
						},
					});
					$("#story").val("");
					$("#container").html(
						'<label for="story" class="feedback-title">Feedback:</label> <br /><p style="color:#42b672">Thanks for feedback</p><textarea id="story" name="story" rows="5" cols="33"></textarea> <br /> <button id="feedback-textarea" class="btn btn-primary">Submit</button>'
					);
				}
			});
		});

		$("#reachus").on("click", function () {
			$(".nav-item").removeClass("active");
			$("#container").html(
				'<br /> <img src="images/map.svg"/>Luton Borough Council <br /> &nbsp;&nbsp;&nbsp;Vicarage Street <br /> &nbsp;&nbsp;&nbsp;Luton <br /> &nbsp;&nbsp;&nbsp;LU1 3HZ <br /> <img width="16px" src="images/telephone.svg"/><a href="tel:+44 1582547272">+44 1582547272</a>'
			);
			$("#reachus").addClass("active");
		});

		$("#logout").on("click", function () {
			$(".nav-item").removeClass("active");
			$.cookie('parkopedia', null);
			$.removeCookie("parkopedia");
			$("nav").html("");
			$("#container").html(
				'<div class="center-align"><br />logout was successful<br /> <a href="index.html">login again</a></div>'
			);
			$("#logout").addClass("active");
		});

		$("#book-parking").on("click", function () {
			$(".nav-item").removeClass("active");

			let buttonHtml = 
				'<div class="center-align"><table><tr style="text-align:left"><td><img src="images/arrow.png"/>Total Number of Spaces </td><td>&nbsp;&nbsp;&nbsp;</td><td>'+218+'</td>'+
				'</tr><tr style="text-align:left"><td><img src="images/arrow.png"/>Total Number of Booked Spaces </td><td>&nbsp;&nbsp;&nbsp;</td><td><span id="bookedSlots">'+bookedSlots+'</span></td>'+
				'</tr><tr style="text-align:left"><td><img src="images/arrow.png"/>Total Number of Availabe Spaces </td><td>&nbsp;&nbsp;&nbsp;</td><td><span id="availableSlots">'+availableSlots+'</span></td>'+
				'</tr></table></div><div class="alert alert-success alert-dismissible fade show" role="alert"><strong></strong> Booking was successful<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span> </button></div></div> <br />';
			for (let i = 1; i <= 218; i++) {
				if (i < 10)
					buttonHtml +=
						'<button class="btn btn-primary space" id=' +
						i +
						' data-toggle="modal" data-id=' +
						i +
						' data-target="#myModal"" >00' +
						i +
						"</button>&nbsp; &nbsp;";
				else if (i < 100)
					buttonHtml +=
						'<button class="btn btn-primary space" id=' +
						i +
						" data-id=" +
						i +
						' data-toggle="modal" data-target="#myModal"" >0' +
						i +
						"</button>&nbsp; &nbsp;";
				else
					buttonHtml +=
						'<button class="btn btn-primary space" id=' +
						i +
						" data-id=" +
						i +
						' data-toggle="modal" data-target="#myModal"" >' +
						i +
						"</button>&nbsp; &nbsp;";
			}

			$("#container").html(
				buttonHtml +
				'<div class="modal fade" id="myModal">    <div class="modal-dialog">		<div class="modal-content">			<div class="modal-header">				<h2 class="modal-title">Book A Slot</h2>				<button type="button" class="close" data-dismiss="modal">x</button>			</div> 			<div class="modal-body">			<div class="">			<p class="modelerrormessage" style="color:red"></p>		<div class="form-group">						<input type="hidden" name="hiddenValue" id="hiddenValue" value="" />						<label for="customerName">Customer Name <sup style="color: red;">*</sup> </label>						<input type="text" required class="form-control" id="customerName" >					</div>					<div class="form-group">						<input type="hidden" name="hiddenValue" id="hiddenValue" value="" />						<label for="customerType">Type <sup style="color: red;">*</sup> </label>						<select class="custom-select" id="customerType">							<option selected="Student">Student</option>							<option value="Staff">Staff</option>						  </select>					</div>										<div class="form-group">						<input type="hidden" name="hiddenValue" id="hiddenValue" value="" />						<label for="regNum">Vehicle Registration<sup style="color: red;">*</sup> </label>						<input type="text" required class="form-control" id="regNum" maxlength="8" minlength="8" >					</div>										<div class="form-group">						<input type="hidden" name="hiddenValue" id="hiddenValue" value="" />						<label for="startime">Start Time <sup style="color: red;">*</sup></label>						<input type="datetime-local" onkeydown="return false" required class="form-control" id="fromtime" >					</div>					<div class="form-group">                    <label for="endtime">End Time <sup style="color: red;">*</sup> </label><input type="datetime-local" onkeydown="return false" required class="form-control" id="endtime" >					</div>                <form>				  <div class="card-details">					<h3 class="title">Credit Card Details</h3>					<div class="row">					  <div class="form-group col-sm-7">					   <div class="inner-addon right-addon">						<label for="card-holder">Card Holder <sup style="color: red;">*</sup> </label>                        <i class="far fa-user"></i>						<input id="card-holder" type="text" class="form-control" placeholder="Card Holder" aria-label="Card Holder" aria-describedby="basic-addon1">					   </div>						  </div>					  <div class="form-group col-sm-5">						<label for="">Expiration Date <sup style="color: red;">*</sup> </label>						<div class="input-group expiration-date">						  <input type="text" class="form-control" placeholder="MM" aria-label="MM" id = "expiration-month" aria-describedby="basic-addon1">						 					  <input type="text" class="form-control" id = "expiration-year" placeholder="YY" aria-label="YY" aria-describedby="basic-addon1">						</div>					  </div>					  <div class="form-group col-sm-8">					   <div class="inner-addon right-addon">						<label for="card-number">Card Number <sup style="color: red;">*</sup> </label>                        <i class="far fa-credit-card"></i>						<input id="card-number" type="text" class="form-control" placeholder="Card Number" aria-label="Card Holder" aria-describedby="basic-addon1">					   </div>						  </div>					  <div class="form-group col-sm-4">						<label for="cvc">CVC <sup style="color: red;">*</sup> </label>						<input id="cvc" type="password" class="form-control" placeholder="CVC" aria-label="Card Holder" aria-describedby="basic-addon1">					  </div>					</div>				  </div>				</form>  </div>        <div class="modal-footer">         <button type="button"  id="booksubmit" class="btn btn-primary" data-dismiss="modal">Submit</button>  <button type="button" class="close-button btn btn-danger" data-dismiss="modal">Cancel</button>        </div>              </div>    </div>  </div>'
			);

			for (let slot of list) {
				$("#" + slot.parkingSpace).removeClass("btn-primary");

				$("#" + slot.parkingSpace).addClass("btn-warning");
			}
			$("#booksubmit").on("click", function (event) {
				let id = $("#hiddenValue").val();
				let startTime = $("#fromtime").val();
				let endTime = $("#endtime").val();
				let customerName = $("#customerName").val();
				let type = $("#customerType").val();
				let regNum = $("#regNum").val();
				let cardHolder = $("#card-holder").val();
				let expirationMonth = $("#expiration-month").val();
				let expirationYear = $("#expiration-year").val();
				let cardNumber = $("#card-number").val();
				let cvc = $("#cvc").val();

				var parkingslot = new Object();

				if (
					id &&
					startTime &&
					endTime &&
					customerName &&
					type &&
					regNum &&
					cardHolder &&
					expirationMonth &&
					expirationYear &&
					cardNumber &&
					cvc
				) {
				} else {
					$(".modelerrormessage").text("Please provide the required fields");
					return false;
				}
				if (regNum.length < 8) {
					$(".modelerrormessage").text(
						"Vehicle Registration Number must be 8 characters"
					);
					return false;
				}
				$(".modelerrormessage").text("");
				parkingslot.parkingSpace = id;
				parkingslot.startTime = startTime;
				parkingslot.endTime = endTime;
				parkingslot.customerName = customerName;
				parkingslot.type = type;
				parkingslot.regNum = regNum;
				bookedSlots=bookedSlots+1;
				availableSlots=availableSlots-1;
				$('#bookedSlots').text(bookedSlots);
				$('#availableSlots').text(availableSlots);
				list.push(parkingslot);
				$.ajax({
					type: "POST",
					url: "http://localhost:8080/parkopedia/v1/slots",
					data: JSON.stringify(parkingslot),
					contentType: "application/json",
					success: function (resultData) {
						console.log(resultData.id);
					},
				});
				
				$(".alert").show();
			});

			$(".space").on("click", function (event) {
				$("#fromtime").val("");
				$("#endtime").val("");
				$("#customerName").val("");
				$("#regNum").val("");
				$("#card-holder").val("");
				$("#expiration-month").val("");
				$("#expiration-year").val("");
				$("#card-number").val("");
				$("#cvc").val("");
				if ($(this).hasClass("btn-warning")) {
					return false;
				}
				let data_id = $(this).data("id");
				$(".modal-body #hiddenValue").val(data_id);
				$(this).addClass("btn-warning");
			});

			$(".close-button, .close").on("click", function (event) {
				let id = $("#hiddenValue").val();
				$("#" + id).removeClass("btn-warning");
				$("#" + id).addClass("btn-primary");
			});

			$("#book-parking").addClass("active");
		});

		$("#pricing").on("click", function () {
			$(".nav-item").removeClass("active");

			$("#container").html(
				'<div><p class="prices">Prices</p><p class="pricessubheading">Mon-Fri 08:00 - 18:00</p><table><tr><td>1 Hour..........................&pound;1.10</td></tr><tr><td>2 Hours........................&pound;1.70</td></tr><tr><td>3 Hours........................&pound;2.20</td></tr><tr><td>4 Hours........................&pound;2.70</td></tr><tr><td>5 Hours........................&pound;3.90</td></tr><tr><td>Max...............................&pound;7.70</td></tr><tr><td>Week.............................&pound;31.00</td></tr><tr><td>4 Weeks........................&pound;104.50</td></tr><tr><td>Quarter..........................&pound;275.00</td></tr><tr><td>Year..................................&pound;1000.00</td></tr><tr><td>Holiday..........................&pound;1.10</td></tr></table><br/><br/><p class="pricessubheading">Sat 08:00 - 18:00</p><table><tr><td>10 Hours.......................&pound;2.70</td></tr><tr><td>Holiday..........................&pound;1.10</td></tr><table><br/><br/><p class="pricessubheading">Sun 08:00 - 18:00</p><table><tr><td>10 Hours........................&pound;1.10</td></tr></table><br /><br /><p class="free">Free outside these hours</p></div>'
			);
			$("#pricing").addClass("active");
		});

		$("#booking-list").on("click", function () {
			$(".nav-item").removeClass("active");

			let html =
				" <br /><div class='md-form active-cyan active-cyan-2 mb-3'><input id='myInput' class='form-control' type='text' placeholder='Search..'></div><br/><table id = 'booking-list-table'>";
			html +=
				'<thead><tr class="booking-list-row"><th>Parking Space</th><th>Customer Name</th><th>Type</th><th>Vehicle Registration Number</th><th>Start Time</th><th>End Time</th></tr></thead><tbody id = "myTable">';
			for (let slot of list) {
				html +=
					'<tr class="booling-list-row"><td>' +
					slot.parkingSpace +
					"</td><td>" +
					slot.customerName +
					"</td><td>" +
					slot.type +
					"</td><td>" +
					slot.regNum +
					"</td><td>" +
					slot.startTime +
					"</td><td>" +
					slot.endTime +
					"</td></tr>";
			}
			html += "</tbody></table>";

			$("#container").html(html);
			$("#booking-list").addClass("active");

			$("#myInput").on("keyup", function () {
				var value = $(this).val().toLowerCase();
				$("#myTable tr").filter(function () {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
				});
			});
		});
	});
});
