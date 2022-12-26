/**
 * React Native Event Booking App UI - Event Detail Screnn
 * -> The screen can be seperated 4 sections and 1 fixed bottom bar
 *
 * TODO:
 * [x] Build the header image background section
 *    [x] Rendering the image background sub section (ImageBackground)
 *    [x] Rendering the header sub section
 *    [x] Rendering the footer sub section (LinearGradient)
 * [x] Build the buttons group section
 * [x] Build the description section
 * [] Build the location section (google map in dark mode)
 * [] Build the fixed bottom bar
 */
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import moment from "moment";
import { dummyData, FONTS, SIZES, COLORS, icons, images } from "../constants";
import { McText, McIcon, McAvatar } from "../components";
import { Button } from "react-native-web";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const EventDetail = ({ navigation, route }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    let { selectedEvent } = route.params;
    setSelectedEvent(selectedEvent);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.black }}
        style={{ backgroundColor: COLORS.black }}
      >
        <ImageBackground
          resizeMode="cover"
          source={selectedEvent?.image}
          style={{
            width: "100%",
            height:
              SIZES.height < 700 ? SIZES.height * 0.4 : SIZES.height * 0.5,
          }}
        >
          <View style={{ flex: 1 }}>
            {/* IMAGE HEADER */}
            <SectionImageHeader>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  width: 56,
                  height: 40,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <McIcon source={icons.back_arrow} size={24} />
              </TouchableOpacity>
              <View
                style={{
                  width: 96,
                  height: 40,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity>
                  <McIcon
                    source={icons.like}
                    size={24}
                    style={{ marginLeft: 16, tinycolor: COLORS.white }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <McIcon
                    source={icons.share}
                    size={24}
                    style={{ marginRight: 16, tinycolor: COLORS.white }}
                  />
                </TouchableOpacity>
              </View>
            </SectionImageHeader>
            {/* IMAGE FOOTER */}
            <SectionImageFooter>
              <LinearGradient
                colors={["transparent", "#000"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  width: "100%",
                  height: 400,
                  justifyContent: "flex-end",
                }}
              >
                <FooterContentView>
                  <View>
                    <McText body4 style={{ opacity: 0.5, letterSpacing: 2 }}>
                      {selectedEvent?.type}
                    </McText>
                    <McText h1>{selectedEvent?.title}</McText>
                    <McText body5 style={{ opacity: 0.5, letterSpacing: 1.5 }}>
                      STARTING{" "}
                      {moment(selectedEvent?.startingTime).format("hh:mm A")}
                    </McText>
                  </View>
                  <LinearGradient
                    colors={COLORS.linear}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <McText body4 style={{ letterSpacing: 1 }}>
                      {moment(selectedEvent?.startingTime)
                        .format("MMM")
                        .toUpperCase()}
                    </McText>
                    <McText h2 style={{}}>
                      {moment(selectedEvent?.startingTime)
                        .format("DD")
                        .toUpperCase()}
                    </McText>
                  </LinearGradient>
                </FooterContentView>
              </LinearGradient>
            </SectionImageFooter>
          </View>
        </ImageBackground>
        {/* BUTTONS GROUP SECTION */}
        <ButtonSection>
          <TouchableOpacity
            style={{
              width: 76,
              height: 32,
              borderRadius: 10,
              marginRight: 16,
              justifyContent: "center",
              backgroundColor: COLORS.white,
              alignItems: "center",
            }}
          >
            <McText h6 style={{ color: COLORS.black, letterSpacing: 1 }}>
              ABOUT
            </McText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 124,
              height: 32,
              borderRadius: 10,
              justifyContent: "center",
              backgroundColor: COLORS.input,
              alignItems: "center",
            }}
          >
            <McText h6 style={{ color: COLORS.white, letterSpacing: 1 }}>
              PARTICIPANTS
            </McText>
          </TouchableOpacity>
        </ButtonSection>
        {/* DESCRIPTION SECTION */}
        <DescriptionSection>
          <McText body3>{selectedEvent?.description}</McText>
        </DescriptionSection>
        {/* LOCATION SECTION */}
        <LocationSection>
          <McText h3>LOCATION</McText>
          <View
            style={{
              height: 250,
            }}
          >
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{
                height: 250,
                borderRadius: 15,
                marginTop: 20,
              }}
              minZoomLevel={15}
              initialRegion={dummyData.Region}
              customMapStyle={dummyData.MapStyle}
            ></MapView>
          </View>
          <View style={{ paddingBottom: 150 }}></View>
        </LocationSection>
      </ScrollView>
      {/* FIXED BOTTOM BAR */}
      <BottomBarSection>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 30,
          }}
        >
          <View>
            <McText body3 style={{ opacity: 0.5, letterSpacing: 1 }}>
              PRICE
            </McText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <McText h2>Rs. 470</McText>
              <McText h3>/person</McText>
            </View>
          </View>
          <TouchableOpacity>
            <LinearGradient
              colors={COLORS.linear}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 173,
                height: 53,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <McText h4>BUY A TICKET</McText>
                <McIcon
                  source={icons.buy_ticket}
                  size={24}
                  style={{ marginLeft: 11 }}
                ></McIcon>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BottomBarSection>
    </View>
  );
};
const SectionImageHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${Platform.OS === "ios" ? "40px" : "20px"};
  margin-left: 30px;
  margin-right: 30px;
`;

const SectionImageFooter = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const FooterContentView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0px 30px;
`;

const ButtonSection = styled.View`
  margin: 15px 30px;
  flex-direction: row;
`;

const DescriptionSection = styled.View`
  margin: 0px 30px;
`;

const LocationSection = styled.View`
  margin: 25px 30px;
`;

const BottomBarSection = styled.View`
  height: 130px;
  width: ${SIZES.width + "px"};
  border-radius: ${SIZES.radius};
  background-color: ${COLORS.tabBar};
  position: absolute;
  bottom: 0px;
  justify-content: center;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default EventDetail;
