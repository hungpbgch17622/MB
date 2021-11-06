import { IonButton, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import { personAdd } from 'ionicons/icons'
import { insertApartment, getAllApartments } from '../databaseHandler';
import { Apartment } from '../models';
import './AddApartment.css';
const AddApartment: React.FC = () => {
  const [property, setProperty] = useState('')
  const [bedroom, setBedroom] = useState('')
  const [rentprice, setRentPrice] = useState('')
  const [furniture, setFurniture] = useState('')
  //const [languages, setLanguages] = useState<string[]>([])
  //const [dateofBirth, setDateOfBirth] = useState(new Date().toISOString());
  const [dateofAdding, setDateOfAdding] = useState(new Date().toISOString());
  const [note, setNote] = useState('')
  const [name, setName] = useState('')

  const [apartments, setApartment] = useState<Apartment[]>([]);

  const [shouldCheck,setShouldCheck] = useState(false)
  

  const [present,dismiss] = useIonToast();

  const formatDate = (isoDateString: string) => {
    return new Date(isoDateString).toLocaleDateString("vi-VN");
  }
  async function fetchData() {
    const result = await getAllApartments()
    setApartment(result)
  }

  function isValidName(){
    if(name.length ==0 ){
      return false;
    }else{
      return true;
    }
  }
  function isValidBedroom(){
    if(bedroom.length ==0){
      return false;
    }else{
      return true;
    }
  }
  function isValidProperty(){
    if(property.length ==0){
      return false;
    }else{
      return true;
    }
  }
  function isValidDate(){
    if(dateofAdding.length ==0){
      return false;
    }else{
      return true;
    }
  }
  function isValidRentPrice(){
    if(rentprice.length ==0){
      return false;
    }else{
      return true;
    }
  }
  /*function isValidBedroom(){
    if(bedroom.length ==0){
      return false;
    }else{
      return true;
    }
  }
  async function handleSave() {
    setShouldCheck(true)
    if(isValidName() ){
      const customer = { property: property, bedroom: bedroom, rentprice: rentprice, 
        furniture: furniture, dateofAdding: dateofAdding, note: note, name: name }
      await insertCustomer(customer)
      alert("Insert done!")
      //false->true->false->true->false
      setRefreshFlag(!refreshFlag)
    }
  }

  useEffect(()=>{
    fetchData()
  },[refreshFlag])*/


  function registerHandler() {
    setShouldCheck(true)
    if(isValidName() && isValidBedroom() && isValidProperty() && isValidDate() && isValidRentPrice()){
      const apartment = {
        property: property, bedroom: bedroom, rentprice: rentprice, 
        furniture: furniture, dateofAdding: dateofAdding, note: note, name: name
      }
      insertApartment(apartment).then(()=>{
          present("Insert apartments successfully!",3000)
      })
    }
    
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Property type</IonLabel>
            <IonSelect onIonChange={e => setProperty(e.detail.value)}>
              <IonSelectOption value="Flat">Flat</IonSelectOption>
              <IonSelectOption value="House">House</IonSelectOption>
              <IonSelectOption value="Bungalow">Bungalow</IonSelectOption>
            </IonSelect>
            {shouldCheck && !isValidProperty() &&
                <p className="errorMsg">Property type is required!</p>
            }  
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Bedrooms</IonLabel>
            <IonInput onIonChange={e => setBedroom(e.detail.value!)}></IonInput>
            {shouldCheck && !isValidBedroom() &&
                <p className="errorMsg">Bedrooms type is required!</p>
            }
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Date and time of adding the Property</IonLabel>
            <IonDatetime 
              onIonChange={e => setDateOfAdding(e.detail.value!)}></IonDatetime>
              {shouldCheck && !isValidDate() &&
                <p className="errorMsg">Date and time of adding the property type is required!</p>
            }
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Monthly rent price</IonLabel>
            <IonInput onIonChange={e => setRentPrice(e.detail.value!)}></IonInput>
            {shouldCheck && !isValidRentPrice() &&
                <p className="errorMsg">Monthly rent price is required!</p>
            }
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Furniture types</IonLabel>
            <IonSelect onIonChange={e => setFurniture(e.detail.value)}>
              <IonSelectOption value="Furnished">Furnished</IonSelectOption>
              <IonSelectOption value="Part Furnished">Part Furnished</IonSelectOption>
              <IonSelectOption value="Unfurnished">Unfurnished</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Notes</IonLabel>
            <IonInput onIonChange={e => setNote(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Name of the reporter</IonLabel>
            <IonInput onIonChange={e => setName(e.detail.value!)}></IonInput>
            {shouldCheck && !isValidName() &&
                <p className="errorMsg">Name is required!</p>
            }   
          </IonItem>
          
          <IonButton  onClick={registerHandler}  color="secondary" expand="block">
            <IonIcon slot="icon-only" icon={personAdd}></IonIcon>
          </IonButton>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default AddApartment;
