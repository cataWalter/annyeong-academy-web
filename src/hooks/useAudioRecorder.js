"use client";
import { useState, useRef } from "react";

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [permission, setPermission] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const getPermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        return streamData;
      } catch (err) {
        alert("Microphone permission needed to record answers.");
        return null;
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
      return null;
    }
  };

  const startRecording = async () => {
    const stream = await getPermission();
    if (!stream) return;

    setIsRecording(true);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
      
      // Stop all tracks to release microphone
      stream.getTracks().forEach((track) => track.stop());
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  return { isRecording, audioBlob, startRecording, stopRecording, permission };
}
