import React, { Component } from 'react';
import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import {AppProvider} from './AppProvider';
import Settings from '../Settings/index';

// const MyButton = styled.div`
//     color: green;
//     ${props => props.primary && css`
//         color: palevioletred;
//     `}
// `

// const TomatoButton = styled(MyButton)`
//     color: tomato;
//     board-color: tomato;
// `;


class App extends Component {
    render() {
        return ( 
            <AppLayout>
                <AppProvider>
                    <AppBar/>
                    <Settings/>
                </AppProvider>
            </AppLayout>
        ); 
    }
}

export default App;