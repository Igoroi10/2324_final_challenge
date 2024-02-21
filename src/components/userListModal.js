import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, View } from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../helpers/Context';





const showEnemyList = () => {
    const [target, setTarget] = useState([]);
    const {globalState, globalStateHandler} = useContext(Context);
    
    const user = globalState.user;
    let isGood;

    if(user.rol === "acolyte" || user.rol === "mortimer")
        isGood = true
    else    
        isGood = false

    const posibleTargets = globalState.userList.map((el) => {
        if(isGood){
          if(el.rol !== "acolyte" && el.rol !== "mortimer")
            return el;
        }
        else{
          if(el.rol === "acolyte" || el.rol === "mortimer")
            return el;
        }
    })




  return (
    <ModalContainer transparent={true} visible={true}>
      <ContentContainer>

        <IngredientList
          data={posibleTargets}
          renderItem={({ item }) => (
            <IngredientItem
              onPress={() => handleIngredientPress(item)}
              selected={setTarget(item)}
              // onLongPress={() => { openModal(item) }}
            >
              {/* {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />

              )} */}
              <IngredientName>{item.name}</IngredientName>
            </IngredientItem>
          )}
          keyExtractor={(item) => item.key}
          horizontal
        />
        {/* {selectedIngredients.length === 2 && (
          <SelectedIngredientsContainer>
            <SelectedIngredientsText>
              Selected Ingredients: {selectedIngredients[0].name} and {selectedIngredients[1].name}
            </SelectedIngredientsText>
          </SelectedIngredientsContainer>
        )}
        {selectedIngredients.length === 2 && (
          <ButtonContainer>
            <CreateButton onPress={createPotion}>
              <ButtonText>Create Potion</ButtonText>
            </CreateButton>
          </ButtonContainer>
        )}
        <ButtonContainer>
          <DeleteIngredientsButton onPress={deleteIngredients}>
            <ButtonText>Delete Ingredients</ButtonText>
          </DeleteIngredientsButton>
        </ButtonContainer> */}
      </ContentContainer>
      <IngredientInfo
        isVisible={isModalVisible}
        closeModal={closeModal}
        item={whichitem}
      />
    </ModalContainer>
  );
};




const ModalContainer = styled.Modal`
`;

const ContentContainer = styled.View`
  border-radius: 20px;
  margin-top: 50%;
  background-color: #fff;
  padding: 20px;
`;

const ButtonContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;

const IngredientList = styled(FlatList)`
  margin-top: 20px;
`;

const IngredientItem = styled.TouchableOpacity`
background-color: ${(props) => (props.selected ? '#95a5a6' : '#3498db')};
  padding: 15px;
  border-radius: 15px;
  margin-right: 15px;
`;

const CreateButton = styled.TouchableOpacity`
  background-color: #2ecc71;
  border-radius: 25px;
  height: 50px;
  width: 150px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const DeleteIngredientsButton = styled.TouchableOpacity`
  background-color: #e74c3c;
  border-radius: 25px;
  height: 50px;
  width: 150px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const SelectedIngredientsText = styled.Text`
  color: #000;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
`;

const SelectedIngredientsContainer = styled.View`
  align-items: center;
`;

const CloseButton = styled.TouchableOpacity`
  left: 300px;
  width: 40px;
  height: 40px;
  background-color: #c0392b;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const CloseButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const IngredientName = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const styles = {
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
};

export default showEnemyList;

