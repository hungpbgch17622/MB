import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonFooter, useIonViewWillEnter, IonRefresher, IonRefresherContent, IonList, IonItem, IonButton, IonIcon, IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import { getAllApartments } from '../databaseHandler';
import { Apartment } from '../models';
import { search } from 'ionicons/icons'

export const Search: React.FC = () => {
    const [apartments, setApartments,] = useState<Apartment[]>([]);
    const [searchText, setSearchText] = useState('');

    async function fetchData() {
      let nameToFind = searchText;
      const result = await getAllApartments()
      const result2 = result.filter(e => e.property == nameToFind)
      setApartments(result2)
      console.log(result2)
      
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
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={refreshTheData}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonLabel position="stacked">Select Property type</IonLabel>
        <IonSelect value = {searchText}  onIonChange={e => setSearchText(e.detail.value)}>
              <IonSelectOption value="Flat">Flat</IonSelectOption>
              <IonSelectOption value="House">House</IonSelectOption>
              <IonSelectOption value="Bungalow">Bungalow</IonSelectOption>
            </IonSelect>
        <IonIcon  icon={search} slot="end"></IonIcon>
        <IonButton onClick={fetchData} expand="block" color="warning"><IonIcon  icon={search}></IonIcon>Search</IonButton>
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
      <IonFooter>
      
      </IonFooter>
    </IonPage>
  );
};
export default Search;

