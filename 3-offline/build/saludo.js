var Saludo = React.createClass({
	displayName: "Saludo",

	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				null,
				"Ola k ase! ",
				this.props.nombre
			),
			React.createElement(
				"h2",
				null,
				this.props.nacionalidad
			),
			React.createElement(
				"p",
				null,
				"Cabezaglobo!"
			),
			React.createElement(
				"p",
				null,
				this.props.children
			)
		);
	}
});

ReactDOM.render(React.createElement(
	"div",
	null,
	React.createElement(
		Saludo,
		{ nombre: "Carlos", nacionalidad: "Espa\xF1ol" },
		"38 a\xF1os"
	),
	React.createElement(
		Saludo,
		{ nombre: "Bombi", nacionalidad: "Espa\xF1ola" },
		"32 a\xF1os"
	)
), document.getElementById('mensaje'));