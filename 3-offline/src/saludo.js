var Saludo = React.createClass({
	render: function(){
		return(
				<div>
					<h1>Ola k ase! {this.props.nombre}</h1>
					<h2>{this.props.nacionalidad}</h2>
					<p>Cabezaglobo!</p>
					<p>{this.props.children}</p>
				</div>
			)
	}
})


ReactDOM.render(
	<div>
		<Saludo nombre="Carlos" nacionalidad="Español">38 años</Saludo>
		<Saludo nombre="Bombi" nacionalidad="Española">32 años</Saludo>
	</div>, 
	document.getElementById('mensaje')
);