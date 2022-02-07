import { useEffect } from "react"

//Getting tasks
const [lists, setLists] = usedState([])

useEffect(() => {

    //orderBy, return an ordered array
    const q = query(collection(db, "Tasks"), orderBy("Done"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        setLists(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        setInput("")
    });
    return () => unsubscribe()
}, [])

//Adding Tasks to our collection
const handleClick = (e) => {
    e.preventDefault()

    if(input){
        addDoc(collection(db, "Tasks"), {
            Details: input.Details,
            Done: input.Done,
            Location: input.Location,
            Time: input.Time
        }).catch(err => console.error(err))
    }
}

//The id of the element to be deleted is passed to the function
//Deleting a document
async function deleteDocument(id){
    let request= await deleteDocument(doc(db, "Tasks", id));
    console.log(request);
}

//Updating the description of a document using a prompt
async function updateDocument(id) {
    const itemRef = doc(db, "Tasks", item.id);
    let description = prompt("What's the updated description?")
    setDoc(itemRef, {
        description: description,
        Done: itemRef.Done,
        Location: itemRef.Location,
        Time: itemRef.Time
    })
}
