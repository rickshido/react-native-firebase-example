import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { initializeFirestore, collection, addDoc, query, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import app from './src/config/firebase'

const App = () => {

  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [ano, setAno] = useState('')
  const [listaCarros, setListaCarros] = useState()

  const db = initializeFirestore(app, {experimentalForceLongPolling: true})
  const carroCollection = collection(db, "carros")

  useEffect( () => {
    const q = query(carroCollection)

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cars = []
      snapshot.forEach( (doc) => {
        cars.push({
          id: doc.id,
          ...doc.data()
        })
      })

      setListaCarros(cars)
    })
  }, [])

  const addCarro = () => {
    const docCarro = {
      marca: marca,
      modelo: modelo,
      ano: ano
    }
    
    addDoc(carroCollection, docCarro).then( (docRef) => {
      console.log("Novo documento inserido com sucesso: " + docRef.id)
    }).catch( (erro) => {
      console.log("Erro: " + erro)
    })
  }

  const itemCarro = ({item}) => {
    return(
      <TouchableOpacity onPress={() => {changeCarro(item.id)}}>
        <Text>Id: {item.id} Marca: {item.marca} Modelo: {item.modelo} Ano: {item.ano} </Text>
      </TouchableOpacity>
    )
  }

  const changeCarro = (id) => {
    const carRef = doc(db, "carros", id)

    updateDoc(carRef, {
      marca: 'Gurgel',
      modelo: 'G001',
      ano: 1995
    })
  }

  const deleteCarro = (id) => {
    deleteDoc(doc(db, "carros", id))
  }
  
  return (
    <View>
      <View>
        <FlatList data={listaCarros} renderItem={itemCarro} keyExtractor={carro => carro.id} />
      </View>

      <Text style={myStyle.labelText}>Marca: </Text>
      <TextInput onChangeText={setMarca} style={myStyle.inputText} value={marca}/>

      <Text style={myStyle.labelText}>Modelo: </Text>
      <TextInput onChangeText={setModelo} style={myStyle.inputText} value={modelo}/>

      <Text style={myStyle.labelText}>Ano: </Text>
      <TextInput onChangeText={setAno} style={myStyle.inputText} value={ano}/>

      <View style={myStyle.center}>
        <TouchableOpacity onPress={() => {addCarro()}} style={myStyle.button}><Text style={myStyle.buttonText}>Adicionar</Text></TouchableOpacity>
      </View>
    </View>
  )
}

const myStyle = StyleSheet.create({
  button: {
    backgroundColor: "#5555AA",
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  buttonText: {
    color: "white",
    fontSize: 30
  },
  labelText: {
    fontSize: 30,
    fontWeight: '700'
  },
  inputText: {
    fontSize: 30,
    borderColor: 'gray',
    borderWidth: 1 
  },
  center: { 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default App