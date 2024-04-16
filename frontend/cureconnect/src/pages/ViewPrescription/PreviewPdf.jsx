import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Logo from "../../assets/logos/logo3/logo-no-background.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingHorizontal: 50,
    paddingVertical: 30,
  },
  logo: {
    marginBottom: 20,
    alignSelf: "left",
    width: 200,
  },
  header: {
    fontSize: 30,
    fontWeight: 900,
    marginBottom: 30,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 15,
    marginBottom: 10,
  },
  righttext: {
    textAlign: "right",
    fontSize: 15,
    paddingBottom: 10,
    borderBottom: 1,
  },
  subheader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
  },
  text: {
    fontSize: 15,
    marginBottom: 15,
    marginTop: 5,
    marginLeft: 11,
  },
  medicineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 15,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 50,
    textAlign: "right",
  }
});

function convertToDate(timestamp) {
  var date = new Date(timestamp);

  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var year = date.getFullYear();
  var month = monthNames[date.getMonth()];
  var day = date.getDate();

  var formattedDate = month + " " + day + ", " + year;

  return formattedDate;
}

function convertToTime(timestamp) {
  var date = new Date(timestamp);

  var hours = date.getHours();
  var minutes = date.getMinutes();

  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = minutes < 10 ? "0" + minutes : minutes;

  var formattedTime = hours + ":" + minutes + " " + ampm;

  return formattedTime;
}

const PrescriptionPDF = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={Logo} style={styles.logo} />
        <Text style={styles.header}>Prescription</Text>
        <View style={styles.row}>
          <Text>Patient Name: {data.patientName}</Text>
          <Text>Date: {convertToDate(data.appointmentDate)}</Text>
        </View>
        <Text style={styles.righttext}>Slot : {convertToTime(data.start)}</Text>

        <Text style={styles.subheader}>Prescription List : </Text>
        {data.prescriptionList.map((prescription, index) => (
          <View>
            <View key={index} style={styles.medicineRow}>
              <Text>
                {index + 1}. Medicine Name : {prescription.medicineName}
              </Text>
              <Text> Quantity: {prescription.quantity}</Text>
            </View>
            <Text style={styles.text}> Description: {prescription.description}</Text>
          </View>
        ))}
        <Text style={styles.footer}>Doctor: {data.doctorName}</Text>
      </Page>
    </Document>
  );
};

const PreviewPDF = ({ data }) => {
  return (
    <>
      <PDFViewer className="w-screen h-screen overflow-y-auto">
        <PrescriptionPDF data={data} />
      </PDFViewer>
    </>
  );
};

export default PreviewPDF;
