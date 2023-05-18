
	
	
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
		
	

			
			
			
		

		
