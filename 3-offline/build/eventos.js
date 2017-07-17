var Circle = React.createClass({
	displayName: "Circle",

	getInitialState: function () {
		return {
			circle: "fa fa-circle-thin"
		};
	},
	handleCircle: function () {
		this.setState({
			circle: "fa fa-circle"
		});
	},
	render: function () {
		return React.createElement("i", { onClick: this.handleCircle, type: "checkbox", className: this.state.circle });
	}
});

var Workout = React.createClass({
	displayName: "Workout",

	getInitialState: function () {
		//return { like: true }
		return {
			like: Boolean(this.props.like),
			editing: false
		};
	},
	handleLike: function () {
		this.setState({
			like: !this.state.like
		});
	},
	remove: function () {
		this.props.onRemove(this.props.id);
		console.log(this.props.id);
	},
	render: function () {
		return React.createElement(
			"div",
			{ className: "col-sm-6" },
			React.createElement(
				"div",
				{ className: "workout-wrapper" },
				React.createElement(
					"h1",
					null,
					this.props.workoutTitle
				),
				React.createElement(
					"p",
					null,
					React.createElement(
						"i",
						null,
						"(",
						this.props.dificultad,
						")"
					)
				),
				React.createElement(
					"div",
					null,
					React.createElement("input", {
						onChange: this.handleLike,
						defaultChecked: this.state.like,
						type: "checkbox", className: "fa fa-check" })
				),
				React.createElement(
					"div",
					null,
					"Material: ",
					String(this.state.like)
				),
				React.createElement(
					"div",
					null,
					"Dificultad:",
					React.createElement(Circle, null),
					React.createElement(Circle, null),
					React.createElement(Circle, null)
				),
				React.createElement(
					"div",
					null,
					"Duraci\xF3n:",
					React.createElement(Circle, null),
					React.createElement(Circle, null),
					React.createElement(Circle, null)
				),
				React.createElement("i", { className: "fa fa-times", "aria-hidden": "true", onClick: this.remove })
			)
		);
	}
});

var Workouts = React.createClass({
	displayName: "Workouts",

	getInitialState: function () {
		return {
			lista_workouts: ['Aphrodite', 'Zeus', 'Metis']
		};
	},
	removeWorkout: function (i) {
		arr = this.state.lista_workouts;
		arr.splice(i, 1); // eliminar índice del array
		this.setState({ lista_workouts: arr });
	},
	eachWorkout: function (workoutTitle, i) {
		return React.createElement(Workout, {
			key: i,
			id: i,
			workoutTitle: workoutTitle,
			dificultad: "standar",
			onRemove: this.removeWorkout });
	},
	addWorkout: function () {
		nuevoWorkout = this.refs.nuevoWorkout.value;
		if (nuevoWorkout == '') {
			listaWorkouts = this.state.lista_workouts;
		} else {
			listaWorkouts = this.state.lista_workouts;
			listaWorkouts.push(nuevoWorkout);
			this.setState({ lista_workouts: listaWorkouts });
			this.refs.nuevoWorkout.value = "";
		}
	},
	handleKeyDown: function (e) {
		if (e.charCode === 13) {
			this.addWorkout();
		}
	},
	render: function () {
		return React.createElement(
			"div",
			{ className: "row" },
			React.createElement(
				"div",
				{ className: "col-12" },
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"h1",
						{ className: "col-12" },
						"Workouts"
					),
					React.createElement(
						"p",
						{ className: "col-12" },
						"N\xFAmero de workouts: ",
						this.state.lista_workouts.length
					)
				),
				React.createElement(
					"div",
					{ className: "form-inline" },
					React.createElement("input", {
						type: "text",
						ref: "nuevoWorkout",
						className: "form-control",
						placeholder: "agregar workout...",
						onKeyPress: this.handleKeyDown }),
					React.createElement(
						"button",
						{ type: "submit", onClick: this.addWorkout, className: "btn btn-primary" },
						" + "
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					this.state.lista_workouts.map(this.eachWorkout)
				)
			)
		);
	}
});

ReactDOM.render(React.createElement(Workouts, null), document.getElementById('freeletics'));