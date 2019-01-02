import React, { Component } from 'react';
import './App.css';
import WelcomeMessage from './WelcomeMessage';
import styled, {css} from 'styled-components';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import {AppProvider} from './AppProvider';

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
                    <WelcomeMessage/>
                </AppProvider>
            </AppLayout>
        ); 
    }
}

export default App;