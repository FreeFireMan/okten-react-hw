import React, {Component} from 'react';
import User from "../user/User";
import './AllUsers.css'
import {UserService} from "../../services/UserService";

class AllUsers extends Component {

    userService = new UserService();

    state = {users: [], chosenOne: null};

    // userChoose = (id) => this.setState({chosenOne: this.state.users.find(value => value.id === id)}); // это укороченная
    // userChoose = (id) => {                     // это расписанная
    //     let chosenOne = this.state.users.find(value => value.id === id);
    //     this.setState({chosenOne});   // стейт - объект -> ключ: значение -> {chosenOne: chosenOne} - тоже укорочено {chosenOne}
    // }
    // userChoose = (id) => {
    //     this.userService.getUserById(id).then(value => this.setState({chosenOne: value}));
    // };
    userChoose = (id) => {                   // вынос в findUserById
        this.setState({chosenOne: this.userService.findUserById(this.state.users, id)});   // стейт - объект -> ключ: значение -> {chosenOne: chosenOne} - тоже укорочено {chosenOne}
    }

    // componentDidMount() {                          // straight
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(value => value.json())
    //         .then(value => {
    //             this.setState({users: value})
    //         });
    // }
    componentDidMount() {                          // from Service
        this.userService.getAllUsers().then(value => this.setState({users: value}));
    }

    render() {
        let {users, chosenOne} = this.state;
        return (
            <div>
                {
                    users.map(value => (<User
                        item={value}
                        key={value.id}
                        userChoose={this.userChoose}
                    />))
                }
                {chosenOne && <h3 className={'chosenUser-line'}><User item={chosenOne} isShowButton={true}/></h3>}
                {/*{chosenOne &&  // а можно и так напрямую но уже без всяких isShowButton - так больше кода, но всё проще и выводишь напрямую, всё, что хочешь*/}
                {/*<h3 className={'chosenUser-line'}>*/}
                {/*    {chosenOne.id} - {chosenOne.name} - {chosenOne.address.city}*/}
                {/*</h3>}*/}
            </div>
        );
    }
}

export default AllUsers;