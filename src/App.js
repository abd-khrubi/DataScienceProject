import React from 'react';
import './App.css';
import {useWait, Waiter} from "react-wait";
import {DotLoader} from "react-spinners";
import {css} from "@emotion/core";
import MainPage from "./components/MainPage";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function UserCreateButton() {
    const {startWaiting, endWaiting, isWaiting, Wait} = useWait();

    return (
        <div>
            <button
                onClick={() => startWaiting("creating user")}
                disabled={isWaiting("creating user")}
            >
                Create user
            </button>
            <button onClick={() => endWaiting('creating user')}
                    disabled={!isWaiting('creating user')}>
                End waiting
            </button>

            <Wait on="creating user" fallback={
                <div className="sweet-loading">
                    <DotLoader
                        css={override}
                        size={20}
                        //size={"150px"} this also works
                        color={"#1bbc18"}
                        // loading={true}
                    />
                </div>
            }>
                <div>Create User</div>
            </Wait>
        </div>
    );
}

function App() {
    return (
        <Waiter>
            <div className="App">
                <header className="App-header">
                    {/*<UserCreateButton/>*/}
                    <MainPage value={124}/>
                </header>

            </div>
        </Waiter>
    );
}

export default App;
