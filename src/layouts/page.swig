{% extends 'base.swig' %}

{% block body %}
<header>
	<h1>The title is {%=title %}</h1>
</header>
<div class="page-container">
	{% block content %}{% endblock %}
</div>
{% endblock %}

{% block scripts %}
	{% block scripts %}{% endblock %}
{% endblock %}
