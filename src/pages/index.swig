---
title: 'Home Page'
---
{% extends 'src/layouts/page.swig' %}

{% block content %}

	<div id="game-view">
		<button class="btn-deal">Deal</button>
		<div class="game-piles">
			<div id="pile1" class="game-pile">
				<div class="pile card-pile"></div>
				<div class="discard"></div>
			</div>
			<div id="pile2" class="game-pile">
				<div class="pile card-pile"></div>
				<div class="discard"></div>
			</div>
		</div>
		<div class="player-piles">
			<div id="p1-view" class="player-view"></div>
			<div id="p2-view" class="player-view"></div>
		</div>
	</div>

	<!-- <div id="cards" class="cards"></div> -->


	<script id="card-template" type="text/template">
		<div class="card card-suit-{{suitName}}">
			<div class="face front">
				<div class="face-inner">
				<div class="card-corner">
					<div class="corner-inner">
						<span>{{val}}</span>
						<i class="card-suit"></i>
					</div>
				</div>
				<div class="card-corner bottom">
					<div class="corner-inner">
						<span>{{val}}</span>
						<i class="card-suit"></i>
					</div>
				</div>
				</div>
			</div>
			<div class="face back">
			</div>
		</div>
	</script>

	<script id="player-view-template" type="text/template">
		<div class="player-view-inner">
			<div class="player-hand card-hand"></div>
			<div class="player-pile card-pile"></div>
		</div>
	</script>
{% endblock %}

{% block scripts %}
<script>
$("blockquote").css("color", "#bada55");
</script>
{% endblock %}
