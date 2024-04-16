import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate } from "react-router-dom";

function MeetingRoom() {
  const { roomId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const meetingDetails = state.meeting;


  const PatientMeeting = async (element) => {
    const appID = parseInt(import.meta.env.VITE_MEETING_APP_ID,10);
    const serverSecret = import.meta.env.VITE_MEETING_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      meetingDetails.meetingId,
      meetingDetails.doctorId,
      meetingDetails.doctorName
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    await zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
        config: {
          beauty: true,
        },
      },
      showScreenSharingButton: false,
      onLeaveRoom: () => {

        navigate("/doctor/addPrescription", { state: { meetingDetails } });
      },
     })
  }


  return (
    <div>
      <div className="h-screen w-screen" ref={PatientMeeting}></div>
    </div>
  );
}

export default MeetingRoom;
