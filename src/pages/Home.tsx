import { IonContent, IonHeader, IonItem, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getAllApartments } from '../databaseHandler';
import { Apartment } from '../models';

const Home: React.FC = () => {
  //list of customers-> will be used in the List component
  const [apartments, setApartments] = useState<Apartment[]>([]);

  async function fetchData() {
    let allApartments = await getAllApartments();
    setApartments(allApartments)
    console.log(allApartments)
  }
  //it will run at least once every time the page is rendered
  // useEffect(() => {
  //   fetchData();
  // }, [])
  //it helps to refresh the home when you navigate between pages
  useIonViewWillEnter(()=>{
    fetchData();
  })

  async function refreshTheData(event: any) {
    await fetchData() //to update customer list again
    setTimeout(() => {  //pause some time to show the effect: refreshing
      event.detail.complete(); //done the refreshing=>effect will disapear
      console.log('Refresh completed!')
    }, 1000) //1 second to show refresh icon
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>RentalZ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={refreshTheData}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {apartments &&
          <IonList>
            {
              apartments.map((c, i) =>
                <IonItem button key={i} 
                    routerLink={'/details/' + c.id}>{c.property}</IonItem>
              )
            }
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};
export default Home;