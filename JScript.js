
	
	
      // Initialize the player object

      let player;
	  let rangeSelected = false;
	  let timestamps = {
	  start: 0,
	  end: 0
	  };
     
      // Function to update the current time display
	  
      function updateCurrentTime() {
		
		const endSeconds = Number(document.querySelector("#end-time").value);
		
		//move this later!! To listen to range event
		if (!rangeSelected){
		document.querySelector("#play-button").innerHTML = endSeconds + " second(s)";
		}

      }
      
      // Listen for form submission event
      document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
		
		
        // Get the YouTube link
        const link = document.querySelector("#link").value;
        
        // Extract the video ID from the link
		
		if (link.search("v=") != -1) {
			var videoId = link.split("v=")[1];
		} else {
			var videoId = link.split(".be/")[1];
		}
        
		if (videoId.search("&") != -1) {
			videoId = videoId.split("&")[0];
		}
		
		
        // Create the player object if it does not exist, otherwise update existing

		if (typeof player != 'object'){
		player = new YT.Player("player", {
          height: "360",
          width: "640",
          videoId: videoId,
          events: {
            "onReady": () => {
              // Set an interval to update the current time display every second
              setInterval(updateCurrentTime, 150);
            }
          }
        });
		document.getElementById("choose-time").hidden = false;
		} else {
			player.loadVideoById({videoId: videoId, startSeconds:0});
            }
          });
		  
		  
		  
		 // button for playing time range
		
		document.querySelector("#play-button").addEventListener("click", (event) => {
			event.preventDefault();
			
			 // Get the YouTube link
			const link2 = document.querySelector("#link").value;
        
			// Extract the video ID from the link (this prob superfluous now)
			
			if (link2.search("v=") != -1) {
				var videoId2 = link2.split("v=")[1];
			} else {
				var videoId2 = link2.split(".be/")[1];
		}
		
		if (videoId2.search("&") != -1) {
			videoId2 = videoId2.split("&")[0];
		}
			
			//create link with timestamps and play the range
			const videoStartSeconds = player.getCurrentTime();
			const videoEndSeconds = Number(document.querySelector("#end-time").value) + videoStartSeconds;
			const videoIdRange = videoId2 + "?start=" + Math.floor(videoStartSeconds) + "&end=" + Math.floor(videoEndSeconds);
			
			if (timestamps["start"] == 0 && timestamps["end"] == 0){
				timestamps = {
				start: videoStartSeconds,
				end: videoEndSeconds}
				
				if (timestamps["end"] > 3600){
				var startT = new Date(timestamps["start"] * 1000).toISOString().substring(11, 19);
				var endT = new Date(timestamps["end"] * 1000).toISOString().substring(11, 19);
				} else {
				var startT = new Date(timestamps["start"] * 1000).toISOString().substring(14,19);
				var endT = new Date(timestamps["end"] * 1000).toISOString().substring(14,19);
				}
				document.getElementById("reset-button").hidden = false;
				document.getElementById("range-info").hidden = false;

				document.querySelector("#slider-time").innerHTML = "Selected range: " + startT + (Math.round(timestamps["start"]*5)/5%1).toFixed(2).substring(1) + " - " + endT + (Math.round(timestamps["start"]*5)/5%1).toFixed(2).substring(1);
				rangeSelected = true;
				document.querySelector("#play-button").innerHTML = "Play range";
				
			};
			
			
			player.loadVideoById({videoId: videoId2, startSeconds:timestamps["start"], endSeconds: timestamps["end"]});

		});
		
		// add or substact 0.2 or 1 second (IN PROGRESS)
		function SmallUpdateRange(){
			if (timestamps["end"] > 3600){
				var startT = new Date(timestamps["start"] * 1000).toISOString().substring(11, 19);
				var endT = new Date(timestamps["end"] * 1000).toISOString().substring(11, 19);
				} else {
				var startT = new Date(timestamps["start"] * 1000).toISOString().substring(14,19);
				var endT = new Date(timestamps["end"] * 1000).toISOString().substring(14,19);
				}
				
			if (document.querySelector("#link").value.search("v=") != -1) {
				var videoId2 = document.querySelector("#link").value.split("v=")[1];
			} else {
				var videoId2 = document.querySelector("#link").value.split(".be/")[1];
			}
			
			if (videoId2.search("&") != -1) {
				videoId2 = videoId2.split("&")[0];
		}			
			
			
			document.querySelector("#slider-time").innerHTML = "Selected range: " + startT + (Math.round(timestamps["start"]*5)/5%1).toFixed(2).substring(1) + " - " + endT + (Math.round(timestamps["end"]*5)/5%1).toFixed(2).substring(1);
			player.loadVideoById({videoId: videoId2, startSeconds:timestamps["start"], endSeconds: timestamps["end"]});	
		}
		
		
		function plus02(){
			timestamps["start"] = timestamps["start"] + 0.2;
			SmallUpdateRange();
			}
			
		function plus1(){
			timestamps["start"] = timestamps["start"] + 1;
			SmallUpdateRange();
			}
		
		function minus02(){
			timestamps["start"] = timestamps["start"] - 0.2;
			SmallUpdateRange();
			}
		
		function minus1(){
			timestamps["start"] = timestamps["start"] - 1;
			SmallUpdateRange();
			}
		
		function Eplus02(){
			timestamps["end"] = timestamps["end"] + 0.2;
			SmallUpdateRange();
			}
			
		function Eplus1(){
			timestamps["end"] = timestamps["end"] + 1;
			SmallUpdateRange();
			}
		
		function Eminus02(){
			timestamps["end"] = timestamps["end"] - 0.2;
			SmallUpdateRange();
			}
		
		function Eminus1(){
			timestamps["end"] = timestamps["end"] - 1;
			SmallUpdateRange();
			}		
		
		
		
		
		
		
		
		// reset button
		
		function fReset(){
			//document.querySelector("#play-button").innerHTML = "Select Time Span";
			rangeSelected = false;
			timestamps = {
				start: 0,
				end: 0}
			document.getElementById("reset-button").hidden = true;
			document.getElementById("range-info").hidden = true;
		}
		
		
		//recording buttons

  var webaudio_tooling_obj = function () {

    var audioContext = new AudioContext();

    console.log("audio is starting up ...");

    var BUFF_SIZE = 16384;

    var audioInput = null,
        microphone_stream = null,
        gain_node = null,
        script_processor_node = null,
        script_processor_fft_node = null,
        analyserNode = null;

    if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (navigator.getUserMedia){

        navigator.getUserMedia({audio:true}, 
          function(stream) {
              start_microphone(stream);
          },
          function(e) {
            alert('Error capturing audio.');
          }
        );

    } else { alert('getUserMedia not supported in this browser.'); }

    // ---

    function show_some_data(given_typed_array, num_row_to_display, label) {

        var size_buffer = given_typed_array.length;
        var index = 0;
        var max_index = num_row_to_display;

        console.log("__________ " + label);

        for (; index < max_index && index < size_buffer; index += 1) {

            console.log(given_typed_array[index]);
        }
    }

    function process_microphone_buffer(event) { // invoked by event loop

        var i, N, inp, microphone_output_buffer;

        microphone_output_buffer = event.inputBuffer.getChannelData(0); // just mono - 1 channel for now

        // microphone_output_buffer  <-- this buffer contains current gulp of data size BUFF_SIZE

        show_some_data(microphone_output_buffer, 5, "from getChannelData");
    }

    function start_microphone(stream){

      gain_node = audioContext.createGain();
      gain_node.connect( audioContext.destination );

      microphone_stream = audioContext.createMediaStreamSource(stream);
      microphone_stream.connect(gain_node); 

      script_processor_node = audioContext.createScriptProcessor(BUFF_SIZE, 1, 1);
      script_processor_node.onaudioprocess = process_microphone_buffer;

      microphone_stream.connect(script_processor_node);

      // --- enable volume control for output speakers
          
      document.getElementById('volume').addEventListener('change', function() {

          var curr_volume = this.value;
          gain_node.gain.value = curr_volume;

          console.log("curr_volume ", curr_volume);
      });

      // --- setup FFT

      script_processor_fft_node = audioContext.createScriptProcessor(2048, 1, 1);
      script_processor_fft_node.connect(gain_node);

      analyserNode = audioContext.createAnalyser();
      analyserNode.smoothingTimeConstant = 0;
      analyserNode.fftSize = 2048;

      microphone_stream.connect(analyserNode);

      analyserNode.connect(script_processor_fft_node);

      script_processor_fft_node.onaudioprocess = function() {

        // get the average for the first channel
        var array = new Uint8Array(analyserNode.frequencyBinCount);
        analyserNode.getByteFrequencyData(array);

        // draw the spectrogram
        if (microphone_stream.playbackState == microphone_stream.PLAYING_STATE) {

            show_some_data(array, 5, "from fft");
        }
      };
    }

  }();
		
	

			
			
			
		

		
