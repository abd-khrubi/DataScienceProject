import * as React from "react";
import {css} from "@emotion/core";
import {DotLoader} from "react-spinners";
import yummly_image from '../yummly_logo.png';
import Sababa from "../logic/algorithm";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


export class UserInputStage extends React.Component {

    constructor(props) {
        super(props);
        let data = require('../data/recipes/yummly_' + props.protein + '_' + props.carb + '_' + props.piquant);
        let recipe = data.recipes[Math.floor(Math.random() * data.recipes.length)];
        this.sababa = new Sababa(this.props.protein, this.props.carb, this.props.piquant,
            () => this.startWaiting(), () => this.stopWaiting());
        this.state = {
            isWaiting: false,
            recipe: recipe,
            data: data
        };

    }

    componentDidMount() {
        this.sababa.buildVector();
        console.log(this.sababa)
        // this.startWaiting();

    }

    drawWaiting() {
        return (
            <div className="sweet-loading">
                <DotLoader
                    css={override}
                    size={50}
                    //size={"150px"} this also works
                    color={'#60ff43'}
                    // loading={true}
                />
            </div>
        );
    }

    stopWaiting() {
        this.setState({isWaiting: false})
    }

    startWaiting() {
        this.setState({isWaiting: true})
    }

    test() {
        this.startWaiting();
        let recipe = this.state.data.recipes[Math.floor(Math.random() * this.state.data.recipes.length)];
        this.setState({recipe: recipe})

        setTimeout(() => this.stopWaiting(), 1000);
    }

    render() {
        if (this.state.isWaiting) {
            return this.drawWaiting();
        } else {
            return (
                <div className='recipes'>
                    <img
                        src={this.state.recipe.image_url.length === 0 ? yummly_image : this.state.recipe.image_url}
                        alt='d'
                        width='200' height='200'
                        onClick={() => {
                            this.test();
                        }}
                    />
                    <div>
                        <button onClick={() => this.test()}>&#128078;</button>
                        <button onClick={() => this.test()}>&#128077;</button>
                    </div>
                </div>
            );
        }
    }
}