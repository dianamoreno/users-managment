import React from 'react';
import { userDataAPI, UsersManagmentProps, UsersManagmentState } from '../../interfaces/UsersManagment/';
import axios from 'axios'; 
import {Button} from '../Button';

class UsersManagment extends React.Component<UsersManagmentProps, UsersManagmentState>{

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: UsersManagmentProps){
        super(props);
        
        this.state = {
            counter:1,
            users: []
        }

    }

    fetchUserData = (action: string) =>{
        console.log('fetchUserData action='+action)
        let _users = this.state.users;

        if((action === 'add' && this.state.counter > 1) || action === 'init'){
            axios.get('https://reqres.in/api/users/'+this.state.counter)
            .then(response => {
                const userDataAPI = response.data as userDataAPI;
                let arr = [userDataAPI.data.avatar, userDataAPI.data.first_name, userDataAPI.data.last_name]
                _users.push(arr)

                this.setState(()=>{
                    
                    return {
                        users : _users
                    }
                })            
            })

        } else {
            const index = _users.length -1 ;
            if (index > 0) {
                _users.splice(index, 1);

                this.setState(()=>{
                    return {
                        users : _users
                    }
                })       
            }
        }

        console.log("users:",_users)
    }

    componentDidMount(){
       
       this.fetchUserData("init")
        
    }

    componentDidUpdate(prevProps:UsersManagmentProps, prevState: UsersManagmentState, snapshot: any){
        console.log('componentDidUpdate')
 

        //ejemplo de cargar mas info cada vez que el estado del componente cambia:
        //la validacion de los estados es importante para prevenir que no se quede en un loop de actualizacion
        if(this.state.counter > 0 && this.state.counter < 11 && prevState.counter !== this.state.counter){
            const action = (this.state.counter > prevState.counter)? "add" : "reduce";
            this.fetchUserData(action);
        }
    }

    
    increaseCounter = () => {
        console.log('increaseCounter')

        if(this.state.counter < 10){
            this.setState((prev)=>{
                return {
                    counter: prev.counter + 1
                }
            })
        }
        
    }

    decreaseCounter = () => {
        if(this.state.counter > 1){
            this.setState((prev)=>{
                return {
                    counter: prev.counter - 1
                }
           })
        }
    }

    render(){
        const { counter, users } = this.state;

        return (
            <div>
                <h3>Number of users: {counter}</h3>
                <Button type='primary' onButtonClick={this.increaseCounter} >Add</Button>
                <Button type='default' onButtonClick={this.decreaseCounter}>Minus</Button>
                <hr/>
                
                <ul>
                {users && users.map((data, index) => {
                    console.log("*****",data)
                    let key = "userid-"+index
                    return (
                        <li key={key}>
                          <div className='user-content'>
                            <div className='left div-r'><img src={data[0]} width="40" alt={data[1]}></img></div>
                            <div className='left div-l'>{data[1]+" "+data[2]}</div>
                        </div>
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    }
}

export default UsersManagment;