---
title: 'Home Page'
---
{% extends 'src/layouts/page.swig' %}

{% block content %}

	<div id="cards" class="cards"></div>


	<script id="card-template" type="text/template">
		<div class="card card-suit-{{suit}}">
			<div class="face front">
				<div class="card-corner"><i class="corner-suit"></i><span>{{val}}</span></div>
				<div class="card-corner bottom"><i class="corner-suit"></i><span>{{val}}</span></div>
			</div>
			<div class="face back">
			</div>
		</div>
	</script>
{% endblock %}

{% block scripts %}
<script>
$("blockquote").css("color", "#bada55");
</script>
{% endblock %}
