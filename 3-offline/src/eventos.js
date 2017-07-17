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
	handleLike: function(){
		this.setState({
			like: !this.state.like
		})
	},
	remove: function(){
		this.props.onRemove(this.props.id);
		console.log(this.props.id);
	},
	showEditingView: function(){

	},
	showFinalView: function(){
		return(
				<div className="col-sm-6">
					<div className="workout-wrapper">
						<h1>{this.props.workoutTitle}</h1> 
						<p><i>({this.props.dificultad})</i></p>
						<div>
							<input 
								onChange={this.handleLike}
								defaultChecked={this.state.like}
								type="checkbox" className="fa fa-check" />
						</div>
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
					</div>
				</div>
			)
	},
	render: function(){
		return.this.showFinalView;
	}
})

var Workouts = React.createClass({
	getInitialState: function(){
		return {
			lista_workouts: ['Aphrodite', 'Zeus', 'Metis']
		}
	},
	removeWorkout: function(i){
		arr = this.state.lista_workouts;
		arr.splice(i, 1); // eliminar índice del array
		this.setState({ lista_workouts: arr});
	},
	eachWorkout: function(workoutTitle, i){
		return(
			<Workout 
				key={i}
				id={i} 
				workoutTitle={workoutTitle} 
				dificultad="standar"
				onRemove={this.removeWorkout} >
			</Workout>
		)		
	},
	addWorkout: function(){
		nuevoWorkout = this.refs.nuevoWorkout.value;
		if (nuevoWorkout == '') {
			listaWorkouts = this.state.lista_workouts;
		} else {
			listaWorkouts = this.state.lista_workouts;
			listaWorkouts.push(nuevoWorkout);
			this.setState({lista_workouts: listaWorkouts});
			this.refs.nuevoWorkout.value = "";			
		}
		

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