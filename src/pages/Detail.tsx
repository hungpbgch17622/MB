import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getApartment, deleteApartment,updateApartment} from '../databaseHandler';
import { Apartment } from '../models';
import { trash } from 'ionicons/icons'

interface ParamId {
  id: string
}

const Details: React.FC = () => {
  const [property, setProperty] = useState('')
  const [bedroom, setBedroom] = useState('')
  const [rentprice, setRentPrice] = useState('')
  const [furniture, setFurniture] = useState('')
  const [dateofAdding, setDateOfAdding] = useState(new Date().toISOString());
  const [note, setNote] = useState('')
  const [name, setName] = useState('')


  const history = useHistory();

  const [currentApartment, setCurrentApartment] = useState<Apartment>();
  const { id } = useParams<ParamId>()


  async function fetchData() {
    var result = await getApartment(Number.parseInt(id));
    setCurrentApartment(result);
    setProperty(result.property!)
    setBedroom(result.bedroom!)
    setRentPrice(result.rentprice!)
    setFurniture(result.furniture!)
    setDateOfAdding(result.dateofAdding!)
    setNote(result.note!)
    setName(result.name!)

  }
  function formatVNDate(isoDate: string) {
    return new Date(isoDate).toLocaleDateString("vi-VN")
  }
  function updateHandle(){
    //call databaseHandler to update the current apartment
    var apartment = {
      id: Number.parseInt(id), property: property, bedroom: bedroom, rentprice: rentprice, 
      furniture: furniture, dateofAdding: dateofAdding, note: note, name: name
    }
    updateApartment(apartment);
    alert('Update done!')
  }
  async function handleDelete() {
    //call databaseHandle to delete the current apartment
    let r = window.confirm("Are you sure to delete this ");
    console.log('your action',r)
    if (!r) {
      alert("You cancelled!")
    } else {
      await deleteApartment(Number.parseInt(id));
      history.goBack();
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonIcon onClick={handleDelete} icon={trash} size="large" slot="end"></IonIcon>
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {currentApartment &&
          <IonList lines = "full">
              <IonLabel color="primary">
                <big>Property type</big>
              </IonLabel>
            <IonItem>
              <IonSelect value={property} onIonChange={e => setProperty(e.detail.value)}>
              <IonSelectOption value="Flat">Flat</IonSelectOption>
              <IonSelectOption value="House">House</IonSelectOption>
              <IonSelectOption value="Bungalow">Bungalow</IonSelectOption>
            </IonSelect>
            </IonItem>
              <IonLabel color="primary">
                <big>Bedrooms</big>
              </IonLabel>
            <IonItem>
            <IonInput value={bedroom} onIonChange={e => setBedroom(e.detail.value!)}></IonInput>
            </IonItem>
              <IonLabel color="primary">
                <big>Date and time of adding the property</big>
              </IonLabel>
            <IonItem>
            <IonDatetime value={dateofAdding}
              onIonChange={e => setDateOfAdding(e.detail.value!)}></IonDatetime>
            </IonItem>
              <IonLabel color="primary">
                <big>Monthly rent price</big>
              </IonLabel>
            <IonItem>
            <IonInput value={rentprice} onIonChange={e => setRentPrice(e.detail.value!)}></IonInput>
            </IonItem>
              <IonLabel color="primary">
                <big>Furniture types</big>
              </IonLabel>
            <IonItem>
            <IonSelect value={furniture} onIonChange={e => setFurniture(e.detail.value)}>
              <IonSelectOption value="Furnished">Furnished</IonSelectOption>
              <IonSelectOption value="Part Furnished">Part Furnished</IonSelectOption>
              <IonSelectOption value="Unfurnished">Unfurnished</IonSelectOption>
            </IonSelect>
            </IonItem>
              <IonLabel color="primary">
                <big>Notes</big>
              </IonLabel>
            <IonItem >
            <IonInput value={note} onIonChange={e => setNote(e.detail.value!)}></IonInput>
            </IonItem>
              <IonLabel color="primary">
                <big>Name of the reporter</big>
              </IonLabel>
            <IonItem>
            <IonInput value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
        }
        <IonButton onClick={updateHandle} expand="block" color="warning">Update</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Details;
