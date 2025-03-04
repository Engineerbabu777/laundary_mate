import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert
} from "react-native";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/firebase";

const add = () => {
  const [name, setName] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const userUid = auth?.currentUser?.uid;
  const addAddress = async () => {
    if(!userUid) {return;}
    try {
      const addressCollectionRef = collection(
        db,
        "users",
        userUid,
        "userAddresses"
      );

      const addresssDocRef = await addDoc(addressCollectionRef, {
        name: name,
        houseNo: houseNo,
        landmark: landmark,
        postalCode: postalCode
      });
      Alert.alert("Address added successfully");
      console.log("address added ", addresssDocRef.id);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Add a new Address
        </Text>

        <TextInput
          placeholder="Taskim"
          placeholderTextColor={"black"}
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5
          }}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Full name</Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5
            }}
            placeholder="Enter your name"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Flat, House No, Building
          </Text>

          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5
            }}
            placeholder="06934 SİNCAN / ANKARA"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>

          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5
            }}
            placeholder="Near taskim village"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>

          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5
            }}
            placeholder="Enter Pincode"
          />
        </View>

        <Pressable
          onPress={addAddress}
          style={{
            backgroundColor: "#FEBE10",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <Text>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default add;

const styles = StyleSheet.create({});
