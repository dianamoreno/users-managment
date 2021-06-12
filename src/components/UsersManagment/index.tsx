import React from 'react';
import { userDataAPI, userData, UsersManagmentProps, UsersManagmentState } from '../../interfaces/UsersManagment/';
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

    fetchUserData = async () =>{

            const response = await axios.get('https://reqres.in/api/users/'+this.state.counter)            
            const { data } = response.data as userDataAPI;
         
            /*this.setState((prev)=>{
                
                return {
                    users : [
                        ...prev.users,
                        data
                    ]
                }
            })*/            
            this.setState({
                users: [...this.state.users, data]
            })
            

        
    }

    componentDidMount(){
       
       this.fetchUserData()
        
    }

    hasUserAlreadyFetched = (users: userData[], counter: number) =>{
        const result = (users.filter(user => user.id === counter))[0];
        return !!result;
    }

    componentDidUpdate(prevProps:UsersManagmentProps, prevState: UsersManagmentState, snapshot: any){
          
        const {users, counter} = this.state;
        //ejemplo de cargar mas info cada vez que el estado del componente cambia:
        //la validacion de los estados es importante para prevenir que no se quede en un loop de actualizacion
        if( prevState.counter !== counter && !this.hasUserAlreadyFetched(users,counter)){
            console.log("if componentDidUpdate")
            this.fetchUserData();
        }
    }

    
    increaseCounter = () => {
        if(this.state.counter < 10){
            this.setState((prev)=>{
                return {
                    counter: prev.counter + 1
                }
            })
        }
        
    }

    decreaseCounter = () => {
        const {counter} = this.state

        counter > 1 && this.setState((prev)=>{
            return {
                counter: prev.counter - 1
            }
        })
        
    }

    renderUsers = () =>{
        const {users, counter} = this.state;

       return users.filter(user => user.id <= counter).map(({avatar, first_name, last_name}, index) => {
            let key = "userid-"+index
            return (
                <li key={key}>
                  <div className='user-content'>
                    <div className='left div-r'><img src={avatar} width="40" alt={first_name}></img></div>
                    <div className='left div-l'>{first_name+" "+last_name}</div>
                </div>
                </li>
            )
        })
    }

    render(){
        const { counter } = this.state;

        return (
            <div>
                <h3>Number of users: {counter}</h3>
                <Button type='primary' onButtonClick={this.increaseCounter} >Add</Button>
                <Button type='default' onButtonClick={this.decreaseCounter}>Minus</Button>
                <hr/>
                
                <ul>
                    {this.renderUsers()}
                </ul>
            </div>
        )
    }
}

export default UsersManagment;