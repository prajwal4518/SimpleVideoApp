import React, { useEffect, useRef } from 'react';
import TwilioVideo from "twilio-video";

const Video = ({token}) =>{

    const localVidRef = useRef()
    const remoteVidRef = useRef()

    useEffect(()  => {
        TwilioVideo.connect(token, {video: true, audio:true, name:"SVA"}).then(
            result =>{
                //Attach Local Video
                TwilioVideo.createLocalVideoTrack().then(track=>{
                    localVidRef.current.appendChild(track.attach())
                })

                //Attach video for all remote participants
                const addParticipant = participant =>{
                    participant.tracks.forEach(publication =>{
                        if(publication.isSubscribed){
                            const track = publication.track
                            remoteVidRef.current.appendChild(track.attach())
                        }
                    })

                    participant.on("trackSubscribed", track =>{
                        remoteVidRef.current.appendChild(track.attach())
                    }) 
                }

                result.participants.forEach(addParticipant)
                result.on("ParticipantConnected", addParticipant)
            })
    },[token])

    return(
        <div>
            <h2>Local Participant</h2>
            <div ref={localVidRef} />
            <h2>Remote Participant</h2>
            <div ref={remoteVidRef} />
        </div>
    )
}

export default Video;
