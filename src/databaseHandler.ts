import { openDB } from 'idb'
import { Apartment } from './models'

const DATABASE_NAME = 'RENTALZ DB'

initDB().then(()=>{
    console.log("Init database done! ",DATABASE_NAME)
})

export async function updateApartment(apartment:Apartment) {
    //find in the database with the id
    const db = await openDB(DATABASE_NAME, 1);
    const tx = db.transaction('apartments', 'readwrite');
    const store = tx.objectStore('apartments');
    var updateApartment = await store.get(apartment.id!) as Apartment
    //update the found record with new values
    updateApartment.property  = apartment.property
    updateApartment.bedroom = apartment.bedroom
    updateApartment.rentprice =apartment.rentprice
    updateApartment.furniture = apartment.furniture
    updateApartment.dateofAdding = apartment.dateofAdding
    updateApartment.note  = apartment.note
    updateApartment.name  = apartment.name
    //really do the update: from memory ->database
    db.put("apartments",updateApartment);
    await tx.done;
}

export async function deleteApartment(id:number) {
    const db = await openDB(DATABASE_NAME, 1);
    await db.delete("apartments",id);
}

export async function getApartment(id:number) {
    const db = await openDB(DATABASE_NAME, 1);
    const apartment = await db.get('apartments',id)
    console.log("i am getting the apartment "+ apartment)
    return apartment;
}

export async function getAllApartments() {
    const db = await openDB(DATABASE_NAME, 1);
    var cursor = await db.transaction("apartments").objectStore("apartments").
         
    openCursor();
    var apartments = []; //init an empty array
    //while there are customers left
    while (cursor) {
        apartments.push(cursor.value); //add the new customer to the result
        cursor = await cursor.continue(); //move to the next customer
    }
    return apartments;
}

export async function  insertApartment(apartment:Apartment){
    const db = await openDB(DATABASE_NAME, 1)
    const tx = db.transaction('apartments', 'readwrite');
    //store means table
    const store = tx.objectStore('apartments');
    await store.put(apartment)
    console.log("insertion done!")
}

//if database has not created, it will create a new one
async function initDB(){
    const db = await openDB(DATABASE_NAME,1,{
        upgrade(db){
            // Create a store of objects
            const store = db.createObjectStore('apartment', {
                // The 'id' property of the object will be the key.
                keyPath: 'id',
                // If it isn't explicitly set, create a value by auto incrementing.
                autoIncrement: true,
            });
        }
    })
}