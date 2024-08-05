"use client"

import {Box,Stack,Typography, Button,Modal,TextField} from '@mui/material'
import { firestore } from './app/firebase'



import {collection, doc, getDocs, query, setDoc, deleteDoc, getDoc} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import PantrySearch from './pantrySearch'




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #756EF3',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',






}




export default function Home() {
  const[pantry, setPantry] = useState([])
  const [FilteredPantry, setFilteredPantry] =useState([])

  const [open, setOpen] = useState(false)
  const [itemName, setItemName] =useState('')

  
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  



  const updatePantry = async () => {
    const snapshot= query(collection(firestore,'pantry'))
    const docs = await  getDocs(snapshot)
    const pantryList =[]
    docs.forEach((doc) => {
      pantryList.push({name: doc.id, ...doc.data() })
    })
    setPantry(pantryList)
    setFilteredPantry(pantryList)
  }

  useEffect ( () => {
    
    updatePantry()

  }, [])

  const addItem =async(item) =>{
    const docRef = doc(collection(firestore,'pantry'),item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      await setDoc(docRef, {count: count + 1})
    }
    else{
      await setDoc(docRef, {count:1})
    }
    await updatePantry()
  
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'),item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists ()){
      const {count} = docSnap.data()
      if (count === 1){
        await deleteDoc(docRef)
      }else{
        await setDoc( docRef, {count: count -1})
      }
    }
    await updatePantry()

  }
  
  const handleSearch = (filteredItems) => {
    setFilteredPantry(filteredItems)
  }

  return (
    <Box
      width ="100vw" 
      height="100vh"
      display = {'flex'}
      justifyContent= {'center'}
      alignItems= {'center'}
      flexDirection={'column'}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx= {style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>

          <Stack width="100%" height="48%" bgcolor={'#FFFFF'}  direction={'row'} spacing={2} >
            
          
            <TextField id= "outlined-basic" label="Item" variant= "outlined" fullWidth value= {itemName} onChange={(e) => setItemName(e.target.value)}/>
          
            <Button  varient= "outlined" 
              onClick={ () => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
          >Add</Button>


        </Stack>

          
      </Box>
    </Modal>
    

      
      
      <Box 
        width= "700px" 
        height= "66px" 
        bgcolor={'#8B78FF'} 
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        boxShadow={'inset 0px 4px 4px rgba(224, 219, 252, 1) '}
        
        >
          
        <Typography variant={'h2'}  color={'#FFFFFF'} textAlign={'center'} fontFamily={'poppins'} 
              >
          Pantry
        </Typography>

       
      </Box>
      

      


      <PantrySearch items={pantry} onSearch={handleSearch} />
      <Stack width ="700px" height = "600px" spacing = {.5} bgcolor={'#FFFFF'}  overflow={'auto'}>
        {FilteredPantry.map(({name, count}) =>(

            <Box
              key={name}
              width="100%"
              minHeighteight="300%"
              display={'flex'}
              justifyContent={'space-between'}

              alignItems={'center'}
              bgcolor={'#'}
              boxShadow={'inset 0px 4px 4px rgba(224, 219, 252, 1) '}
              top="197%"
              boxSizing={'border-box'}
              paddingX={5}
              
           
         
            
          >
            <Typography
              variant= {'h4'}
              color={'#333'}
              textAlign = {'center'}
              fontWeight={'bold'}
              fontFamily={'poppins'}
              fontSize={'16'}
              
            >
              {
              name.charAt(0).toUpperCase()+ name.slice(1)
              }

            </Typography>

            <Typography variant={'h6'} color={'#333'} textAlign={'center'}

            sx= {{
              backgroundColor: 'papper-color',
              boxShadow: '0px 4px 4px rgba(198, 195, 251, 0.2), inset 0px 4px 4px rgba(198, 195, 251, 0.2)',
              
              borderRadius: '4%',
            
              
             

            }}

            >
              In stock: {count}
            </Typography>


        
          <Button  variant='contained' onClick={() => removeItem(name)} 
            sx= {{
              
              backgroundColor: '#756EF3',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
              width:'15%',
              height: '80%',
              '&:hover': {
                backgroundColor: '#C6C3FB',
                border: '1px solid #C6C3FB',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
              },

            }}
           
           
           >Remove</Button>
        </Box>

        ))}

      </Stack>
      <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            mt: 2,
            backgroundColor: '#756EF3',
            '&:hover': {
              backgroundColor: '#C6C3FB',
              border: '1px solid #C6C3FB',
            },
            justifyContent:'center'
          }}
        >
          Add Item
        </Button>
      
      
    </Box>
  )
}

