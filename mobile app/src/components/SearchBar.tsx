import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";


//Only for copy pasting if required


interface search {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
  setClicked: (Clicked: boolean) => void;
  PlaceHolder: string;
}
const SearchBar = ({
  searchPhrase,
  setSearchPhrase,
  setClicked,
  PlaceHolder,
}: search) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.searchbar]}>
        <Ionicons name="search" size={24} color="grey" />
        <TextInput
          style={styles.input}
          placeholder={PlaceHolder}
          value={searchPhrase}
          onChangeText={(text) => {
            if (text.length > 0) {
              setClicked(true);
            } else {
              setClicked(false);
            }
            setSearchPhrase(text);
          }}
          placeholderTextColor={"grey"}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {/* {clicked && (
          <Pressable
            onPress={() => {
              setSearchPhrase('');
            }}
            style={{marginLeft: 'auto'}}>
             <Ionicons name="search" size={24} color="grey" />
          </Pressable>
        )} */}
      </View>
    </View>
  );
};

export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  searchbar: {
    paddingLeft: 20,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
  },
  input: {
    fontSize: 15,
    marginLeft: 15,
    width: "100%",
    color: "grey",
  },
});
