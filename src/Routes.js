import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Launches from "./Components/Launches";
import Rocket from "./Components/RocketPage/Rocket";
import Rockets from "./Components/Rockets";
import Launch from "./Components/LaunchPage/Launch";
import History from "./Components/History";
import React from 'react';


export default function SpaceXRoutes({ state }) {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage rocket={state.rocket} launch={state.launch} />} />
            <Route exact path='/rockets' element={<Rockets rockets={state.rockets} />} />
            <Route path='/rockets/:id' element={<Rocket rockets={state.rockets} launches={state.launches} />} />
            <Route exact path='/launches' element={<Launches rockets={state.rockets} launches={state.launches} />} />
            <Route path='/launches/:id' element={<Launch launches={state.launches} />} />
            <Route path='/history' element={<History history={state.history} />} />
        </Routes>
    )
}
