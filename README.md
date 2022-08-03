SPACEX APPLICATION

This is a React Application using the "https://docs.spacexdata.com/" API which displays information majorly on the Rockets, Launches and History of the SpaceX.

Frameworks:

1. Developed purely using ReactJS and the only external dependency used is react-router.
2. As the application is fairly simple with not too many moving parts and correlations between multiple components UseReducer and UseContext have been used for state management.
3. The states have been passed as props only to components that use the state. UseContext has been used in other places.
4. The functions, Components, and CSS have been made as reusable as possible while still maintaining clean code.
5. The Entire Application is responsive to common screen sizes.
6. Using the Version 5 and Version 4 of the spacexdata API, as I thought would be better to represent the most recent data, there are quite a few changes in the API of version 3 which was asked and Version 4 and 5.
7. First time render might be a little slow due to the high quality images used from the API.

Architecture:

The flow of the application
 - History
 - Launches
    - Launch
 - Rockets
    - Rocket

Folder Structure:
- src
    - Components
        - LaunchPage
            - Launch.js
        - rocketPage
            - Rocket.js
        - SubComponents
            - RocketLaunchComponents.js
            - SubComponents.js
        History.js
        HomePage.js
        Launches.js
        Rockets.js
    - CSS
        - Cards.module.css
        - History.nodule.css
        - HomePage.module.CSS
        - Launch.module.css
        - Rocket.module.CSS
    - FetchData
        - HistoryData.js
        - LaunchData.js
        - RocketData.js
    - Helpers
        HelperFunctions.js
    - Images
    - Reducers
        - AppActions.js
        - LaunchRocketActions.js
        - Reducers.js
    - App.js
    - App.module.css
    - index.css
    - index.js
    - routes.js
    - Other Src files

All the Routes for the application have been Maintained in the routes.js

App.js
    1. uses the AppActions and Reducers for state management and displays the Four links on the page.
    - SpaceX logo, History, Launches, Rockets
    2. Uses the App.module.css for CSS styling.
    3. Fetches the History, Launches, and History Data from the API defined in the FetchData folder.
    4. The menu items are displayed in the form of dropdown for smaller screen.

Home Page
    1. The first that is displayed displayed a Quote of Elon Musk.
    2. Displays the latest Launch that was computed from the launches API using the date in LaunchData.
    3. Displays the Rocket Name fetched from the Rockets API computed in RocketData.
    4. Know More button leads to the Launch Page of the latest launch.
    5. The SpaceX logo is a link which will redirect to the HomePage.
    6. Uses HomePage.module.css for styling

History Page
    1. Displays all the events displayed in History in cards format.
    2. On Clicking on any card will lead to a page with more detailed information on the event.
    3. Uses History.module.css for styling
    
Rockets Page
    1. Displays the Rockets from the Rockets API as cards with the images, name and short description.
    2. Filter can be used to filter out the Rockets with the Rocket name.
    3. Clicking on any of the cards will lead to more detailed information on the rocket.
    4. Uses Cards.module.css for styling.
    5. Uses Reusable components from the SubComponents/SubComponents.js file.

Launches Page
    1. Displays the Launches from the Launches API as cards with the images, name and short description.
    2. Search option can be used to filer the launches by either the Rocket name or the Launch Name.
    3. Clicking on any of the cards will lead to more detailed information on the Launch.
    4. Uses Cards.module.css for styling.
    5. Uses Reusable components from the SubComponents/SubComponents.js file.

Rocket Page
    - Left section
        1. The left section displays an image and description about the rocket.
        2. Can navigate between the images using the buttons.
    - Right section
        1. The right section displays the detailed information on the rocket.
        2. All the tabs on the top are buttons which will display the respective information obtained from the API.
        3. The Stages have two more sub Tabs Stage 1 and Stage 2. 
        4. The Launches tab will display the Launches that the rocket was used in and on clicking will lead to detailed information on the Launch
    User will be able to navigate between different rockets with the Two Arrows at the bottom of the page
    Uses Reusable Components and functions from /SubComponents/RocketLaunchComponents.js
    Uses Rocket.module.css for styling.

Launch Page
    1. This Page is still in progress.
    2. Intend to represent data from the Launch API, Payloads API, LandPad API and LaunchPad API.
    3. The API's have been called in the Launches page.
    4. Uses Reusable Components and functions from /SubComponents/RocketLaunchComponents.js
    5. Uses Launch.module.css for styling.
    6. Still a Work in progress
    
App.test.js
    1. Created few Unit Tests for few of the functionalities in the pages.
    2. Still a work in Progress.
    

Due to the time constraints on finishing off what I had planned to develop I will explain them below.

1. Complete the Launch page with two sections to display the images, description and Data from the different APIs.
2. Intend to create dynamic animations on the images with the onLoad property of img so user will not see the details loaded but not the image.
3. Change the Greater than and Less than symbol to icons for a better look.
4. Create a sliding effect for Images and the entire page when clicking on the arrow buttons in RocketPage and LaunchPage.
