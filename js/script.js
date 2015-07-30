'use strict';
(function(window){

	var ListItem = React.createClass({
		toggChange: function() {
			this.props.toggItemChange(this.props.index);
	  	},
		render: function() {
		    return ( <tr>
	                    <th scope="row">
	                    	<input onChange={this.toggChange} type="checkbox" value={this.props.item.id} checked={this.props.item.selected} />
                    	</th>
	                    <td>{this.props.item.firstName}</td>
	                    <td>{this.props.item.lastName}</td>
	                    <td>{this.props.item.userName}</td>
	                </tr> );
	  	}
	});

	var ItemList = React.createClass({
		
		render: function() {
			var me = this;
		    var createItem = function(item, index) {
		      	return 	( <ListItem item={item} index={index} toggItemChange={me.props.toggItemChange}></ListItem> );
		    };
		    return ( <div className="panel-body">
			            <table className="table">
			                <thead>
			                    <tr>
			                        <th>#</th>
			                        <th>First Name</th>
			                        <th>Last Name</th>
			                        <th>Username</th>
			                    </tr>
			                </thead>
			                <tbody> {this.props.items.map(createItem)} </tbody>
			            </table>
			        </div> );
	  	}
	});

	var MainCheckbox = React.createClass({
		toggChange: function() {
			this.props.toggChange();
	  	},
		render: function() {
		    return ( <input onChange={this.toggChange}  className="multi-select" type="checkbox" /> );
	  	}
	});

	var MainButton = React.createClass({
		render: function() {
		    return ( <button className="btn btn-default action-button" onClick={this.props.onSubmit} type="submit">{this.props.head}</button> );
	  	}
	});

	var ItemFormApp = React.createClass({
		toggChange: function() {
			this.state.selected = (this.state.selected)? 0 : 1;
			for(var i in this.state.items){
				this.state.items[i].selected = this.state.selected;
			}
			this.setState({items: this.state.items});
	  	},

	  	onSubmit: function() {
			var result = this.state.items.filter(function(item) {
			  	return item.selected > 0;
			});
			result = result.map(function(item){ return item.id });
			console.log(result);
			this.setState({selectedItems: result});
	  	},

	  	getSelectedItems: function(){
	  		return (this.state.selectedItems)? this.state.selectedItems.join(',') : '';
	  	},

	  	toggItemChange: function(i) {
			this.state.items[i].selected = (this.state.items[i].selected)? 0 : 1;
			this.setState({items: this.state.items});
	  	},
		getInitialState: function() {
		    return {
		    	items: [
		    		{id: 0, firstName: 'Mark', lastName: 'Otto', userName: '@mdo', selected: 0}
		    		,{id: 1, firstName: 'Jacob', lastName: 'Thornton', userName: '@fat', selected: 0}
		    		,{id: 2, firstName: 'Larry', lastName: 'the Bird', userName: '@twitter', selected: 0}
	    		],
	    		head: "Show selected ids ",
	    		selectd: 0,
	    		//selectedItems: []
		    };
	  	},
		render: function() {
		    return ( 
		    	<div>
		    	<div className="panel panel-default" >
		    		<div className="panel-heading">
		    			<MainCheckbox toggChange={this.toggChange} />
		    			<MainButton head={this.state.head} onSubmit={this.onSubmit}/>
			        </div>
			        <ItemList toggItemChange={this.toggItemChange} items={this.state.items} /> 
			        {this.getSelectedItems()}
		        </div>
		        </div>
		        );
	  	}
	});

	React.render( React.createElement(ItemFormApp, {}), document.getElementById('app'));

})(window)