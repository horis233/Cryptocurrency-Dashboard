import React from 'react';

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'dashboard',
            ...this.savedSetting(),
            setPage: this.setPage,
            confirmFavorites: this.confirmFavorites
        }
    }

    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        });
        localStorage.setItem('crytoDash', JSON.stringify({
            test: 'hello'
        }));
    }

    savedSetting(){
        let crytoDashData = JSON.parse(localStorage.getItem('crytoData'));
        if(!crytoDashData){
            return {page: 'settings', firstVisit: true}
        }
        return {};
    }

    setPage = page => this.setState({page})

    render(){
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}