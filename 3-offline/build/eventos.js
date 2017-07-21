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
	edit: function () {
		this.setState({ editing: true });
	},
	cancelEdit: function () {
		this.setState({ editing: false });
	},
	save: function () {
		this.props.onChange(this.refs.nuevoNombre.value, this.props.id);
		this.setState({ editing: false });
	},
	remove: function () {
		this.props.onRemove(this.props.id);
		console.log(this.props.id);
	},
	showEditingView: function () {
		return React.createElement(
			"div",
			{ className: "col-sm-6" },
			React.createElement(
				"div",
				{ className: "workout-wrapper" },
				React.createElement("input", {
					type: "text",
					ref: "nuevoNombre",
					className: "form-control",
					placeholder: "workout name",
					defaultValue: this.props.workoutTitle }),
				React.createElement("i", { className: "fa fa-times", "aria-hidden": "true", onClick: this.cancelEdit }),
				React.createElement("i", { className: "fa fa-check", "aria-hidden": "true", onClick: this.save })
			)
		);
	},
	showFinalView: function () {
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
				React.createElement("i", { className: "fa fa-times", "aria-hidden": "true", onClick: this.remove }),
				React.createElement("i", { className: "fa fa-pencil", "aria-hidden": "true", onClick: this.edit })
			)
		);
	},
	render: function () {
		if (this.state.editing) {
			return this.showEditingView();
		} else {
			return this.showFinalView();
		}
	}
});

var Workouts = React.createClass({
	displayName: "Workouts",

	getInitialState: function () {
		return {
			lista_workouts: ['Aphrodite', 'Zeus', 'Metis']
		};
	},
	getDefaultProps() {
		// cuando retornamos un objeto usamos llaves
		return {
			framework: 'React',
			language: 'JavasScript'
		};
	},
	componentWillMount: function () {
		// esto se cargará antes de que se dibujen los componentes en pantalla
		var pais;
		var self = this;

		$.getJSON('https://restcountries.eu/rest/v1/all', function (data) {
			for (pais in data) {
				console.log(data[pais].name);
				self.addWorkout(data[pais].name);
			}
			$(self.refs.spinner).removeClass('fa-spin');
			$(self.refs.spinner).hide();
		});
	},
	componentDidMount() {
		$(this.refs.spinner).addClass('fa-spin');
	},
	addWorkout: function (workoutTitle) {
		var nuevoWorkout = this.refs.nuevoWorkout.value;
		if (nuevoWorkout == '') {
			if (typeof workoutTitle == 'undefined') {
				nuevoWorkout = 'Nuevo workout';
			} else {
				nuevoWorkout = workoutTitle;
			}
		}
		listaWorkouts = this.state.lista_workouts;
		listaWorkouts.push(nuevoWorkout);
		this.setState({ lista_workouts: listaWorkouts });
		this.refs.nuevoWorkout.value = "";
	},
	removeWorkout: function (i) {
		arr = this.state.lista_workouts;
		arr.splice(i, 1); // eliminar índice del array
		this.setState({ lista_workouts: arr });
	},
	updateWorkout: function (nuevoNombre, i) {
		var arr = this.state.lista_workouts;
		arr[i] = nuevoNombre;
		this.setState({ lista_workouts: arr });
	},
	eachWorkout: function (workoutTitle, i) {
		// usamos paréntesis después de return porque no es un objeto
		return React.createElement(Workout, {
			key: i,
			id: i,
			workoutTitle: workoutTitle,
			dificultad: "standar",
			onRemove: this.removeWorkout,
			onChange: this.updateWorkout });
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
					),
					React.createElement("i", { ref: "spinner", className: "fa fa-spinner", "aria-hidden": "true" }),
					React.createElement(
						"p",
						null,
						"Este ejercicio est\xE1 hecho con ",
						this.props.framework,
						", un framework de ",
						this.props.language,
						"."
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