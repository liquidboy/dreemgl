define.class('$server/composition', function($server$, service, $ui$, screen, view, $widgets$timeline$, timeline) {

	var START_DATE = "Jan 1 2016"
	var END_DATE = "Jan 1 2017"
	var EVENT_COUNT = 1000

	this.render = function() {
		return [
			screen({name:'default'}, [
				view({
					flexdirection: 'column',
					oninit: function () {
						var timeline = this.find('timeline')
						var hstep = 1000 * 60 * 60
						var events = []
						var date
						for(var i = 0; i < EVENT_COUNT; i++) {
							date = new Date(new Date(START_DATE).getTime() + i * (6 + floor(random() * 3) ) * hstep)
							events.push({
								date: date,
								enddate: new Date(date.getTime() + (12 - floor(random() * 12) ) * hstep / 4)
							})
						}
						timeline.data = events
					}
				},[
					timeline({
						name:'timeline',
						start: START_DATE,
						end: END_DATE,
						zoom: 200
					})
				])
			])
		]
	}
})
