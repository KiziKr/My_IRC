import React, { Component} from 'react';

const ListItem = function(props) {
    return <li>{props.item}</li>
}

class UsersList extends Component {
    constructor() {
        super();

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.props.socket.on('newUser', (newUser) => {
            this.addUser(newUser);
        });

         this.props.socket.on('removeUser', (user) => {
            this.deleteUser(user);
        });

        this.props.socket.on('initUsers', (users) => {
            var tabUsers = [];

            for(var i in users) {
                tabUsers.splice(1, 0, users[i].name);
            }

            this.setState({
                users : tabUsers
            })
        });
    }

    createList() {
        return this.state.users.map((item, index) => {
            return <ListItem item={item} key={index}/>
        });
    }

    addUser(newUser) {
        this.setState({
            users: this.state.users.concat(newUser)
        });
    }

    deleteUser(user) {
        this.setState({
            users: this.state.users.filter((pUser) => pUser !== user)
        });
    }

    render() {
        return( 
            <div id="body-users">
                <h2>UTILISATEURS</h2>
                <div id="users">
                    <ul id="users-list">
                        {this.createList()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default UsersList;