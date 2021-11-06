import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AddApartment from './pages/AddApartment';
import { home as homeIcon, personAdd as addIcon, search } from 'ionicons/icons'
import Details from './pages/Detail';
import Search from './pages/Search';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/addApartment">
            <AddApartment />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/details/:id"> 
              <Details/>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
        <IonTabButton tab="addApartment" href="/addApartment">
            <IonIcon icon={addIcon}></IonIcon>
            AddApartment
          </IonTabButton>
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeIcon} />
            Home
          </IonTabButton>
          <IonTabButton tab="search" href="/search">
            <IonIcon icon={search} />
            Search
          </IonTabButton>
          
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
