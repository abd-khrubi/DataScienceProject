import React from "react";

export class MeatStage extends React.Component {
    render() {
        return (
            <div className='meat-chooser'>
                <button onClick={() => this.props.choose('chicken')}>Chicken</button>
                <button onClick={() => this.props.choose('beef')}>Beef</button>
                <button onClick={() => this.props.choose('pork')}>Pork</button>
            </div>
        );
    }
}

export class CarbStage extends React.Component {
    render() {
        return (
            <div className='carb-chooser'>
                <button onClick={() => this.props.choose('bread')}>Bread</button>
                <button onClick={() => this.props.choose('rice')}>Rice</button>
                <button onClick={() => this.props.choose('pasta')}>Pasta</button>
                <button onClick={() => this.props.choose('potato')}>Potato</button>
            </div>
        );
    }
}

export class PiquantStage extends React.Component {
    render() {
        return (
            <div className='piquant-chooser'>
                <button onClick={() => this.props.choose('mild')}>Mild</button>
                <button onClick={() => this.props.choose('spicy')}>Spicy</button>
            </div>
        );
    }
}