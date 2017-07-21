var Circle = React.createClass({
    getInitialState: function(){
        return{
        	circle: "fa fa-circle-thin"
        }
    },
	handleCircle: function(){
		this.setState({
			circle: "fa fa-circle"
		})
	},
	render: function(){
		return(
				<i onClick={this.handleCircle} type="checkbox" className={this.state.circle} ></i>
			)
	}
})

var Workout = React.createClass({
    getInitialState: function(){
        //return { like: true }
        return{
        	like: Boolean(this.props.like),
        	editing: false
        }
    },
	edit: function(){
		this.setState({editing: true});
	},
	cancelEdit: function(){
		this.setState({editing: false});
	},
	save: function(){
		this.props.onChange(this.refs.nuevoNombre.value, this.props.id);
		this.setState({editing: false});
	},
	remove: function(){
		this.props.onRemove(this.props.id);
		console.log(this.props.id);
	},
	showEditingView: function(){
		return(
				<div className="col-sm-6">
					<div className="workout-wrapper">
						<input 
							type="text" 
							ref="nuevoNombre" 
							className="form-control" 
							placeholder="workout name" 
							defaultValue={this.props.workoutTitle} />
						<i className="fa fa-times" aria-hidden="true" onClick={this.cancelEdit}></i>
						<i className="fa fa-check" aria-hidden="true" onClick={this.save}></i>
					</div>			
				</div>
		)
	},
	showFinalView: function(){
		return(
				<div className="col-sm-6">
					<div className="workout-wrapper">
						<h1>{this.props.workoutTitle}</h1> 
						<p><i>({this.props.dificultad})</i></p>
						<div>Material: {String(this.state.like)}</div>
						<div>Dificultad: 
							<Circle />
							<Circle />
							<Circle />
						</div>
						<div>Duración: 
							<Circle />
							<Circle />
							<Circle />
						</div>
						<i className="fa fa-times" aria-hidden="true" onClick={this.remove}></i>
						<i className="fa fa-pencil" aria-hidden="true" onClick={this.edit}></i>
					</div>
				</div>
			)
	},
	render: function(){
		if (this.state.editing) {
			return this.showEditingView();
		} else {
			return this.showFinalView();
		}
		
	}
})

var Workouts = React.createClass({
	getInitialState: function(){
		return {
			lista_workouts: ['Aphrodite', 'Zeus', 'Metis']
		}
	},
	getDefaultProps(){
		// cuando retornamos un objeto usamos llaves
		return {
			framework: 'React',
			language: 'JavasScript'
		}
	},
	componentWillMount: function(){
		// esto se cargará antes de que se dibujen los componentes en pantalla
		var pais;
		var self = this;

		$.getJSON('https://restcountries.eu/rest/v1/all', function(data){
			for(pais in data){
				console.log(data[pais].name);
				self.addWorkout(data[pais].name);
			}
			$(self.refs.spinner).removeClass('fa-spin');
			$(self.refs.spinner).hide();
		})
	},
	componentDidMount(){
		$(this.refs.spinner).addClass('fa-spin');
	},
	addWorkout: function(workoutTitle){
		var nuevoWorkout = this.refs.nuevoWorkout.value;
		if (nuevoWorkout == '') {
			if (typeof workoutTitle == 'undefined') {
				nuevoWorkout = 'Nuevo workout';
			} else {
				nuevoWorkout =workoutTitle;
			}
		}
		listaWorkouts = this.state.lista_workouts;
		listaWorkouts.push(nuevoWorkout);
		this.setState({lista_workouts: listaWorkouts});
		this.refs.nuevoWorkout.value = "";	
	},
	removeWorkout: function(i){
		arr = this.state.lista_workouts;
		arr.splice(i, 1); // eliminar índice del array
		this.setState({ lista_workouts: arr});
	},
	updateWorkout: function(nuevoNombre, i){
		var arr = this.state.lista_workouts;
		arr[i] = nuevoNombre;
		this.setState({lista_workouts: arr});
	},
	eachWorkout: function(workoutTitle, i){
		// usamos paréntesis después de return porque no es un objeto
		return(
			<Workout 
				key={i}
				id={i} 
				workoutTitle={workoutTitle} 
				dificultad="standar"
				onRemove={this.removeWorkout} 
				onChange={this.updateWorkout} >
			</Workout>
		)		
	},
	handleKeyDown: function(e){
		if (e.charCode === 13) {
			this.addWorkout();
		}
	},
	render: function(){
		return(
			<div className="row">
				<div className="col-12">
					<div className="row">
						<h1 className="col-12">Workouts</h1>
						<p className="col-12">Número de workouts: {this.state.lista_workouts.length}</p>
						<i ref="spinner" className="fa fa-spinner" aria-hidden="true"></i>
						<p>Este ejercicio está hecho con {this.props.framework}, un framework de {this.props.language}.</p>
					</div>
					<div className="form-inline">
						<input 
							type="text" 
							ref="nuevoWorkout" 
							className="form-control" 
							placeholder="agregar workout..."
							onKeyPress={this.handleKeyDown} />
						<button type="submit" onClick={this.addWorkout} className="btn btn-primary"> + </button>
					</div>
					<div className="row">						
						{
							this.state.lista_workouts.map(this.eachWorkout)
						}
					</div>
				</div>
			</div>
		)
	}
})


ReactDOM.render(
	<Workouts />, 
	document.getElementById('freeletics')
);