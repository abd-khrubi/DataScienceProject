import React from 'react';
import {MeatStage, PiquantStage, CarbStage} from "./Stages.js";
import {UserInputStage} from "./UserInputStage";
import data from '../data/recipes/yummly_pork_rice_spicy';

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stage: 0,
            meat: null,
            carb: null,
            piquant: null,
        };
    }

    chooseMeat(meat) {
        this.setState({
            meat: meat,
            stage: 1,
        });
    }

    chooseCarb(carb) {
        this.setState({
            carb: carb,
            stage: 2,
        });
    }

    choosePiquant(piquant) {
        this.setState({
            piquant: piquant,
            stage: 3
        })
    }

    render() {
        let stageDiv;
        switch (this.state.stage) {
            default:
                stageDiv = null;
                break;
            case 0:
                stageDiv = <MeatStage choose={(x) => this.chooseMeat(x)}/>;
                break;
            case 1:
                stageDiv = <CarbStage choose={(x) => this.chooseCarb(x)}/>;
                break;
            case 2:
                stageDiv = <PiquantStage choose={(x) => this.choosePiquant(x)}/>;
                break;
            case 3:
                stageDiv = <UserInputStage protein={this.state.meat} carb={this.state.carb} piquant={this.state.piquant}/>;
                // stageDiv = <UserInputStage protein='beef' carb='bread' piquant='mild'/>;
                break;
        }

        // let o = JSON.parse(localStorage.getItem('test'));
        return (
            <div className='main-page'>
                {stageDiv}
                {/*<button className={'increment'}*/}
                {/*        onClick={() => {*/}
                {/*            this.setState({stage: this.state.stage + 1})*/}
                {/*        }}>Next*/}
                {/*</button>*/}
                {/*<p>{JSON.stringify(this.state, null, '\t')}</p>*/}
                {/*<p>{JSON.stringify(o, null, '\t')}</p>*/}
            </div>
        );
    }
}

export default MainPage;