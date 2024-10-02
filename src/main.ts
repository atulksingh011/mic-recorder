import "bootstrap/dist/js/bootstrap.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { MicVAD, utils } from "@ricky0123/vad-web";

// Select the audio element
const audioEl = document.querySelector("audio") as HTMLAudioElement | null;

// Add event listener to the button
document.querySelector("button")?.addEventListener("click", async (event: Event) => {
  const buttonEl = event.target as HTMLButtonElement;

  // Update button text and styling to reflect recording state
  buttonEl.innerHTML = "Stop Recording";
  buttonEl.classList.remove("btn-primary");
  buttonEl.classList.add("btn-danger");

  // Initialize MicVAD
  const myvad = await MicVAD.new({
    onSpeechStart: () => console.log("onSpeechStart"),
    onSpeechEnd: (audio: Float32Array) => {
      console.log("onSpeechEnd");

      // Pause VAD when speech ends
      myvad.pause();

      const audioBlob = new Blob([utils.encodeWAV(audio)], { type: "audio/wav" });

      // Create an audio URL from the Blob
      const audioURL = URL.createObjectURL(audioBlob);

      // Set the audio source to the recorded audio
      if (audioEl) {
        audioEl.classList.remove("d-none");
        audioEl.setAttribute("src", audioURL);
      }

      // Update button text and styling to reflect idle state
      buttonEl.innerHTML = "Start Recording";
      buttonEl.classList.remove("btn-danger");
      buttonEl.classList.add("btn-primary");
    },
  });

  // Start the VAD instance
  myvad.start();
});
