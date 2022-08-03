import { fireEvent, render, screen } from '@testing-library/react';
import * as rocketData from './FetchData/RocketData';
import * as launchData from './FetchData/LaunchData';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Rockets from './Components/Rockets';
import Launches from './Components/Launches';
import * as moduleApi from './FetchData/RocketData';
import History from './Components/History';

describe('Test Home Page', () => {

  afterEach(() => {
    jest.resetAllMocks();
  })

  test('latest Launch is displayed correctly', () => {

    const fakeData = { static_fire_date_utc: "2020-03-01T10:20:00.000Z", details: "hello person" };

    render(
      <Router>
        <HomePage rocket={{ name: "Falcon 9" }} launch={fakeData} />
      </Router>
    );

    jest.spyOn(rocketData, 'getRocketByID').mockReturnValue();
    jest.spyOn(launchData, 'getLatestLaunchData').mockReturnValue(fakeData);
    expect(screen.getByTestId("rocketName").textContent).toBe("Falcon 9");
    expect(screen.getByTestId("launchDate").textContent).toBe("March 1, 2020");
    expect(screen.getByTestId("launchDetails").textContent).toBe("hello person...");
  });
})

describe('Test Rockets Page', () => {
  test('filter rockets with rocket name', () => {

    const fakeData = [{ id: 1, name: "Falcon 1234", flickr_images: ['image'], description: "hello person" },
    { id: 2, name: "Starship", flickr_images: ['image'], description: "hello person" }];

    render(
      <Router>
        <Rockets rockets={fakeData} />
      </Router>
    );

    fireEvent.change(screen.getByTestId("filter"), { target: { value: "falc" } });
    expect(screen.getByTestId("name").textContent).toBe("Falcon 1234");
    expect(screen.getByTestId("details").textContent).toBe("hello person...");

  });

  test('if rocket not displayed', () => {

    const fakeData = [{ id: 1, name: "Falcon 1234", flickr_images: ['image'], description: "hello person" }];

    render(
      <Router>
        <Rockets rockets={fakeData} />
      </Router>
    );

    fireEvent.change(screen.getByTestId("filter"), { target: { value: "calc" } });
    expect(screen.queryByTestId("name")).toBeNull();

  });
})

describe('Test Launches Page', () => {
  let rockets, launches;
  beforeEach(() => {

    rockets = [{ id: 1, name: "Falcon 1234", flickr_images: ['image'], description: "hello person" },
    { id: 2, name: "Starship", flickr_images: ['image'], description: "hello person" }];

    launches = [{ id: 1, name: "Crs 20", details: "hello person", links: { flickr: { original: ['image'] } }, rocket: 2 },
    { id: 2, name: "Hrs 20", details: "hello person", links: { flickr: { original: ['image'] } }, rocket: 1 }];

    jest.spyOn(moduleApi, 'getRocketByID').mockImplementation((rockets, id) => {
      let rocketCopy;
      rockets.map((rocket) => {
        if (rocket.id === id) {
          rocketCopy = rocket;
        }
      })
      return rocketCopy;
    })
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  test('filter launches with launch name', async () => {

    render(
      <Router>
        <Launches rockets={rockets} launches={launches} />
      </Router>
    )

    fireEvent.change(screen.getByTestId("filter"), { target: { value: "CrS 2" } });
    expect(screen.getByTestId("name").textContent).toBe("Crs 20");
    expect(screen.getByTestId("details").textContent).toBe("hello person...");

  })

  test('filter launches with rocket name', () => {

    render(
      <Router>
        <Launches rockets={rockets} launches={launches} />
      </Router>
    )

    fireEvent.change(screen.getByTestId("filter"), { target: { value: "star" } });
    expect(screen.getByTestId("name").textContent).toBe("Crs 20");
    expect(screen.getByTestId("details").textContent).toBe("hello person...");

  })

  test('if launches not displayed', () => {

    render(
      <Router>
        <Launches rockets={rockets} launches={launches} />
      </Router>
    )

    fireEvent.change(screen.getByTestId("filter"), { target: { value: "1234" } });
    expect(screen.queryByTestId("name")).toBeNull();
    expect(screen.queryByTestId("details")).toBeNull();

  })

})

describe('Test History Page', () => {
  test('if History cards are displayed correctly', () => {

    const history = [{
      event_date_utc: "2020-05-30T19:22:00Z", links: { article: 'article' },
      title: 'First Rocket', details: 'great!'
    }, {
      event_date_utc: "2021-07-05T19:22:00Z", links: { article: 'article' },
      title: 'Last Rocket', details: 'amazing!'
    }];

    render(
      <Router>
        <History history={history} />
      </Router>
    )

    history.map((item, index) => {
      let date = new Date(item.event_date_utc).toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' });
      expect(screen.queryAllByTestId('title')[index].textContent).toBe(item.title);
      expect(screen.queryAllByTestId('details')[index].textContent).toBe(item.details);
      expect(screen.queryAllByTestId('date')[index].textContent).toBe(date);
    }

    )
  })
})