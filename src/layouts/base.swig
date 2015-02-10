<!DOCTYPE html>	
<html lang ="en">
	<head>
		<meta charset ="UTF-8" >
		<title> {%=title%} </title>

		<link rel="Stylesheet" type="text/css" href="css/all.min.css" />
		<link rel="icon" href="favicon.ico" />
	</head>
	<body>
		{% block body %}{% endblock %}

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="js/jquery.min.js"><\/script>')</script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/mustache.js/0.8.1/mustache.min.js"></script>

		<script>
			var app = {};
		</script>

		<!-- build:js /js/all.min.js -->
		<script type="text/javascript" src="/js/common.js"></script>
		<script type="text/javascript" src="/js/deck.js"></script>
		<script type="text/javascript" src="/js/game.js"></script>
		<script type="text/javascript" src="/js/main.js"></script>
		<!-- endbuild -->

		{% block scripts %}{% endblock %}
		<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
	<script>
		(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
		function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
		e=o.createElement(i);r=o.getElementsByTagName(i)[0];
		e.src='//www.google-analytics.com/analytics.js';
		r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
		ga('create','UA-XXXXX-X');ga('send','pageview');
	</script>
	</body>
</html>