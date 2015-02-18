---
title: 'Home Page'
---
{% extends 'src/layouts/page.swig' %}

{% block content %}

	<div id="game-view">
		<button class="btn-deal">Deal</button>
		<button class="btn-flip">Flip</button>
		<div class="game-piles grid">
			<div id="pile1" class="game-pile">
				<div class="col-1-4"><div class="card-pile draw"></div></div>
				<div class="col-1-4"><div class="card-pile discard "></div></div>
			</div>
			<div id="pile2" class="game-pile">
				<div class="col-1-4"><div class="card-pile discard"></div></div>
				<div class="col-1-4"><div class="card-pile draw"></div></div>
			</div>
		</div>
		<div class="player-piles">
			<div id="p1-view" class="player-view"></div>
			<div id="p2-view" class="player-view"></div>
		</div>
	</div>

	<!-- <div id="cards" class="cards"></div> -->


	<script id="card-template" type="text/template">
		<div class="card card-suit-{{suitName}}" data-id="{{id}}">
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
</script>
{% endblock %}
